# Smart Home Simulator - Educational Platform

## 🎯 Project Overview

A comprehensive Smart Home Simulator designed for educational purposes, allowing students to learn about IoT, automation, and smart home technologies through hands-on simulation.

## 📁 Project Structure

### Core Files
- `index.html` - Main application (Smart Home Simulator)
- `todo.md` - **CRITICAL**: Task management and project status
- `WORKFLOW_PLAN.md` - **CRITICAL**: AI workflow process
- `FRONTEND_ANALYSIS.md` - **CRITICAL**: Complete frontend architecture analysis
- `SECURITY_PLAN.md` - Security architecture and guidelines
- `BACKUP_README.md` - Backup and version control guide

### Configuration
- `package.json` - Dependencies and scripts
- `.eslintrc.security.js` - Security linting rules
- `.gitignore` - Git ignore rules

### Assets
- `floorplan.jpg.png` - Floor plan image
- `floorplan1.jpg.png` - Alternative floor plan
- `LOGO.png` - Project logo

## 🔄 **CRITICAL: AI Assistant Workflow**

### **MANDATORY PROCESS FOR EVERY TASK:**
1. **PLAN PHASE** - Altid læg en plan før handling
2. **APPROVAL PHASE** - Vent på eksplicit godkendelse
3. **EXECUTION PHASE** - Følg planen præcist
4. **VALIDATION PHASE** - Verificer alle exit krav
5. **SMART BACKUP PHASE** - Spørg om funktionalitet virker før backup

### **Smart Backup Strategy:**
- **ALWAYS ask**: "Virker denne funktionalitet som forventet?"
- **ONLY backup** when user confirms functionality works
- **NEVER backup** broken or non-functional code
- **Ask after**: New features, bug fixes, refactoring, security updates

## 🛡️ Security Focus

This project prioritizes security with:
- Comprehensive security plan in `SECURITY_PLAN.md`
- Security-focused dependencies and tooling
- Automated security scanning and testing
- Input validation and sanitization

## 📋 Current Status

### ✅ Completed
- [x] Smart Home Simulator frontend
- [x] Security architecture planning
- [x] Workflow process documentation
- [x] Backup system setup
- [x] Smart backup strategy implementation
- [x] Complete frontend code analysis and documentation

### 🔄 In Progress
- [ ] Backend planning and architecture discussion
- [ ] Frontend performance optimization
- [ ] Accessibility improvements

### 📝 Next Steps
- [ ] Backend technology stack selection
- [ ] API design and implementation
- [ ] Database schema design
- [ ] Authentication system implementation

## 🚀 Quick Start

### For Development
```bash
# Install dependencies (when backend is ready)
npm install

# Start development server
npm run dev

# Run security tests
npm run test:security

# Create smart backup
npm run backup:smart
```

### For Backup Management
```bash
# Check current status
npm run backup:check-status

# List recent backups
npm run backup:list

# Restore from backup
npm run backup:restore
# Then: git reset --hard [commit-hash]
```

## 📚 Documentation

- **`todo.md`** - Current tasks and project status
- **`WORKFLOW_PLAN.md`** - Detailed AI workflow process
- **`FRONTEND_ANALYSIS.md`** - Complete frontend architecture analysis
- **`SECURITY_PLAN.md`** - Security architecture and guidelines
- **`BACKUP_README.md`** - Backup and version control procedures

## 🔧 AI Assistant Instructions

### **CRITICAL: Always Read These Files First**
1. **`todo.md`** - Check current tasks and priorities
2. **`WORKFLOW_PLAN.md`** - Follow the mandatory workflow process
3. **`FRONTEND_ANALYSIS.md`** - Understand current architecture and data flows
4. **`SECURITY_PLAN.md`** - Ensure security compliance
5. **`BACKUP_README.md`** - Understand backup procedures

### **Workflow Requirements**
- **NEVER skip planning phase**
- **ALWAYS wait for explicit approval**
- **ALWAYS ask about functionality before backup**
- **ALWAYS update todo.md after tasks**
- **ONLY ignore workflow for critical bugs/security issues**

### **Smart Backup Questions**
After any significant change, ask:
- "Virker denne feature som forventet?"
- "Er problemet løst?"
- "Virker alt stadig som før?"
- "Skal jeg lave backup af disse ændringer?"

## 🎯 Project Goals

1. **Educational Excellence** - Provide hands-on learning for smart home technologies
2. **Security First** - Implement robust security measures
3. **User Experience** - Intuitive and accessible interface
4. **Scalability** - Support for multiple users and classes
5. **Maintainability** - Clean, documented, and well-structured code

---

**Last Updated**: $(date)
**Next Review**: After each major task
**Responsible**: AI Assistant + User collaboration
