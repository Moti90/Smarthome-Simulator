# Auth0 Setup Guide - Smart Home Simulator

## 🎯 Overview

This guide will help you set up Auth0 authentication for your Smart Home Simulator project, replacing Firebase Authentication while keeping Firebase Firestore for the database.

## 🚀 Step 1: Create Auth0 Account

1. **Go to [Auth0.com](https://auth0.com/)**
2. **Sign up for a free account**
3. **Verify your email address**

## 🔧 Step 2: Create Auth0 Application

1. **Login to Auth0 Dashboard**
2. **Click "Applications" in the left sidebar**
3. **Click "Create Application"**
4. **Choose "Single Page Application"**
5. **Click "Create"**

## ⚙️ Step 3: Configure Application Settings

### Basic Settings
- **Name**: `Smart Home Simulator`
- **Description**: `Educational IoT platform with authentication`

### Allowed Callback URLs
```
http://localhost:3000
http://localhost:5000
http://localhost:8080
https://moti90.github.io
https://your-username.github.io
```

### Allowed Logout URLs
```
http://localhost:3000
http://localhost:5000
http://localhost:8080
https://moti90.github.io
https://your-username.github.io
```

### Allowed Web Origins
```
http://localhost:3000
http://localhost:5000
http://localhost:8080
https://moti90.github.io
https://your-username.github.io
```

## 🔑 Step 4: Get Configuration Values

After creating the application, you'll get:

- **Domain**: `your-username.auth0.com`
- **Client ID**: `long-random-string`

## 📝 Step 5: Update Configuration Files

### Update `auth0-config.js`

Replace the placeholder values in `auth0-config.js`:

```javascript
const auth0Config = {
  domain: 'your-username.auth0.com', // Replace with your actual domain
  clientId: 'your-client-id', // Replace with your actual client ID
  audience: 'https://your-api-identifier', // Optional: leave as is for now
  redirectUri: window.location.origin,
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  scope: 'openid profile email'
};
```

## 🎨 Step 6: Customize Login Experience (Optional)

### Custom Login Page
1. **Go to "Universal Login" in Auth0 Dashboard**
2. **Click "Customize"**
3. **Add your logo and branding**
4. **Customize colors and styling**

### Social Connections
1. **Go to "Authentication" → "Social"**
2. **Enable providers like Google, Microsoft, etc.**
3. **Configure OAuth settings for each provider**

## 🔒 Step 7: Security Configuration

### Rules (Optional)
Create custom rules in Auth0 Dashboard:

```javascript
function (user, context, callback) {
  // Add custom claims
  context.idToken['https://smarthome-simulator.com/role'] = 'student';
  
  // Add user metadata
  context.idToken['https://smarthome-simulator.com/school'] = user.user_metadata.school;
  
  callback(null, user, context);
}
```

### Actions (Optional)
Create custom actions for:
- User registration validation
- Role assignment
- School/class association

## 🧪 Step 8: Test Authentication

1. **Open your application**
2. **Click the "Login" button**
3. **You should be redirected to Auth0 login**
4. **After login, you'll be redirected back**
5. **Check that user info is displayed**

## 🔍 Step 9: Verify Integration

### Check Console Logs
Look for these success messages:
```
✅ Auth0 initialized successfully
✅ Auth0Service initialized
✅ Auth0 UI setup complete
🔐 Auth state changed: true [user object]
```

### Check User Interface
- Login button should disappear
- User name should be displayed
- Logout button should appear

## 🚨 Troubleshooting

### Common Issues

#### 1. "Auth0 SDK not loaded"
- Make sure Auth0 SDK script is included
- Check network tab for script loading errors

#### 2. "Invalid redirect URI"
- Verify callback URLs in Auth0 Dashboard
- Check that current URL matches allowed URLs

#### 3. "CORS errors"
- Add your domain to Allowed Web Origins
- Check browser console for CORS messages

#### 4. "Authentication callback failed"
- Verify Auth0 domain and client ID
- Check that Auth0 application is active

### Debug Steps
1. **Check browser console for errors**
2. **Verify Auth0 configuration values**
3. **Test with different browsers**
4. **Check Auth0 Dashboard logs**

## 📱 Mobile Testing

### Test on Mobile Devices
1. **Open your app on mobile**
2. **Test login/logout flow**
3. **Verify responsive design**
4. **Check touch interactions**

### Progressive Web App (PWA)
Consider adding PWA features:
- Service worker for offline support
- App manifest for install prompt
- Push notifications (optional)

## 🔄 Step 10: Update Firestore Rules

Since you're now using Auth0, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write progress
    match /progress/{docId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write rules
    match /rules/{docId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write schools and classes
    match /schools/{docId} {
      allow read, write: if request.auth != null;
    }
    
    match /classes/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🎯 Next Steps

After successful Auth0 integration:

1. **Test all authentication flows**
2. **Verify user data persistence**
3. **Test logout and session management**
4. **Implement role-based access control**
5. **Add user profile management**
6. **Test on different devices and browsers**

## 📚 Additional Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Quickstarts](https://auth0.com/docs/quickstarts)
- [Auth0 Community](https://community.auth0.com/)
- [Auth0 Blog](https://auth0.com/blog/)

## 🆘 Support

If you encounter issues:

1. **Check Auth0 Dashboard logs**
2. **Review browser console errors**
3. **Test with Auth0's sample applications**
4. **Contact Auth0 support (if on paid plan)**
5. **Check Auth0 community forums**

---

**Note**: This setup replaces Firebase Authentication with Auth0 while maintaining Firebase Firestore for the database. Your existing data and functionality will continue to work, but now with enhanced security and user management capabilities.
