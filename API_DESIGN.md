# API Design - Smart Home Simulator

## 📊 **Design Dato:** $(date)
**Status:** 🔄 Under udvikling
**Baseret på:** FRONTEND_ANALYSIS.md og BACKEND_PLAN.md

## 🏗️ **Firebase API Arkitektur**

### **Firebase Cloud Functions API Design**
- **Base URL:** `https://[region]-[project-id].cloudfunctions.net/api/v1`
- **Authentication:** Firebase Auth tokens
- **Content-Type:** `application/json`
- **Error Handling:** Firebase standard error responses
- **Rate Limiting:** Firebase built-in limits

### **API Versioning**
- **Current:** v1
- **Versioning Strategy:** URL path versioning
- **Backward Compatibility:** Maintained for 1 year

## 🔐 **Firebase Authentication Endpoints**

### **POST /api/v1/auth/register**
**Beskrivelse:** Registrer ny bruger via Firebase Auth
```json
{
  "email": "string",
  "password": "string",
  "displayName": "string",
  "role": "student|teacher|admin"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "uid": "string",
    "email": "string",
    "displayName": "string",
    "role": "string",
    "createdAt": "ISO date"
  },
  "token": "Firebase ID token"
}
```

### **POST /api/v1/auth/login**
**Beskrivelse:** Login bruger
```json
{
  "username": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "username": "string",
    "role": "string",
    "lastLogin": "ISO date"
  },
  "token": "JWT token",
  "refreshToken": "refresh token"
}
```

### **POST /api/v1/auth/refresh**
**Beskrivelse:** Forny JWT token
```json
{
  "refreshToken": "string"
}
```

### **POST /api/v1/auth/logout**
**Beskrivelse:** Logout bruger
**Headers:** `Authorization: Bearer <token>`

## 👥 **User Management Endpoints**

### **GET /api/v1/users/profile**
**Beskrivelse:** Hent bruger profil
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "firstName": "string",
  "lastName": "string",
  "createdAt": "ISO date",
  "lastLogin": "ISO date"
}
```

### **PUT /api/v1/users/profile**
**Beskrivelse:** Opdater bruger profil
**Headers:** `Authorization: Bearer <token>`
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

### **PUT /api/v1/users/password**
**Beskrivelse:** Skift password
**Headers:** `Authorization: Bearer <token>`
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

## 📊 **Progress Tracking Endpoints**

### **GET /api/v1/progress**
**Beskrivelse:** Hent bruger progress
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "completedTasks": ["task1", "task2"],
  "currentTask": "task3",
  "totalScore": 150,
  "learningPath": "beginner",
  "lastActivity": "ISO date"
}
```

### **POST /api/v1/progress/task-complete**
**Beskrivelse:** Marker opgave som fuldført
**Headers:** `Authorization: Bearer <token>`
```json
{
  "taskId": "string",
  "taskName": "string",
  "score": 100,
  "completedAt": "ISO date"
}
```

### **GET /api/v1/progress/analytics**
**Beskrivelse:** Hent progress analytics (kun teachers)
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:** `classId`, `timeRange`
**Response:**
```json
{
  "classProgress": [
    {
      "studentId": "string",
      "studentName": "string",
      "completedTasks": 5,
      "totalScore": 250,
      "lastActivity": "ISO date"
    }
  ],
  "classStats": {
    "averageScore": 200,
    "totalTasks": 10,
    "activeStudents": 15
  }
}
```

## 🏠 **Simulator Data Endpoints**

### **GET /api/v1/simulator/config**
**Beskrivelse:** Hent simulator konfiguration
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "savedConfigurations": [],
  "sensorHistory": [],
  "ruleHistory": [],
  "deviceStates": {
    "lights": {},
    "security": {},
    "entertainment": {},
    "climate": {}
  }
}
```

### **POST /api/v1/simulator/config**
**Beskrivelse:** Gem simulator konfiguration
**Headers:** `Authorization: Bearer <token>`
```json
{
  "configuration": {
    "name": "string",
    "devices": {},
    "sensors": {},
    "rules": []
  }
}
```

### **GET /api/v1/simulator/rules**
**Beskrivelse:** Hent bruger regler
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "rules": [
    {
      "id": "string",
      "trigger": "string",
      "triggerValue": "string",
      "cond1": "string",
      "cond1Value": "string",
      "cond2": "string",
      "cond2Value": "string",
      "action1": "string",
      "action1Value": "string",
      "ruleName": "string",
      "createdAt": "ISO date"
    }
  ]
}
```

### **POST /api/v1/simulator/rules**
**Beskrivelse:** Opret ny regel
**Headers:** `Authorization: Bearer <token>`
```json
{
  "trigger": "string",
  "triggerValue": "string",
  "cond1": "string",
  "cond1Value": "string",
  "cond2": "string",
  "cond2Value": "string",
  "action1": "string",
  "action1Value": "string",
  "ruleName": "string"
}
```

### **PUT /api/v1/simulator/rules/:id**
**Beskrivelse:** Opdater regel
**Headers:** `Authorization: Bearer <token>`

