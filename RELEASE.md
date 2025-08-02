# Release Guide

This guide covers the complete process for releasing new versions of the Markdown Auto Preview Toggle extension.

## 🚀 Release Process Overview

### Pre-Release Checklist
- [ ] All tests passing locally and in CI
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Manual testing completed
- [ ] Security audit passed

### Release Types

#### Patch Release (0.0.X)
- Bug fixes
- Performance improvements
- Documentation updates
- No breaking changes

#### Minor Release (0.X.0)
- New features
- New configuration options
- Backwards compatible changes
- Enhanced functionality

#### Major Release (X.0.0)
- Breaking changes
- Major architecture changes
- New VS Code version requirements
- Significant API changes

## 📋 Step-by-Step Release Process

### 1. Preparation Phase

#### Update Version Number
```bash
# For patch release
npm version patch

# For minor release
npm version minor

# For major release
npm version major
```

#### Update Documentation
1. **CHANGELOG.md**: Add new version section with:
   - Added features
   - Fixed bugs
   - Changed behavior
   - Deprecated features
   - Removed features
   - Security updates

2. **README.md**: Update if new features added

3. **package.json**: Ensure version matches

#### Run Full Test Suite
```bash
# Complete verification
npm run check-types
npm run lint
npm test
npm run package

# Manual testing in Extension Development Host
code --extensionDevelopmentPath .
```

### 2. Version Control

#### Create Release Branch
```bash
git checkout -b release/v1.0.0
git add .
git commit -m "Prepare v1.0.0 release"
git push origin release/v1.0.0
```

#### Create Pull Request
- Title: "Release v1.0.0"
- Description: Include changelog highlights
- Request review from maintainers

### 3. Create GitHub Release

#### Tag Creation
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

#### Release Creation
1. Go to GitHub → Releases → Create new release
2. Choose the tag: `v1.0.0`
3. Release title: `v1.0.0 - Feature Description`
4. Description: Copy from CHANGELOG.md
5. Check "Set as the latest release"
6. Publish release

### 4. Automated Publishing

The CI/CD pipeline will automatically:
- ✅ Run all tests
- ✅ Build production package
- ✅ Create VSIX file
- ✅ Attach VSIX to GitHub release
- ✅ Publish to VS Code Marketplace (if configured)

### 5. Post-Release Verification

#### Marketplace Check
1. Visit [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Search for "Markdown Auto Preview Toggle"
3. Verify new version is live
4. Test installation: `ext install local-dev.markdown-auto-preview-toggle`

#### Functionality Verification
1. Install from marketplace
2. Test core functionality
3. Verify status bar appears
4. Test toggle operation
5. Check settings changes

## 🏭 Marketplace Publishing

### Prerequisites
1. **Publisher Account**: Create at [Azure DevOps](https://dev.azure.com/)
2. **Personal Access Token**: Generate with "Marketplace (publish)" scope
3. **GitHub Secret**: Add token as `VSCE_PAT` in repository secrets

### Manual Publishing
```bash
# Install vsce globally
npm install -g vsce

# Login to marketplace
vsce login <publisher-name>

# Package extension
vsce package

# Publish to marketplace
vsce publish
```

### Marketplace Metadata
Update in `package.json`:
```json
{
  "publisher": "your-publisher-name",
  "displayName": "Markdown Auto Preview Toggle",
  "description": "Toggle auto-preview for markdown files with a status bar button",
  "categories": ["Other"],
  "keywords": ["markdown", "preview", "toggle", "status bar"],
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  },
  "icon": "icon.png"
}
```

## 📊 Release Monitoring

### Success Metrics
- **Download count**: Track marketplace statistics
- **User ratings**: Monitor feedback and reviews
- **Issue reports**: Watch GitHub issues for problems
- **Performance**: Check activation time and memory usage

### Post-Release Actions
1. **Monitor for 24-48 hours** after release
2. **Respond to user feedback** quickly
3. **Fix critical issues** with patch releases
4. **Update documentation** based on user questions
5. **Plan next release** based on feedback

## 🚨 Hotfix Process

For critical bugs requiring immediate fixes:

### 1. Create Hotfix Branch
```bash
git checkout main
git pull origin main
git checkout -b hotfix/v1.0.1
```

### 2. Apply Fix
- Make minimal changes to fix the issue
- Add regression test
- Update version to patch increment

### 3. Fast-Track Release
```bash
npm version patch
git add .
git commit -m "Hotfix v1.0.1: Fix critical issue"
git push origin hotfix/v1.0.1
```

### 4. Create Immediate Release
- Create PR to main
- Merge after review
- Create tag and release immediately
- Monitor deployment

## 📱 GitHub Pages Setup

### Documentation Site
Create `docs/` folder with:
- **index.html**: Landing page
- **installation.md**: Installation guide  
- **usage.md**: Usage examples
- **changelog.md**: Version history
- **contributing.md**: Contribution guide

### Enable GitHub Pages
1. Repository Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: /docs
4. Custom domain (optional)

### Update on Release
```bash
# Copy latest documentation
cp README.md docs/
cp CHANGELOG.md docs/
cp CONTRIBUTING.md docs/

# Commit and push
git add docs/
git commit -m "Update documentation site"
git push origin main
```

## 🔒 Security Considerations

### Before Release
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Check dependencies for security advisories
- [ ] Verify no secrets in code
- [ ] Review permissions in package.json

### Marketplace Security
- [ ] Use dedicated marketplace publisher account
- [ ] Rotate access tokens regularly
- [ ] Monitor for unauthorized changes
- [ ] Keep publisher profile updated

## 📞 Communication Plan

### Release Announcements
1. **GitHub Release Notes**: Detailed changelog
2. **README Updates**: Feature highlights
3. **Social Media**: Brief feature announcement
4. **Community Forums**: Detailed discussion

### User Communication
- **Breaking Changes**: Prominent documentation
- **Migration Guides**: Step-by-step instructions
- **Support Channels**: Clear contact information
- **Feedback Collection**: Request user input

---

This release guide should be followed for all versions to ensure consistent, reliable releases. Update this guide as the process evolves and new requirements emerge.
