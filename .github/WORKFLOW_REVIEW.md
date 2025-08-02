# 📊 CI/CD Workflow Review Tool

This document provides an agentic approach to monitoring and reviewing GitHub Actions workflows.

## 🚀 Current Workflow Status

### Tag-Based Release Process
We've successfully created tag `v0.0.1` which should trigger:

1. **Test Matrix**: Run tests on Ubuntu, Windows, macOS with Node 18.x & 20.x
2. **Security Audit**: Check for vulnerabilities
3. **Package Creation**: Build VSIX extension package
4. **GitHub Release**: Automatically create release with assets
5. **Marketplace Publishing**: (If VSCE_PAT secret is configured)

## 🔍 Workflow Monitoring Commands

### Check Current Workflow Runs
```bash
# List recent workflow runs
gh run list --limit 10

# Get detailed status of latest run
gh run view

# Watch workflow in real-time
gh run watch
```

### Review Specific Workflow
```bash
# View specific run by ID
gh run view [RUN_ID]

# Download logs for debugging
gh run download [RUN_ID]

# Re-run failed workflows
gh run rerun [RUN_ID]
```

## 📋 Workflow Validation Checklist

### ✅ Tag Trigger Validation
- [x] Tag `v0.0.1` created and pushed
- [ ] Workflow triggered by tag push
- [ ] All test matrix jobs started
- [ ] Security audit completed
- [ ] Package job executed
- [ ] GitHub release created
- [ ] Artifacts attached to release

### 🧪 Test Matrix Verification
Expected jobs:
- [ ] ubuntu-latest + Node 18.x
- [ ] ubuntu-latest + Node 20.x  
- [ ] windows-latest + Node 18.x
- [ ] windows-latest + Node 20.x
- [ ] macos-latest + Node 18.x
- [ ] macos-latest + Node 20.x

### 📦 Package Verification
- [ ] VSIX file created successfully
- [ ] Bundle size within limits (<50KB)
- [ ] Extension metadata correct
- [ ] No critical vulnerabilities

### 🚀 Release Verification
- [ ] GitHub release created automatically
- [ ] Release notes populated
- [ ] VSIX attached as asset
- [ ] Tag version matches package.json
- [ ] Release not marked as draft

## 🔧 Troubleshooting Guide

### Common Issues and Solutions

#### 1. **Workflow Not Triggering**
```yaml
# Check trigger configuration
on:
  push:
    tags: [ 'v*' ]  # Should match tag format
```

#### 2. **Test Failures**
```bash
# Check test logs
gh run view --log-failed

# Common VS Code test issues:
# - VS Code download timeout
# - Display server issues on Linux
# - Permission issues on Windows
```

#### 3. **Package Job Failures**
```bash
# Check vsce package issues:
npm install -g vsce
vsce package --allow-star-activation

# Common issues:
# - Missing publisher in package.json
# - Invalid icon path
# - Bundle size too large
```

#### 4. **Release Creation Issues**
```bash
# Verify GitHub token permissions
# Token needs: Contents: Write, Metadata: Read
```

#### 5. **Marketplace Publishing**
```bash
# Setup marketplace publishing:
# 1. Create Azure DevOps account
# 2. Generate Personal Access Token
# 3. Add as repository secret: VSCE_PAT
```

## 📊 Performance Monitoring

### Key Metrics to Track
```bash
# Workflow execution time
gh run list --json conclusion,createdAt,updatedAt

# Bundle size check
ls -la *.vsix

# Test execution time by platform
gh run view --log | grep "Test Extension"
```

### Expected Performance Targets
- **Total workflow time**: <15 minutes
- **Test matrix completion**: <10 minutes per job
- **Package creation**: <2 minutes
- **Bundle size**: <50KB
- **Extension activation**: <100ms (tested in CI)

## 🎯 Automated Quality Gates

### Pre-Release Checks
```bash
# All these must pass before release:
npm run lint          # Code style
npm run check-types   # Type safety  
npm test              # Functional tests
npm run package       # Build verification
npm audit             # Security audit
```

### Post-Release Verification
```bash
# Verify release assets
gh release view v0.0.1

# Check marketplace status (if published)
# Visit: https://marketplace.visualstudio.com/

# Test installation
code --install-extension [path-to-vsix]
```

## 🔄 Continuous Monitoring

### Weekly Health Checks
- [ ] Check for dependency updates
- [ ] Review security advisories
- [ ] Monitor VS Code version compatibility
- [ ] Check workflow performance trends

### Release Readiness Assessment
- [ ] All tests passing
- [ ] No critical vulnerabilities
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] User feedback addressed

## 📈 Workflow Optimization Tips

### Speed Improvements
```yaml
# Use npm ci instead of npm install
- run: npm ci

# Cache dependencies
- uses: actions/setup-node@v4
  with:
    cache: 'npm'

# Parallel job execution
needs: [test, security]  # Run in parallel
```

### Reliability Improvements
```yaml
# Retry failed steps
- uses: nick-invision/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    command: npm test
```

## 🚨 Alert Configuration

### Critical Alerts
Set up notifications for:
- Workflow failures on master branch
- Security vulnerabilities found
- Bundle size exceeding limits
- Test coverage dropping below threshold

### Monitoring Dashboard
Consider setting up:
- GitHub repository insights
- Dependabot alerts
- Performance trending charts
- User adoption metrics

## 📞 Support and Escalation

### When to Investigate
- Any test failures on master
- Bundle size increasing >10%
- Workflow taking >20 minutes
- Security vulnerabilities detected

### Resources
- GitHub Actions documentation
- VS Code extension development guide
- npm audit documentation
- Azure DevOps marketplace guide

This workflow review tool helps maintain high quality and reliability for the extension release process! 🚀