### **DELETE /api/v1/simulator/rules/:id**
**Beskrivelse:** Slet regel
**Headers:** `Authorization: Bearer <token>`

## 🏫 **Class Management Endpoints**

### **GET /api/v1/classes**
**Beskrivelse:** Hent klasser (kun teachers)
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "classes": [
    {
      "id": "string",
      "schoolId": "string",
      "className": "string",
      "studentCount": 15,
      "createdAt": "ISO date"
    }
  ]
}
```

### **POST /api/v1/classes**
**Beskrivelse:** Opret ny klasse (kun teachers)
**Headers:** `Authorization: Bearer <token>`
```json
{
  "schoolId": "string",
  "className": "string"
}
```

### **GET /api/v1/classes/:id/students**
**Beskrivelse:** Hent studerende i klasse
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "students": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "lastActivity": "ISO date",
      "progress": {
        "completedTasks": 5,
        "totalScore": 250
      }
    }
  ]
}
```

### **POST /api/v1/classes/:id/students**
**Beskrivelse:** Tilføj studerende til klasse
**Headers:** `Authorization: Bearer <token>`
```json
{
  "studentIds": ["string"]
}
```

## 📚 **Learning History Endpoints**

### **GET /api/v1/learning/history**
**Beskrivelse:** Hent læringshistorik
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "completedLessons": [
    {
      "id": "string",
      "name": "string",
      "completedAt": "ISO date",
      "score": 100
    }
  ],
  "quizResults": [
    {
      "id": "string",
      "quizName": "string",
      "score": 85,
      "completedAt": "ISO date"
    }
  ],
  "lastActivity": "ISO date"
}
```

### **POST /api/v1/learning/lesson-complete**
**Beskrivelse:** Marker lektion som fuldført
**Headers:** `Authorization: Bearer <token>`
```json
{
  "lessonId": "string",
  "lessonName": "string",
  "score": 100,
  "completedAt": "ISO date"
}
```

## ⚙️ **Settings Endpoints**

### **GET /api/v1/settings**
**Beskrivelse:** Hent bruger indstillinger
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
{
  "theme": "dark|light|powerful|gold",
  "compactMode": false,
  "animationsEnabled": true,
  "debugMode": false,
  "autoSave": true,
  "notifications": {
    "email": true,
    "push": false
  }
}
```

### **PUT /api/v1/settings**
**Beskrivelse:** Opdater bruger indstillinger
**Headers:** `Authorization: Bearer <token>`
```json
{
  "theme": "string",
  "compactMode": false,
  "animationsEnabled": true,
  "debugMode": false,
  "autoSave": true
}
```

## 📤 **Export/Import Endpoints**

### **GET /api/v1/export/data**
**Beskrivelse:** Eksporter bruger data
**Headers:** `Authorization: Bearer <token>`
**Query Parameters:** `format=json|csv`
**Response:** File download

### **POST /api/v1/import/data**
**Beskrivelse:** Importer bruger data
**Headers:** `Authorization: Bearer <token>`
**Content-Type:** `multipart/form-data`
```json
{
  "file": "file upload",
  "overwrite": false
}
```

## 🔄 **Real-time WebSocket Events**

### **Connection**
```javascript
// Connect to WebSocket
const socket = io('ws://localhost:3000', {
  auth: {
    token: 'JWT token'
  }
});
```

### **Events**

#### **Client to Server:**
- `join-class` - Join class room for real-time updates
- `leave-class` - Leave class room
- `progress-update` - Send progress update
- `rule-execution` - Send rule execution event

#### **Server to Client:**
- `student-progress` - Student progress update
- `class-activity` - Class activity notification
- `task-completed` - Task completion notification
- `rule-triggered` - Rule execution notification

## 🚨 **Error Handling**

### **Standard Error Response:**
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "timestamp": "ISO date"
  }
}
```

### **Common Error Codes:**
- `AUTH_REQUIRED` - Authentication required
- `INVALID_TOKEN` - Invalid or expired token
- `PERMISSION_DENIED` - Insufficient permissions
- `VALIDATION_ERROR` - Input validation failed
- `RESOURCE_NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded
- `INTERNAL_ERROR` - Internal server error

## 📊 **Rate Limiting**

### **Limits:**
- **Authentication:** 5 requests per minute
- **API Calls:** 100 requests per minute per user
- **File Uploads:** 10 requests per hour per user
- **WebSocket Connections:** 5 connections per user

### **Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🔒 **Security Headers**

### **Required Headers:**
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 📋 **API Testing**

### **Postman Collection:**
- **Environment Variables:** Base URL, Auth Token
- **Test Scripts:** Response validation
- **Pre-request Scripts:** Token refresh

### **Automated Testing:**
- **Unit Tests:** Individual endpoint testing
- **Integration Tests:** End-to-end workflow testing
- **Load Tests:** Performance testing
- **Security Tests:** Vulnerability scanning

---

**Dette dokument skal opdateres løbende under API udvikling.**
