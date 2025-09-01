// Authentication Service for Smart Home Simulator
// Handles user authentication using Firebase Auth

class AuthService {
  constructor() {
    this.auth = null;
    this.currentUser = null;
    this.authStateListener = null;
    this.isInitialized = false;
  }

  // Initialize authentication service
  async initialize() {
    try {
      if (typeof FirebaseConfig === 'undefined') {
        console.error('FirebaseConfig not loaded');
        return false;
      }

      // Initialize Firebase if not already done
      if (!FirebaseConfig.isFirebaseReady()) {
        FirebaseConfig.initializeFirebase();
      }

      this.auth = FirebaseConfig.getAuth();
      
      if (!this.auth) {
        console.error('Firebase Auth not available');
        return false;
      }

      // Set up auth state listener
      this.setupAuthStateListener();
      
      this.isInitialized = true;
      console.log('AuthService initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing AuthService:', error);
      return false;
    }
  }

  // Set up authentication state listener
  setupAuthStateListener() {
    this.authStateListener = this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.onAuthStateChanged(user);
    });
  }

  // Handle authentication state changes
  onAuthStateChanged(user) {
    if (user) {
      console.log('User signed in:', user.email);
      this.updateUIForAuthenticatedUser(user);
    } else {
      console.log('User signed out');
      this.updateUIForUnauthenticatedUser();
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      if (!this.isInitialized) {
        throw new Error('AuthService not initialized');
      }

      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      this.currentUser = userCredential.user;
      
      console.log('User signed in successfully:', this.currentUser.email);
      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign up with email and password
  async signUp(email, password, displayName = '') {
    try {
      if (!this.isInitialized) {
        throw new Error('AuthService not initialized');
      }

      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      this.currentUser = userCredential.user;

      // Update display name if provided
      if (displayName) {
        await this.currentUser.updateProfile({
          displayName: displayName
        });
      }

      console.log('User created successfully:', this.currentUser.email);
      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign out
  async signOut() {
    try {
      if (!this.isInitialized) {
        throw new Error('AuthService not initialized');
      }

      await this.auth.signOut();
      this.currentUser = null;
      
      console.log('User signed out successfully');
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Get user ID
  getUserId() {
    return this.currentUser ? this.currentUser.uid : null;
  }

  // Get user email
  getUserEmail() {
    return this.currentUser ? this.currentUser.email : null;
  }

  // Get user display name
  getUserDisplayName() {
    return this.currentUser ? this.currentUser.displayName : null;
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      if (!this.isInitialized || !this.currentUser) {
        throw new Error('No authenticated user');
      }

      await this.currentUser.updateProfile(updates);
      console.log('Profile updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email) {
    try {
      if (!this.isInitialized) {
        throw new Error('AuthService not initialized');
      }

      await this.auth.sendPasswordResetEmail(email);
      console.log('Password reset email sent');
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update UI for authenticated user
  updateUIForAuthenticatedUser(user) {
    // Hide login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.style.display = 'none';
    }

    // Show user info
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
      userInfo.style.display = 'block';
      userInfo.innerHTML = `
        <div class="user-profile">
          <span>Velkommen, ${user.displayName || user.email}</span>
          <button onclick="authService.signOut()" class="btn btn-secondary">Log ud</button>
        </div>
      `;
    }

    // Show main application
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
      mainApp.style.display = 'block';
    }

    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('userAuthenticated', { detail: { user } }));
  }

  // Update UI for unauthenticated user
  updateUIForUnauthenticatedUser() {
    // Show login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.style.display = 'block';
    }

    // Hide user info
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
      userInfo.style.display = 'none';
    }

    // Hide main application
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
      mainApp.style.display = 'none';
    }

    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('userUnauthenticated'));
  }

  // Cleanup
  cleanup() {
    if (this.authStateListener) {
      this.authStateListener();
      this.authStateListener = null;
    }
    this.isInitialized = false;
  }
}

// Create global instance
const authService = new AuthService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthService;
}

// For browser usage, make service globally available
if (typeof window !== 'undefined') {
  window.authService = authService;
}
