# 🌐 GitHub Pages Setup & Maintenance Guide

This document provides comprehensive instructions for setting up and maintaining the GitHub Pages site for the Markdown Auto Preview Toggle VS Code extension.

## 📋 Table of Contents

1. [Initial Setup](#-initial-setup)
2. [Configuration](#-configuration)
3. [Deployment](#-deployment)
4. [Maintenance](#-maintenance)
5. [Customization](#-customization)
6. [Troubleshooting](#-troubleshooting)
7. [Advanced Features](#-advanced-features)

## 🚀 Initial Setup

### Prerequisites
- GitHub repository with appropriate permissions
- Basic understanding of HTML, CSS, and JavaScript
- Access to repository settings

### Step 1: Enable GitHub Pages

1. **Navigate to Repository Settings**
   ```
   Repository → Settings → Pages (in left sidebar)
   ```

2. **Configure Source**
   - **Source**: Deploy from a branch
   - **Branch**: `master` or `main`
   - **Folder**: `/ (root)` or `/docs`
   - Click **Save**

3. **Verify Setup**
   - GitHub will provide a URL like: `https://[username].github.io/[repository-name]/`
   - Initial deployment may take 5-10 minutes

### Step 2: Configure Workflow Permissions

1. **Go to Actions Settings**
   ```
   Repository → Settings → Actions → General
   ```

2. **Set Workflow Permissions**
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click **Save**

3. **Enable Pages Deployment**
   ```
   Repository → Settings → Pages → Source
   ```
   - Change source to "GitHub Actions"
   - Click **Save**

## ⚙️ Configuration

### Environment Setup

The GitHub Pages site is configured with:

- **Source Directory**: `/docs`
- **Domain**: `https://gsejas.github.io/vscode-review-md-toggle/`
- **Build Tool**: GitHub Actions
- **Deployment**: Automated on push to master

### File Structure
```
docs/
├── index.html          # Main landing page
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── sitemap.xml         # SEO sitemap (auto-generated)
├── robots.txt          # Search engine directives
├── favicon.ico         # Site icon (placeholder)
└── build-info.js       # Build metadata (auto-generated)
```

### Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**
   ```bash
   echo "yourdomain.com" > docs/CNAME
   ```

2. **Configure DNS**
   - Add CNAME record pointing to `[username].github.io`
   - Or add A records for GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update Settings**
   - Go to Repository Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## 🚀 Deployment

### Automatic Deployment

The site deploys automatically when:

1. **Code Changes**: Push to `master` branch with changes in `/docs`
2. **New Releases**: When a GitHub release is published
3. **Manual Trigger**: Via GitHub Actions workflow dispatch

### Manual Deployment

```bash
# 1. Make your changes to docs/ files
git add docs/
git commit -m "docs: update GitHub Pages content"
git push origin master

# 2. Monitor deployment
# Visit: Repository → Actions → Deploy GitHub Pages
```

### Deployment Status

Check deployment status:
- **GitHub Actions**: Repository → Actions
- **Pages Settings**: Repository → Settings → Pages
- **Live Site**: Visit your GitHub Pages URL

## 🔧 Maintenance

### Regular Tasks

#### 1. Content Updates (Weekly)
- [ ] Review and update feature descriptions
- [ ] Add new screenshots or demos
- [ ] Update installation instructions
- [ ] Check all external links

#### 2. Release Updates (Per Release)
- [ ] Verify new releases appear automatically
- [ ] Update version numbers in content
- [ ] Add release highlights to homepage
- [ ] Update download links

#### 3. Performance Monitoring (Monthly)
- [ ] Check page load speeds
- [ ] Verify mobile responsiveness
- [ ] Test all interactive features
- [ ] Review and update SEO metadata

#### 4. Dependencies Review (Quarterly)
- [ ] Review GitHub API usage
- [ ] Update CSS framework (if any)
- [ ] Check browser compatibility
- [ ] Update security headers

### Content Management

#### Adding New Sections
1. **Update HTML Structure**
   ```html
   <section id="new-section" class="new-section">
       <div class="container">
           <h2>New Section Title</h2>
           <!-- Your content here -->
       </div>
   </section>
   ```

2. **Add Navigation Link**
   ```html
   <li><a href="#new-section">New Section</a></li>
   ```

3. **Style the Section**
   ```css
   .new-section {
       padding: 4rem 0;
       /* Add your styles */
   }
   ```

#### Updating Release Information
The releases are automatically fetched from GitHub API. To customize:

1. **Modify JavaScript**
   ```javascript
   // In script.js, update the loadGitHubReleases function
   async function loadGitHubReleases() {
       // Customize release display logic
   }
   ```

2. **Style Release Cards**
   ```css
   /* Update .release-card styles in styles.css */
   ```

## 🎨 Customization

### Theming

#### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #007acc;      /* VS Code blue */
    --secondary-color: #0e639c;    /* Darker blue */
    --accent-color: #ff6b35;       /* Orange accent */
    /* Add your custom colors */
}
```

#### Typography
```css
:root {
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    /* Add custom fonts */
}
```

### Adding Features

#### Analytics Integration
1. **Google Analytics**
   ```html
   <!-- Add to <head> in index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Update JavaScript**
   ```javascript
   // In script.js, replace placeholder analytics
   function initAnalytics() {
       gtag('event', 'page_view', {
           page_title: 'Markdown Auto Preview Toggle',
           page_location: window.location.href
       });
   }
   ```

#### Social Media Integration
```html
<!-- Add social sharing buttons -->
<div class="social-share">
    <a href="https://twitter.com/intent/tweet?text=Check out this VS Code extension!&url=https://gsejas.github.io/vscode-review-md-toggle/" target="_blank">
        🐦 Share on Twitter
    </a>
</div>
```

### Performance Optimization

#### Image Optimization
```bash
# Add to workflow for image compression
- name: Optimize images
  run: |
    # Install image optimization tools
    npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg
    
    # Optimize images
    imagemin docs/images/* --out-dir=docs/images --plugin=pngquant --plugin=mozjpeg
```

#### Caching Strategy
```html
<!-- Add service worker for caching -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
</script>
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Site Not Loading
**Symptoms**: 404 error or blank page
**Solutions**:
- Check GitHub Pages settings (Settings → Pages)
- Verify source branch and folder are correct
- Ensure `index.html` exists in the correct location
- Check for syntax errors in HTML

#### 2. Styles Not Applying
**Symptoms**: Unstyled or broken layout
**Solutions**:
- Verify CSS file path in HTML
- Check for CSS syntax errors
- Clear browser cache
- Use browser dev tools to debug

#### 3. JavaScript Not Working
**Symptoms**: Interactive features broken
**Solutions**:
- Check browser console for errors
- Verify JavaScript file path
- Test with different browsers
- Check for API rate limits (GitHub releases)

#### 4. Releases Not Loading
**Symptoms**: "Loading releases..." never completes
**Solutions**:
- Check GitHub API rate limits
- Verify repository name in JavaScript
- Test API endpoint manually
- Check network connectivity

### Debug Commands

```bash
# Test local development
cd docs/
python -m http.server 8000
# Visit: http://localhost:8000

# Validate HTML
npx html-validate docs/index.html

# Check links
npx broken-link-checker https://gsejas.github.io/vscode-review-md-toggle/

# Performance audit
npx lighthouse https://gsejas.github.io/vscode-review-md-toggle/
```

### Monitoring

#### Site Health Checks
```yaml
# Add to GitHub Actions for monitoring
- name: Site health check
  run: |
    curl -f https://gsejas.github.io/vscode-review-md-toggle/ || exit 1
    
- name: Performance check
  run: |
    npx lighthouse https://gsejas.github.io/vscode-review-md-toggle/ --output json --quiet
```

#### Error Logging
```javascript
// Add to script.js for error tracking
window.addEventListener('error', (e) => {
    console.error('Page error:', e.error);
    // Send to error tracking service if configured
});
```

## 🚀 Advanced Features

### SEO Optimization

#### Meta Tags
```html
<!-- Enhanced SEO in <head> -->
<meta name="description" content="A simple VS Code extension that provides a status bar button to toggle auto-preview mode for markdown files.">
<meta name="keywords" content="vscode, extension, markdown, preview, toggle, status bar">
<meta name="author" content="GSejas">

<!-- Open Graph -->
<meta property="og:title" content="Markdown Auto Preview Toggle - VS Code Extension">
<meta property="og:description" content="Toggle markdown auto-preview with a simple status bar button">
<meta property="og:image" content="https://gsejas.github.io/vscode-review-md-toggle/og-image.png">
<meta property="og:url" content="https://gsejas.github.io/vscode-review-md-toggle/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Markdown Auto Preview Toggle">
<meta name="twitter:description" content="VS Code extension for toggling markdown auto-preview">
```

#### Structured Data
```html
<!-- JSON-LD for rich snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Markdown Auto Preview Toggle",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "url": "https://gsejas.github.io/vscode-review-md-toggle/",
  "downloadUrl": "https://marketplace.visualstudio.com/items?itemName=local-dev.markdown-auto-preview-toggle"
}
</script>
```

### Progressive Web App

#### Manifest
```json
<!-- docs/manifest.json -->
{
  "name": "Markdown Auto Preview Toggle",
  "short_name": "MD Toggle",
  "description": "VS Code extension for markdown preview toggle",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007acc",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Integration with CI/CD

#### Automated Screenshots
```yaml
# Add to workflow for automated screenshots
- name: Generate screenshots
  run: |
    npm install -g puppeteer
    node scripts/generate-screenshots.js
```

#### Automated Testing
```yaml
# Add end-to-end testing
- name: E2E tests
  run: |
    npx playwright test docs/tests/
```

## 📊 Analytics & Metrics

### Key Metrics to Track
- Page views and unique visitors
- Time spent on page
- Download/installation clicks
- Release page visits
- Error rates and performance

### Setup Instructions
1. **Google Analytics**: Add tracking ID to `script.js`
2. **GitHub Insights**: Monitor repository traffic
3. **Performance**: Use Lighthouse CI for automated audits

## 🤝 Contributing to Documentation

### Making Changes
1. Fork the repository
2. Make changes to files in `/docs`
3. Test locally with `python -m http.server`
4. Submit pull request

### Style Guidelines
- Use semantic HTML
- Follow CSS naming conventions
- Optimize for mobile-first design
- Maintain accessibility standards

---

## 📞 Support

If you encounter issues with the GitHub Pages setup:

1. **Check the deployment logs**: Repository → Actions
2. **Review the troubleshooting section** above
3. **Create an issue**: [GitHub Issues](https://github.com/GSejas/vscode-review-md-toggle/issues)
4. **Contact maintainers**: See CONTRIBUTING.md

---

*Last updated: August 2025*
*Site URL: https://gsejas.github.io/vscode-review-md-toggle/*
