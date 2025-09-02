// Firebase Configuration for Smart Home Simulator
// This file contains Firebase initialization and service configuration

// Firebase configuration object
// Your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCdXnszAUJfkC5uyv9n-kVE2Whv_0vZfLk",
  authDomain: "ibi-simulator-f6ebe.firebaseapp.com",
  projectId: "ibi-simulator-f6ebe",
  storageBucket: "ibi-simulator-f6ebe.firebasestorage.app",
  messagingSenderId: "929875729041",
  appId: "1:929875729041:web:d53f21685b20d63fb73d30",
  measurementId: "G-YR3XWP3RVH"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;
let functions;

// Initialize Firebase services
function initializeFirebase() {
  try {
    // Check if Firebase is already initialized
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded. Please include Firebase scripts.');
      return false;
    }

    // Initialize Firebase app
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize services
    auth = firebase.auth(app);
    db = firebase.firestore(app);
    storage = firebase.storage(app);
    functions = firebase.functions(app);

    // Enable Firestore offline persistence
    db.enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
          console.warn('The current browser does not support persistence.');
        }
      });

    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
}

// Get Firebase service instances
function getAuth() {
  return auth;
}

function getFirestore() {
  return db;
}

function getStorage() {
  return storage;
}

function getFunctions() {
  return functions;
}

// Check if Firebase is ready
function isFirebaseReady() {
  return app && auth && db;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeFirebase,
    getAuth,
    getFirestore,
    getStorage,
    getFunctions,
    isFirebaseReady
  };
}

// For browser usage, make functions globally available
if (typeof window !== 'undefined') {
  window.FirebaseConfig = {
    initializeFirebase,
    getAuth,
    getFirestore,
    getStorage,
    getFunctions,
    isFirebaseReady
  };
}
