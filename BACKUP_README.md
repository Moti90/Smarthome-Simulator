# Smart Home Simulator - Backup & Version Control Guide

## 🔄 Backup Process

### Current Backup Status
- **Last Backup**: $(date)
- **Backup Method**: Git version control
- **Backup Location**: Local Git repository
- **Auto-backup**: Enabled via Git hooks

## 📁 Files Included in Backup

### Core Application Files
- `index.html` - Main application file
- `todo.md` - Task management and project status
- `SECURITY_PLAN.md` - Security architecture and guidelines
- `WORKFLOW_PLAN.md` - AI workflow process
- `package.json` - Dependencies and scripts
- `.eslintrc.security.js` - Security linting rules

### Configuration Files
- `.gitignore` - Git ignore rules
- `README.md` - Project documentation
- `BACKUP_README.md` - This backup guide

### Assets
- `floorplan.jpg.png` - Floor plan image
- `floorplan1.jpg.png` - Alternative floor plan
- `LOGO.png` - Project logo

## 🔧 How to Create a Backup

### Manual Backup
```bash
# Add all changes to staging
git add .

# Create a commit with descriptive message
git commit -m "Backup: [Description of changes] - $(date)"

# Push to remote repository (if configured)
git push origin main
```

### Automatic Backup (via package.json scripts)
```bash
# Create backup with timestamp
npm run backup

# Create backup with custom message
npm run backup:custom "Custom backup message"
```

## 🔄 How to Restore from Backup

### View Available Backups
```bash
# List all commits (backups)
git log --oneline

# View detailed backup information
git log --pretty=format:"%h - %an, %ar : %s"
```

### Restore to Previous Version
```bash
# Restore to specific commit
git checkout [commit-hash]

# Restore to previous commit
git checkout HEAD~1

# Restore to specific file from previous version
git checkout [commit-hash] -- [filename]
```

### Complete Rollback
```bash
# Hard reset to previous commit (WARNING: Destructive)
git reset --hard [commit-hash]

# Soft reset (keeps changes in staging)
git reset --soft [commit-hash]
```

## 🚨 Emergency Recovery

### If Git Repository is Corrupted
1. **Check for local backups**:
   ```bash
   ls -la *.backup
   ls -la backup/
   ```

2. **Restore from manual backup**:
   ```bash
   cp index.html.backup index.html
   cp todo.md.backup todo.md
   ```

3. **Reinitialize Git**:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Emergency recovery: $(date)"
   ```

### If Files are Accidentally Deleted
```bash
# Restore from Git
git checkout HEAD -- [filename]

# Restore from last commit
git checkout HEAD~1 -- [filename]
```

## 📊 Backup Verification

### Check Backup Integrity
```bash
# Verify Git repository
git fsck

# Check for corrupted objects
git fsck --full

# Verify file integrity
git log --pretty=format:"%H" | head -10 | xargs -I {} git show {}:index.html | head -5
```

### Test Restore Process
```bash
# Create test branch
git checkout -b test-restore

# Make changes
echo "test" >> test-file.txt

# Restore to previous state
git checkout main

# Verify restoration
git status
```

## 🔐 Security Considerations

### Sensitive Files (NOT in Backup)
- `.env` files with API keys
- Database files with real data
- SSL certificates
- Local configuration files

### Backup Encryption
- Git repository can be encrypted
- Consider using Git-crypt for sensitive data
- Use encrypted storage for backups

## 📅 Backup Schedule

### Recommended Backup Frequency
- **Development**: Every significant change
- **Testing**: Before and after major features
- **Production**: Daily automated backups

### Backup Retention
- **Local**: Keep last 50 commits
- **Remote**: Keep all commits
- **Manual**: Keep last 10 manual backups

## 🛠️ Backup Scripts

### Available Scripts (in package.json)
```json
{
  "scripts": {
    "backup": "git add . && git commit -m \"Auto backup: $(date)\"",
    "backup:custom": "git add . && git commit -m \"$1\"",
    "backup:verify": "git fsck",
    "backup:list": "git log --oneline -10",
    "backup:restore": "echo 'Use: git checkout [commit-hash]'"
  }
}
```

## 📞 Emergency Contacts

### If Backup Fails
1. **Check disk space**: `df -h`
2. **Check Git status**: `git status`
3. **Check file permissions**: `ls -la`
4. **Contact**: [Your contact information]

---

**Last Updated**: $(date)
**Next Review**: Monthly
**Responsible**: Development team
