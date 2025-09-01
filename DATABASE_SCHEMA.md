# Database Schema Design - Smart Home Simulator

## 📊 **Design Dato:** $(date)
**Status:** 🔄 Under udvikling
**Baseret på:** FRONTEND_ANALYSIS.md og API_DESIGN.md

## 🏗️ **Firebase Firestore Arkitektur**

### **Anbefalet Database:**
- **Development:** Firestore local emulator
- **Production:** Firebase Firestore (cloud-based)

### **Schema Versioning:**
- **Current:** v1.0
- **Migration Strategy:** Firestore data migration scripts
- **Backup Strategy:** Firebase automatic backups + manual exports

## 📋 **Firestore Collections**

### **1. Users Collection**
```javascript
// Collection: users
// Document ID: Firebase Auth UID
{
  "uid": "firebase_auth_uid",
  "email": "user@example.com",
  "displayName": "User Name",
  "role": "student", // "student" | "teacher" | "admin"
  "firstName": "User",
  "lastName": "Name",
  "isActive": true,
  "emailVerified": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-01T00:00:00Z"
}
```

### **2. Schools Table**
```sql
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
);
```

### **3. Classes Table**
```sql
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
    INDEX idx_school_id (school_id),
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
);
```

### **4. Class_Students Table (Many-to-Many)**
```sql
CREATE TABLE class_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL,
    student_id UUID NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(class_id, student_id),
    INDEX idx_class_id (class_id),
    INDEX idx_student_id (student_id)
);
```

### **5. User_Progress Table**
```sql
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    completed_tasks JSONB DEFAULT '[]',
    current_task VARCHAR(100),
    total_score INTEGER DEFAULT 0,
    learning_path ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_learning_path (learning_path),
    INDEX idx_last_activity (last_activity)
);
```

### **6. Completed_Tasks Table**
```sql
CREATE TABLE completed_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    task_id VARCHAR(100) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    score INTEGER DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, task_id),
    INDEX idx_user_id (user_id),
    INDEX idx_task_id (task_id),
    INDEX idx_completed_at (completed_at)
);
```

### **7. Simulator_Configurations Table**
```sql
CREATE TABLE simulator_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    configuration JSONB NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_name (name),
    INDEX idx_is_default (is_default)
);
```

### **8. Rules Table**
```sql
CREATE TABLE rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    trigger_type VARCHAR(100) NOT NULL,
    trigger_value TEXT,
    condition1 VARCHAR(100),
    condition1_value TEXT,
    condition2 VARCHAR(100),
    condition2_value TEXT,
    action1 VARCHAR(100) NOT NULL,
    action1_value TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
);
```

### **9. Rule_Executions Table**
```sql
CREATE TABLE rule_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID NOT NULL,
    user_id UUID NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    result JSONB,
    
    FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_rule_id (rule_id),
    INDEX idx_user_id (user_id),
    INDEX idx_executed_at (executed_at)
);
```

### **10. Learning_History Table**
```sql
CREATE TABLE learning_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    lesson_id VARCHAR(100),
    lesson_name VARCHAR(255),
    activity_type ENUM('lesson', 'quiz', 'task') NOT NULL,
    score INTEGER DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_completed_at (completed_at)
);
```

### **11. User_Settings Table**
```sql
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    theme VARCHAR(50) DEFAULT 'dark',
    compact_mode BOOLEAN DEFAULT false,
    animations_enabled BOOLEAN DEFAULT true,
    debug_mode BOOLEAN DEFAULT false,
    auto_save BOOLEAN DEFAULT true,
    notifications JSONB DEFAULT '{"email": true, "push": false}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);
```

### **12. Sessions Table**
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);
```

### **13. Sensor_Data Table**
```sql
CREATE TABLE sensor_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    sensor_type VARCHAR(50) NOT NULL,
    sensor_value JSONB NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_sensor_type (sensor_type),
    INDEX idx_timestamp (timestamp)
);
```

### **14. Audit_Log Table**
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);
```

## 🔐 **Sikkerhedsindstillinger**

### **Password Hashing:**
```sql
-- bcrypt med salt (implementeret i application layer)
-- Salt gemmes separat i users.salt
-- Password hash gemmes i users.password_hash
```

### **Data Encryption:**
```sql
-- Sensitive data krypteres med AES-256
-- Encryption keys roteres regelmæssigt
-- Backup data krypteres separat
```

### **Access Control:**
```sql
-- Row Level Security (RLS) for multi-tenant data
-- Views for restricted data access
-- Stored procedures for complex operations
```

## 📊 **Indekser og Performance**

### **Primary Indexes:**
- Alle PRIMARY KEY constraints
- FOREIGN KEY constraints
- UNIQUE constraints

### **Secondary Indexes:**
```sql
-- Composite indexes for common queries
CREATE INDEX idx_user_progress_composite ON user_progress(user_id, learning_path);
CREATE INDEX idx_rules_user_active ON rules(user_id, is_active);
CREATE INDEX idx_sensor_data_user_time ON sensor_data(user_id, timestamp);
CREATE INDEX idx_audit_log_user_time ON audit_log(user_id, created_at);
```

### **Partial Indexes:**
```sql
-- Kun aktive records
CREATE INDEX idx_active_users ON users(id) WHERE is_active = true;
CREATE INDEX idx_active_classes ON classes(id) WHERE is_active = true;
```

## 🔄 **Data Migration**

### **Fra localStorage til Database:**
```sql
-- Migration script struktur
-- 1. Export localStorage data
-- 2. Transform data format
-- 3. Import til database
-- 4. Validate data integrity
-- 5. Update frontend til at bruge API
```

### **Migration Scripts:**
```sql
-- users_migration.sql
-- progress_migration.sql
-- rules_migration.sql
-- settings_migration.sql
```

## 📈 **Skalerbarhed**

### **Partitioning Strategy:**
```sql
-- Sensor data partitioneret efter dato
-- Audit log partitioneret efter måned
-- Rule executions partitioneret efter uge
```

### **Archiving Strategy:**
```sql
-- Gamle sensor data arkiveres efter 1 år
-- Audit logs arkiveres efter 6 måneder
-- Completed tasks beholdes permanent
```

## 🔍 **Monitoring og Maintenance**

### **Database Monitoring:**
```sql
-- Slow query logging
-- Connection monitoring
-- Disk space monitoring
-- Backup verification
```

### **Maintenance Tasks:**
```sql
-- VACUUM og ANALYZE
-- Index rebuilding
-- Statistics updates
-- Log rotation
```

## 📋 **Backup og Recovery**

### **Backup Strategy:**
- **Full backup:** Daglig
- **Incremental backup:** Hver time
- **Transaction log backup:** Hver 15 minutter
- **Backup retention:** 30 dage

### **Recovery Procedures:**
- **Point-in-time recovery**
- **Disaster recovery plan**
- **Data validation efter recovery**

---

**Dette schema skal opdateres løbende under backend udvikling.**
