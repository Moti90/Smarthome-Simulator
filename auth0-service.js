// Auth0 Service for Smart Home Simulator
// This service handles all authentication operations using Auth0

class Auth0Service {
  constructor() {
    this.user = null;
    this.isInitialized = false;
    this.authStateListeners = [];
    
    // Initialize when Auth0 is ready
    this.waitForAuth0();
  }

  // Wait for Auth0 to be ready
  async waitForAuth0() {
    while (!window.Auth0Config || !window.Auth0Config.isAuth0Ready()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.isInitialized = true;
    console.log('✅ Auth0Service initialized');
    
    // Check if user is already authenticated
    await this.checkAuthState();
  }

  // Check current authentication state
  async checkAuthState() {
    if (!this.isInitialized) return;
    
    try {
      const isAuth = await window.Auth0Config.isAuthenticated();
      if (isAuth) {
        this.user = await window.Auth0Config.getUserProfile();
        this.notifyAuthStateChange(true);
      } else {
        this.user = null;
        this.notifyAuthStateChange(false);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      this.user = null;
      this.notifyAuthStateChange(false);
    }
  }

  // Login user
  async login() {
    if (!this.isInitialized) {
      console.error('Auth0Service not initialized');
      return false;
    }

    try {
      const auth0Client = window.Auth0Config.getAuth0Client();
      await auth0Client.loginWithRedirect();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  // Logout user
  async logout() {
    if (!this.isInitialized) {
      console.error('Auth0Service not initialized');
      return false;
    }

    try {
      const auth0Client = window.Auth0Config.getAuth0Client();
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.user !== null;
  }

  // Get user ID
  getUserId() {
    return this.user ? this.user.sub : null;
  }

  // Get user email
  getUserEmail() {
    return this.user ? this.user.email : null;
  }

  // Get user name
  getUserName() {
    if (!this.user) return null;
    return this.user.name || this.user.nickname || this.user.email;
  }

  // Get access token for API calls
  async getAccessToken() {
    if (!this.isInitialized || !this.isAuthenticated()) {
      return null;
    }

    try {
      return await window.Auth0Config.getAccessToken();
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  // Add auth state change listener
  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of auth state change
  notifyAuthStateChange(isAuthenticated) {
    this.authStateListeners.forEach(callback => {
      try {
        callback(isAuthenticated, this.user);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  // Handle authentication callback (called after redirect)
  async handleCallback() {
    if (!this.isInitialized) return false;
    
    try {
      const success = await window.Auth0Config.handleRedirectCallback();
      if (success) {
        await this.checkAuthState();
      }
      return success;
    } catch (error) {
      console.error('Error handling callback:', error);
      return false;
    }
  }

  // Get user metadata
  getUserMetadata() {
    if (!this.user) return {};
    
    return {
      id: this.user.sub,
      email: this.user.email,
      name: this.user.name,
      nickname: this.user.nickname,
      picture: this.user.picture,
      email_verified: this.user.email_verified,
      updated_at: this.user.updated_at
    };
  }

  // Check if user has specific permission (for future use)
  hasPermission(permission) {
    if (!this.user || !this.user.permissions) return false;
    return this.user.permissions.includes(permission);
  }

  // Check if user has specific role (for future use)
  hasRole(role) {
    if (!this.user || !this.user.roles) return false;
    return this.user.roles.includes(role);
  }
}

// Create global instance
window.Auth0Service = new Auth0Service();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth0Service;
}
