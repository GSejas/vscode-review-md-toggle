#!/usr/bin/env node

/**
 * Screenshot Automation Script for VS Code Extension
 * 
 * This script helps generate screenshots and GIFs for documentation
 * Run with: node scripts/capture-screenshots.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ScreenshotAutomation {
    constructor() {
        this.assetsDir = path.join(__dirname, '..', 'assets');
        this.screenshotsDir = path.join(this.assetsDir, 'screenshots');
        this.imagesDir = path.join(this.assetsDir, 'images');
        this.gifsDir = path.join(this.assetsDir, 'gifs');
        
        this.ensureDirectories();
    }

    ensureDirectories() {
        [this.screenshotsDir, this.imagesDir, this.gifsDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Created directory: ${dir}`);
            }
        });
    }

    /**
     * Generate placeholder images for documentation
     */
    generatePlaceholders() {
        console.log('🎨 Generating placeholder images...');
        
        const placeholders = [
            {
                name: 'status-bar-enabled.png',
                width: 400,
                height: 50,
                text: '👁️ Auto-Preview Enabled',
                bgColor: '#0e639c',
                textColor: '#ffffff'
            },
            {
                name: 'status-bar-disabled.png',
                width: 400,
                height: 50,
                text: '👁️‍🗨️ Auto-Preview Disabled',
                bgColor: '#2d2d30',
                textColor: '#cccccc'
            },
            {
                name: 'command-palette.png',
                width: 600,
                height: 300,
                text: '> Toggle Markdown Auto Preview',
                bgColor: '#1e1e1e',
                textColor: '#cccccc'
            }
        ];

        placeholders.forEach(placeholder => {
            this.generateSVGPlaceholder(placeholder);
        });
    }

    generateSVGPlaceholder({ name, width, height, text, bgColor, textColor }) {
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="${width/2}" y="${height/2 + 5}" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${textColor}">${text}</text>
</svg>`;

        const svgPath = path.join(this.imagesDir, name.replace('.png', '.svg'));
        const pngPath = path.join(this.imagesDir, name);
        
        fs.writeFileSync(svgPath, svg);
        console.log(`✅ Generated SVG placeholder: ${svgPath}`);
        
        // Note: PNG conversion would require additional tools like Puppeteer or ImageMagick
        // For now, we create an info file
        const infoPath = path.join(this.imagesDir, name.replace('.png', '.info.txt'));
        fs.writeFileSync(infoPath, `Placeholder for: ${text}\nDimensions: ${width}x${height}\nColors: ${bgColor} / ${textColor}\n\nTo convert SVG to PNG, use:\nnpx svg2png-cli ${svgPath} --output ${pngPath}`);
    }

    /**
     * Generate animated GIF placeholders
     */
    generateGIFPlaceholders() {
        console.log('🎬 Generating GIF placeholders...');
        
        const gifPlaceholders = [
            'toggle-demo.gif',
            'installation-demo.gif',
            'command-usage.gif',
            'settings-change.gif'
        ];

        gifPlaceholders.forEach(gifName => {
            const infoPath = path.join(this.gifsDir, gifName.replace('.gif', '.info.txt'));
            const content = `GIF Placeholder: ${gifName}

Recommended specifications:
- Duration: 3-5 seconds
- Frame rate: 10-15 fps
- Resolution: 800x600 or 1920x1080
- File size: < 5MB for GitHub
- Format: Optimized GIF or WebP

To create this GIF:
1. Use screen recording software (OBS, ScreenToGif, etc.)
2. Record the extension functionality
3. Optimize with tools like gifski or online compressors
4. Replace this file with the actual GIF

Content should show:
- ${this.getGIFDescription(gifName)}
`;
            
            fs.writeFileSync(infoPath, content);
            console.log(`📝 Created GIF placeholder info: ${infoPath}`);
        });
    }

    getGIFDescription(gifName) {
        const descriptions = {
            'toggle-demo.gif': 'Status bar button clicking, icon changes, notification appears',
            'installation-demo.gif': 'VS Code marketplace installation process',
            'command-usage.gif': 'Command palette usage and execution',
            'settings-change.gif': 'Settings panel showing the configuration change'
        };
        return descriptions[gifName] || 'Extension functionality demonstration';
    }

    /**
     * Create README template for visual assets
     */
    generateAssetReadme() {
        const readmePath = path.join(this.assetsDir, 'VISUAL_ASSETS.md');
        const content = `# Visual Assets Guide

## 📸 Screenshots Required

### Status Bar States
- \`status-bar-enabled.png\` - Extension enabled state (green/highlighted)
- \`status-bar-disabled.png\` - Extension disabled state (default)

### VS Code Interface
- \`command-palette.png\` - Command palette showing toggle command
- \`settings-panel.png\` - Settings showing workbench.editorAssociations
- \`notification.png\` - Success notification after toggle

### Marketplace Assets
- \`marketplace-banner.png\` - 1200x630px promotional banner
- \`extension-icon.png\` - 128x128px extension icon

## 🎬 GIF Demonstrations

### Core Functionality
- \`toggle-demo.gif\` - Main feature demonstration (3-5 seconds)
- \`installation-demo.gif\` - Installation from marketplace
- \`command-usage.gif\` - Alternative command palette usage

### Advanced Features
- \`settings-change.gif\` - Configuration panel interaction
- \`markdown-preview.gif\` - Before/after markdown file opening

## 🛠️ Generation Tools

### Recommended Software
- **Screenshots**: Built-in snipping tools, Lightshot, or macOS Screenshot
- **Screen Recording**: OBS Studio, ScreenToGif (Windows), QuickTime (macOS)
- **GIF Optimization**: [gifski](https://gif.ski/), ezgif.com, or ImageOptim

### Automation
Run this script to generate placeholders:
\`\`\`bash
node scripts/capture-screenshots.js --generate-placeholders
\`\`\`

### CI/CD Integration
Screenshots are automatically captured during UI tests and uploaded as artifacts.

## 📝 Usage Guidelines

### In README.md
\`\`\`markdown
![Demo](./assets/gifs/toggle-demo.gif)
![Status Bar](./assets/images/status-bar-enabled.png)
\`\`\`

### In GitHub Pages
\`\`\`html
<img src="./assets/images/status-bar-enabled.png" alt="Enabled State">
\`\`\`

### Size Optimization
- Keep GIFs under 5MB for GitHub
- Use WebP format for modern browsers
- Provide fallback images for accessibility
`;

        fs.writeFileSync(readmePath, content);
        console.log(`📖 Generated visual assets guide: ${readmePath}`);
    }

    /**
     * Main execution
     */
    run() {
        console.log('🚀 Starting Screenshot Automation...\n');
        
        this.generatePlaceholders();
        this.generateGIFPlaceholders();
        this.generateAssetReadme();
        
        console.log('\n✨ Screenshot automation completed!');
        console.log('\n📋 Next Steps:');
        console.log('1. Replace SVG placeholders with actual PNG screenshots');
        console.log('2. Record and create the required GIF demonstrations');
        console.log('3. Run UI tests to generate automatic screenshots');
        console.log('4. Update documentation with actual visual assets');
        console.log('\n🔗 See assets/VISUAL_ASSETS.md for detailed guidelines');
    }
}

// Command line execution
if (require.main === module) {
    const automation = new ScreenshotAutomation();
    automation.run();
}

module.exports = { ScreenshotAutomation };
