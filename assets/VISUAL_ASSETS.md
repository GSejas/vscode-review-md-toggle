# Visual Assets Guide

## 📸 Screenshots Required

### Status Bar States
- `status-bar-enabled.png` - Extension enabled state (green/highlighted)
- `status-bar-disabled.png` - Extension disabled state (default)

### VS Code Interface
- `command-palette.png` - Command palette showing toggle command
- `settings-panel.png` - Settings showing workbench.editorAssociations
- `notification.png` - Success notification after toggle

### Marketplace Assets
- `marketplace-banner.png` - 1200x630px promotional banner
- `extension-icon.png` - 128x128px extension icon

## 🎬 GIF Demonstrations

### Core Functionality
- `toggle-demo.gif` - Main feature demonstration (3-5 seconds)
- `installation-demo.gif` - Installation from marketplace
- `command-usage.gif` - Alternative command palette usage

### Advanced Features
- `settings-change.gif` - Configuration panel interaction
- `markdown-preview.gif` - Before/after markdown file opening

## 🛠️ Generation Tools

### Recommended Software
- **Screenshots**: Built-in snipping tools, Lightshot, or macOS Screenshot
- **Screen Recording**: OBS Studio, ScreenToGif (Windows), QuickTime (macOS)
- **GIF Optimization**: [gifski](https://gif.ski/), ezgif.com, or ImageOptim

### Automation
Run this script to generate placeholders:
```bash
node scripts/capture-screenshots.js --generate-placeholders
```

### CI/CD Integration
Screenshots are automatically captured during UI tests and uploaded as artifacts.

## 📝 Usage Guidelines

### In README.md
```markdown
![Demo](./assets/gifs/toggle-demo.gif)
![Status Bar](./assets/images/status-bar-enabled.png)
```

### In GitHub Pages
```html
<img src="./assets/images/status-bar-enabled.png" alt="Enabled State">
```

### Size Optimization
- Keep GIFs under 5MB for GitHub
- Use WebP format for modern browsers
- Provide fallback images for accessibility
