// Database Service for Smart Home Simulator
// Handles data operations using Firebase Firestore

class DatabaseService {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.collections = {
      users: 'users',
      progress: 'progress',
      rules: 'rules',
      settings: 'settings',
      schools: 'schools',
      classes: 'classes'
    };
  }

  // Initialize database service
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

      this.db = FirebaseConfig.getFirestore();
      
      if (!this.db) {
        console.error('Firebase Firestore not available');
        return false;
      }

      this.isInitialized = true;
      console.log('DatabaseService initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing DatabaseService:', error);
      return false;
    }
  }

  // Create a new document
  async createDocument(collection, data, documentId = null) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      let docRef;
      if (documentId) {
        docRef = this.db.collection(collection).doc(documentId);
        await docRef.set(data);
      } else {
        docRef = await this.db.collection(collection).add(data);
      }

      console.log(`Document created in ${collection}:`, docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error(`Error creating document in ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Read a document by ID
  async readDocument(collection, documentId) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      const doc = await this.db.collection(collection).doc(documentId).get();
      
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      console.error(`Error reading document from ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Update a document
  async updateDocument(collection, documentId, data) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      await this.db.collection(collection).doc(documentId).update(data);
      
      console.log(`Document updated in ${collection}:`, documentId);
      return { success: true };
    } catch (error) {
      console.error(`Error updating document in ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Delete a document
  async deleteDocument(collection, documentId) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      await this.db.collection(collection).doc(documentId).delete();
      
      console.log(`Document deleted from ${collection}:`, documentId);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting document from ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Query documents
  async queryDocuments(collection, queryConstraints = []) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      let query = this.db.collection(collection);
      
      // Apply query constraints
      queryConstraints.forEach(constraint => {
        query = query.where(constraint.field, constraint.operator, constraint.value);
      });

      const snapshot = await query.get();
      const documents = [];
      
      snapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data: documents };
    } catch (error) {
      console.error(`Error querying documents from ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Get all documents in a collection
  async getAllDocuments(collection) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      const snapshot = await this.db.collection(collection).get();
      const documents = [];
      
      snapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data: documents };
    } catch (error) {
      console.error(`Error getting all documents from ${collection}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Real-time listener for a document
  onDocumentSnapshot(collection, documentId, callback) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      return this.db.collection(collection).doc(documentId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            callback({ success: true, data: { id: doc.id, ...doc.data() } });
          } else {
            callback({ success: false, error: 'Document not found' });
          }
        }, (error) => {
          console.error(`Error in document snapshot for ${collection}:`, error);
          callback({ success: false, error: error.message });
        });
    } catch (error) {
      console.error(`Error setting up document snapshot for ${collection}:`, error);
      return null;
    }
  }

  // Real-time listener for a collection
  onCollectionSnapshot(collection, callback, queryConstraints = []) {
    try {
      if (!this.isInitialized) {
        throw new Error('DatabaseService not initialized');
      }

      let query = this.db.collection(collection);
      
      // Apply query constraints
      queryConstraints.forEach(constraint => {
        query = query.where(constraint.field, constraint.operator, constraint.value);
      });

      return query.onSnapshot((snapshot) => {
        const documents = [];
        snapshot.forEach(doc => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        
        callback({ success: true, data: documents });
      }, (error) => {
        console.error(`Error in collection snapshot for ${collection}:`, error);
        callback({ success: false, error: error.message });
      });
    } catch (error) {
      console.error(`Error setting up collection snapshot for ${collection}:`, error);
      return null;
    }
  }

  // User-specific operations
  async createUserProfile(userId, userData) {
    const userProfile = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: userData.role || 'student'
    };

    return await this.createDocument(this.collections.users, userProfile, userId);
  }

  async getUserProfile(userId) {
    return await this.readDocument(this.collections.users, userId);
  }

  async updateUserProfile(userId, updates) {
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };

    return await this.updateDocument(this.collections.users, userId, updateData);
  }

  // Progress tracking operations
  async saveProgress(userId, progressData) {
    const progress = {
      userId: userId,
      ...progressData,
      timestamp: new Date()
    };

    return await this.createDocument(this.collections.progress, progress);
  }

  async getUserProgress(userId) {
    const queryConstraints = [
      { field: 'userId', operator: '==', value: userId }
    ];

    return await this.queryDocuments(this.collections.progress, queryConstraints);
  }

  // Rules operations
  async saveRule(userId, ruleData) {
    const rule = {
      userId: userId,
      ...ruleData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    return await this.createDocument(this.collections.rules, rule);
  }

  async getUserRules(userId) {
    const queryConstraints = [
      { field: 'userId', operator: '==', value: userId },
      { field: 'isActive', operator: '==', value: true }
    ];

    return await this.queryDocuments(this.collections.rules, queryConstraints);
  }

  async updateRule(ruleId, updates) {
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };

    return await this.updateDocument(this.collections.rules, ruleId, updateData);
  }

  // Settings operations
  async saveUserSettings(userId, settings) {
    const userSettings = {
      userId: userId,
      ...settings,
      updatedAt: new Date()
    };

    return await this.createDocument(this.collections.settings, userSettings, userId);
  }

  async getUserSettings(userId) {
    return await this.readDocument(this.collections.settings, userId);
  }

  // Migration from localStorage
  async migrateFromLocalStorage(userId) {
    try {
      // Get data from localStorage
      const progressData = JSON.parse(localStorage.getItem('progressData') || '{}');
      const rulesData = JSON.parse(localStorage.getItem('rulesData') || '[]');
      const settingsData = JSON.parse(localStorage.getItem('settingsData') || '{}');

      // Migrate progress data
      if (Object.keys(progressData).length > 0) {
        await this.saveProgress(userId, progressData);
      }

      // Migrate rules data
      if (rulesData.length > 0) {
        for (const rule of rulesData) {
          await this.saveRule(userId, rule);
        }
      }

      // Migrate settings data
      if (Object.keys(settingsData).length > 0) {
        await this.saveUserSettings(userId, settingsData);
      }

      console.log('Migration from localStorage completed successfully');
      return { success: true };
    } catch (error) {
      console.error('Error during localStorage migration:', error);
      return { success: false, error: error.message };
    }
  }

  // Cleanup
  cleanup() {
    this.isInitialized = false;
    this.db = null;
  }
}

// Create global instance
const databaseService = new DatabaseService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabaseService;
}

// For browser usage, make service globally available
if (typeof window !== 'undefined') {
  window.databaseService = databaseService;
}
