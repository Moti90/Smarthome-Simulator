# GitHub Deployment Guide

## 🚀 Deployment Process

### Files Included in GitHub Repository

Only the following files are uploaded to GitHub for optimal performance:

#### 📁 Core Application Files
- `index.html` - Main Smart Home Simulator application
- `README.md` - GitHub-specific documentation (renamed from README_GITHUB.md)
- `floorplan.jpg.png` - Primary floor plan image
- `floorplan1.jpg.png` - Alternative floor plan image
- `LOGO.png` - Project logo

#### 📁 Excluded Files (Development Only)
- `todo.md` - Internal task management
- `WORKFLOW_PLAN.md` - AI workflow documentation
- `BACKUP_README.md` - Backup procedures
- `SECURITY_PLAN.md` - Security architecture
- `.eslintrc.security.js` - Security linting rules
- `package.json` - Backend dependencies
- `upload_to_github.bat` - Upload script
- `t.html` - Test file
- `.gitignore` - Git ignore rules

## 🔄 Upload Process

### Automated Upload Script
The `upload_to_github.bat` script performs the following steps:

1. **Selective File Addition**
   ```bash
   git add index.html
   git add README_GITHUB.md
   git add floorplan.jpg.png
   git add floorplan1.jpg.png
   git add LOGO.png
   ```

2. **README Preparation**
   ```bash
   copy README_GITHUB.md README.md
   ```

3. **Commit and Push**
   ```bash
   git commit -m "Update Smart Home Simulator - Optimized for GitHub Pages deployment"
   git push origin main
   ```

### Manual Upload Process
If you need to upload manually:

1. **Stage only necessary files:**
   ```bash
   git add index.html README_GITHUB.md floorplan.jpg.png floorplan1.jpg.png LOGO.png
   ```

2. **Rename README:**
   ```bash
   copy README_GITHUB.md README.md
   git add README.md
   ```

3. **Commit and push:**
   ```bash
   git commit -m "Your commit message"
   git push origin main
   ```

## 🌐 GitHub Pages Setup

### Repository Settings
1. Go to repository Settings
2. Navigate to Pages section
3. Set Source to "Deploy from a branch"
4. Select "main" branch
5. Set folder to "/ (root)"
6. Click Save

### Live Demo URL
- **Repository**: https://github.com/Moti90/Smarthome-Simulator
- **Live Demo**: https://moti90.github.io/Smarthome-Simulator/

## 📊 Benefits of Optimized Deployment

### Performance
- **Faster Loading**: Only essential files
- **Reduced Bandwidth**: Smaller repository size
- **Better SEO**: Clean repository structure

### Security
- **No Sensitive Data**: Development files excluded
- **Clean History**: No internal documentation exposed
- **Professional Appearance**: Repository focused on app

### Maintenance
- **Easy Updates**: Clear separation of concerns
- **Version Control**: Clean commit history
- **Collaboration**: Professional repository structure

## 🔧 Troubleshooting

### Common Issues

#### App Not Loading
- Check if `index.html` is in root directory
- Verify all image files are included
- Test locally before uploading

#### Images Not Displaying
- Ensure image files are committed
- Check file paths in HTML
- Verify file permissions

#### README Not Updating
- Make sure `README_GITHUB.md` exists
- Check copy command in batch file
- Verify file is committed

### Manual Recovery
If the upload script fails:

1. **Reset to last working state:**
   ```bash
   git reset --hard HEAD~1
   ```

2. **Manual upload:**
   ```bash
   git add index.html README_GITHUB.md floorplan.jpg.png floorplan1.jpg.png LOGO.png
   copy README_GITHUB.md README.md
   git add README.md
   git commit -m "Manual upload"
   git push origin main
   ```

## 📝 Best Practices

### Before Upload
- [ ] Test app locally
- [ ] Verify all features work
- [ ] Check mobile responsiveness
- [ ] Update README_GITHUB.md if needed

### After Upload
- [ ] Test live demo URL
- [ ] Verify all images load
- [ ] Check mobile compatibility
- [ ] Update documentation if needed

### Regular Maintenance
- [ ] Update README_GITHUB.md with new features
- [ ] Test upload process monthly
- [ ] Monitor GitHub Pages performance
- [ ] Keep local backup of all files

---

**Last Updated**: January 2025
**Maintained By**: AI Assistant + User collaboration
