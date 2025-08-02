# Visual Documentation Guidelines

## Asset Organization

```
assets/
├── images/           # Static screenshots and UI mockups
│   ├── status-bar-enabled.png      # Status bar with auto-preview enabled
│   ├── status-bar-disabled.png     # Status bar with auto-preview disabled
│   ├── settings-panel.png          # VS Code settings showing the configuration
│   ├── command-palette.png         # Command palette showing the toggle command
│   └── marketplace-banner.png      # Extension marketplace banner (1200x630)
├── gifs/            # Animated demonstrations
│   ├── toggle-demo.gif             # Full toggle workflow demonstration
│   ├── installation-demo.gif       # Installation from marketplace
│   ├── command-usage.gif           # Using via command palette
│   └── settings-change.gif         # Settings panel interaction
├── screenshots/     # Auto-generated test screenshots
│   ├── test-results/               # UI test screenshots
│   ├── cross-platform/             # Platform-specific screenshots
│   └── regression/                 # Visual regression test images
└── docs/assets/     # GitHub Pages optimized assets
    ├── hero-banner.png             # Main landing page banner
    ├── feature-showcase.png        # Feature comparison image
    └── compressed/                 # Optimized for web
```

## Image Specifications

### README Images
- **Screenshots**: PNG format, 1x and 2x retina versions
- **GIFs**: Optimized for GitHub (max 10MB, 60fps max)
- **Banners**: 1200x630px for social sharing

### GitHub Pages
- **Hero Banner**: 1200x400px optimized for web
- **Feature Images**: 800x450px responsive images
- **Thumbnails**: 300x200px for quick loading

### VS Code Marketplace
- **Icon**: 128x128px PNG with transparent background
- **Banner**: 1200x630px promotional banner
- **Gallery**: Up to 5 screenshots, 1920x1080px recommended

## Automated Screenshot Integration

Screenshots are automatically captured during:
- ✅ UI Tests (extension.test.ts)
- ✅ Visual Regression Tests
- ✅ Cross-platform CI/CD runs
- ✅ Performance benchmarks

## Usage in Documentation

```markdown
<!-- README.md -->
![Status Bar Demo](./assets/gifs/toggle-demo.gif)

<!-- GitHub Pages -->
<img src="./assets/images/status-bar-enabled.png" alt="Enabled State" style="max-width: 600px;">
```
