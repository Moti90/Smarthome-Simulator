# Firebase Setup Guide - Smart Home Simulator

## 🚀 Getting Started with Firebase

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Google account for Firebase Console

## 📋 Step-by-Step Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
# In your project directory
firebase init
```

**Select the following services:**
- [x] Firestore Database
- [x] Functions (optional for now)
- [x] Hosting
- [x] Emulators

**Choose options:**
- Use existing project: **No**
- Create new project: **Yes**
- Project name: `ibisimulator-[your-name]`
- Public directory: `.` (current directory)
- Single-page app: **Yes**
- Overwrite index.html: **No**

### 4. Configure Firebase Project

#### A. Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Create a project"
- Enter project name: `ibisimulator-[your-name]`
- Enable Google Analytics (optional)
- Click "Create project"

#### B. Enable Services
1. **Authentication**
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-in (optional)

2. **Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (we'll add security rules later)
   - Select location closest to your users

3. **Hosting** (optional for now)
   - Go to Hosting
   - Click "Get started"
   - Follow setup instructions

### 5. Update Configuration Files

#### A. Update `firebase-config.js`
Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

**To find these values:**
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web app icon
4. Copy the config object

#### B. Update `.gitignore`
Add Firebase-specific exclusions:

```gitignore
# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Test Local Development
```bash
# Start Firebase emulators
npm run emulators

# Or start specific services
firebase emulators:start --only auth,firestore,hosting
```

**Emulator URLs:**
- Auth: http://localhost:9099
- Firestore: http://localhost:8080
- Hosting: http://localhost:5000
- Emulator UI: http://localhost:4000

## 🔧 Configuration Details

### Firebase Services Used

#### Authentication
- **Email/Password**: Standard login system
- **Google Sign-in**: Optional social login
- **Anonymous Auth**: For guest users

#### Firestore Database
- **Collections**: users, progress, rules, settings, schools, classes
- **Security Rules**: Row-level security per user
- **Real-time Listeners**: Live updates for collaboration
- **Offline Support**: Local caching with sync

#### Hosting
- **Static Files**: Frontend hosting
- **Custom Domains**: Professional branding
- **CDN**: Global distribution
- **SSL**: Automatic HTTPS

### Security Rules
The `firestore.rules` file implements:
- User isolation (users can only access their own data)
- Role-based access control
- Secure data validation
- Default deny all policy

## 🧪 Testing Your Setup

### 1. Test Authentication
```javascript
// In browser console
await authService.initialize();
await authService.signUp('test@example.com', 'password123', 'Test User');
```

### 2. Test Database
```javascript
// In browser console
await databaseService.initialize();
await databaseService.createDocument('users', { name: 'Test User' });
```

### 3. Test Real-time Updates
```javascript
// Listen for real-time updates
databaseService.onCollectionSnapshot('users', (result) => {
  console.log('Users updated:', result.data);
});
```

## 🚨 Common Issues & Solutions

### Issue: "Firebase SDK not loaded"
**Solution:** Include Firebase scripts in your HTML before your custom scripts:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<!-- Your scripts -->
<script src="firebase-config.js"></script>
<script src="auth-service.js"></script>
<script src="database-service.js"></script>
```

### Issue: "Permission denied" in Firestore
**Solution:** 
1. Check if security rules are deployed: `firebase deploy --only firestore:rules`
2. Verify user is authenticated
3. Check if user ID matches document owner

### Issue: Emulators not starting
**Solution:**
1. Check if ports are available
2. Kill processes using the ports
3. Use different ports in `firebase.json`

## 📚 Next Steps

### 1. Deploy to Production
```bash
# Deploy all services
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

### 2. Set Up CI/CD
- Connect to GitHub repository
- Enable automatic deployments
- Set up staging environment

### 3. Monitor & Analytics
- Enable Firebase Analytics
- Set up error reporting
- Monitor performance metrics

## 🔐 Security Best Practices

### 1. Environment Variables
Never commit API keys to version control:
```bash
# Create .env file (add to .gitignore)
FIREBASE_API_KEY=your-api-key
FIREBASE_PROJECT_ID=your-project-id
```

### 2. Security Rules
- Always validate user authentication
- Implement row-level security
- Use custom claims for roles
- Regular security audits

### 3. API Key Restrictions
- Restrict API key usage in Google Cloud Console
- Set up proper referrer restrictions
- Monitor API usage

## 📞 Support

### Firebase Documentation
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Community Resources
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase YouTube Channel](https://www.youtube.com/user/Firebase)

---

**Last Updated**: $(date)
**Next Review**: After Firebase setup completion
**Status**: Ready for implementation
