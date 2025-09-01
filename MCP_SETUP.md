# Model Context Protocol (MCP) Setup Guide

## 🎯 Overview

Model Context Protocol (MCP) enables AI agents to access external tools and data sources, including Snyk for security scanning. This guide explains how to set up MCP in your IDE for enhanced security monitoring.

## 🔧 Prerequisites

### Required Software
- **IDE**: VS Code, Cursor, or compatible editor
- **Node.js**: Version 18+ (already installed)
- **Snyk CLI**: Already installed in project
- **Git**: For version control integration

### Required Accounts
- **Snyk Account**: Free account for vulnerability scanning
- **GitHub Account**: For repository integration (optional)

## 🚀 Installation Steps

### 1. Install MCP Extension

#### For VS Code/Cursor:
1. Open Extensions panel (Ctrl+Shift+X)
2. Search for "Model Context Protocol"
3. Install the official MCP extension
4. Restart your IDE

#### For Other IDEs:
- Check your IDE's extension marketplace for MCP support
- Follow the specific installation instructions

### 2. Configure MCP for Snyk

#### Create MCP Configuration File
Create `.mcp/config.json` in your project root:

```json
{
  "mcpServers": {
    "snyk": {
      "command": "npx",
      "args": ["snyk", "mcp"],
      "env": {
        "SNYK_TOKEN": "your-snyk-token-here"
      }
    }
  },
  "tools": {
    "security-scan": {
      "description": "Run Snyk security scan",
      "command": "npm run security:scan"
    },
    "vulnerability-check": {
      "description": "Check for vulnerabilities",
      "command": "npm run security:test"
    },
    "security-monitor": {
      "description": "Monitor security status",
      "command": "npm run security:monitor"
    }
  }
}
```

### 3. Set Up Snyk Authentication

#### Get Snyk Token:
1. Go to [Snyk.io](https://snyk.io)
2. Create free account or sign in
3. Go to Account Settings → API Tokens
4. Generate new token
5. Copy token to clipboard

#### Configure Token:
```bash
# Set environment variable
export SNYK_TOKEN=your-token-here

# Or add to .env file
echo "SNYK_TOKEN=your-token-here" >> .env
```

### 4. Test MCP Setup

#### Test Snyk Integration:
```bash
# Test Snyk connection
npx snyk auth

# Test security scan
npm run security:scan

# Test MCP tools
npx snyk mcp --test
```

## 🔍 Using MCP with AI Agents

### Available Commands for AI:
- `security:scan` - Run full security scan
- `security:test` - Quick vulnerability test
- `security:monitor` - Monitor security status
- `security:fix` - Interactive security fixes

### AI Agent Instructions:
When working with this project, the AI agent should:

1. **Before making changes:**
   ```bash
   npm run security:scan
   ```

2. **After making changes:**
   ```bash
   npm run security:test
   npm run security:monitor
   ```

3. **When adding dependencies:**
   ```bash
   npm run security:test:all
   ```

## 🛡️ Security Workflow Integration

### Pre-commit Security Check:
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running security scan..."
npm run security:scan

if [ $? -ne 0 ]; then
    echo "Security vulnerabilities found! Please fix before committing."
    exit 1
fi

echo "Security scan passed!"
```

### CI/CD Integration:
```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run security:scan
      - run: npm run security:monitor
```

## 📊 Monitoring and Alerts

### Snyk Dashboard:
1. Go to [Snyk Dashboard](https://app.snyk.io)
2. Connect your GitHub repository
3. Enable automatic scanning
4. Set up email alerts

### Local Monitoring:
```bash
# Daily security check
npm run security:monitor

# Weekly full scan
npm run security:test:all

# Monthly vulnerability review
npm run security:fix
```

## 🔧 Troubleshooting

### Common Issues:

#### MCP Not Connecting:
```bash
# Check MCP extension status
# Restart IDE
# Verify configuration file syntax
```

#### Snyk Authentication Failed:
```bash
# Re-authenticate
npx snyk auth

# Check token validity
npx snyk whoami
```

#### Security Scan Failing:
```bash
# Check for vulnerabilities
npm run security:test

# Review and fix issues
npm run security:fix
```

### Debug Commands:
```bash
# Debug MCP connection
npx snyk mcp --debug

# Check Snyk status
npx snyk status

# View security report
npx snyk report
```

## 📚 Additional Resources

### Documentation:
- [MCP Official Docs](https://modelcontextprotocol.io)
- [Snyk Documentation](https://docs.snyk.io)
- [VS Code MCP Extension](https://marketplace.visualstudio.com/items?itemName=modelcontextprotocol.mcp)

### Security Best Practices:
- Run security scans before each commit
- Monitor dependencies regularly
- Keep security tools updated
- Review vulnerability reports monthly

## 🎯 Next Steps

### Immediate Actions:
1. [ ] Install MCP extension in your IDE
2. [ ] Create Snyk account and get token
3. [ ] Configure MCP for Snyk integration
4. [ ] Test security scanning workflow
5. [ ] Set up pre-commit security hooks

### Future Enhancements:
- [ ] Integrate with CI/CD pipeline
- [ ] Set up automated vulnerability alerts
- [ ] Configure security policy enforcement
- [ ] Implement security training for team

---

**Last Updated**: January 2025
**Maintained By**: AI Assistant + User collaboration
**Security Level**: ENHANCED
