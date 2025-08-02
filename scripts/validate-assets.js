#!/usr/bin/env node

/**
 * Asset Validation Script
 * Validates that all required visual assets are present and properly formatted
 */

const fs = require('fs');
const path = require('path');

class AssetValidator {
    constructor() {
        this.assetsDir = path.join(__dirname, '..', 'assets');
        this.errors = [];
        this.warnings = [];
        this.success = [];
    }

    /**
     * Required assets for documentation
     */
    getRequiredAssets() {
        return {
            images: [
                'status-bar-enabled.png',
                'status-bar-disabled.png',
                'command-palette.png',
                'settings-panel.png'
            ],
            gifs: [
                'toggle-demo.gif',
                'installation-demo.gif'
            ],
            docs: [
                'hero-demo.gif',
                'marketplace-banner.png'
            ]
        };
    }

    /**
     * Check if file exists and get its stats
     */
    checkFile(filePath, category, fileName) {
        const fullPath = path.join(this.assetsDir, category, fileName);
        const infoPath = fullPath.replace(path.extname(fileName), '.info.txt');
        
        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);
            this.success.push(`✅ ${category}/${fileName} (${this.formatFileSize(stats.size)})`);
            
            // Additional validations based on file type
            if (fileName.endsWith('.gif') && stats.size > 5 * 1024 * 1024) {
                this.warnings.push(`⚠️  ${category}/${fileName} is larger than 5MB (${this.formatFileSize(stats.size)})`);
            }
            
            return true;
        } else if (fs.existsSync(infoPath)) {
            this.warnings.push(`📝 ${category}/${fileName} has placeholder info file`);
            return false;
        } else {
            this.errors.push(`❌ Missing: ${category}/${fileName}`);
            return false;
        }
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Check README.md for image references
     */
    checkREADMEReferences() {
        const readmePath = path.join(__dirname, '..', 'README.md');
        
        if (!fs.existsSync(readmePath)) {
            this.errors.push('❌ README.md not found');
            return;
        }

        const content = fs.readFileSync(readmePath, 'utf8');
        const imageRefs = content.match(/!\[.*?\]\(\.\/assets\/.*?\)/g) || [];
        
        if (imageRefs.length === 0) {
            this.warnings.push('⚠️  No asset references found in README.md');
        } else {
            this.success.push(`✅ Found ${imageRefs.length} asset references in README.md`);
            
            // Check if referenced files exist
            imageRefs.forEach(ref => {
                const match = ref.match(/!\[.*?\]\(\.\/assets\/(.*?)\)/);
                if (match) {
                    const assetPath = path.join(this.assetsDir, match[1]);
                    if (!fs.existsSync(assetPath)) {
                        this.errors.push(`❌ README references missing file: assets/${match[1]}`);
                    }
                }
            });
        }
    }

    /**
     * Check GitHub Pages assets
     */
    checkGitHubPagesAssets() {
        const docsDir = path.join(__dirname, '..', 'docs');
        const indexPath = path.join(docsDir, 'index.html');
        
        if (!fs.existsSync(indexPath)) {
            this.warnings.push('⚠️  GitHub Pages index.html not found');
            return;
        }

        const content = fs.readFileSync(indexPath, 'utf8');
        const assetRefs = content.match(/src=["\']\.\/assets\/.*?["\']/g) || [];
        
        if (assetRefs.length > 0) {
            this.success.push(`✅ Found ${assetRefs.length} asset references in GitHub Pages`);
        }
    }

    /**
     * Generate asset creation guide
     */
    generateCreationGuide() {
        const missing = this.errors.filter(error => error.includes('Missing:'));
        
        if (missing.length === 0) {
            return;
        }

        console.log('\n📋 Asset Creation Guide:');
        console.log('================================');
        
        missing.forEach(error => {
            const fileName = error.split(': ')[1];
            const [category, name] = fileName.split('/');
            
            console.log(`\n📸 ${name}:`);
            if (name.endsWith('.png')) {
                console.log(`   • Take a screenshot of: ${this.getScreenshotDescription(name)}`);
                console.log(`   • Recommended size: ${this.getRecommendedSize(name)}`);
                console.log(`   • Save as: assets/${fileName}`);
            } else if (name.endsWith('.gif')) {
                console.log(`   • Record screen activity: ${this.getGIFDescription(name)}`);
                console.log(`   • Duration: 3-5 seconds`);
                console.log(`   • Optimize to < 5MB`);
                console.log(`   • Save as: assets/${fileName}`);
            }
        });
    }

    getScreenshotDescription(fileName) {
        const descriptions = {
            'status-bar-enabled.png': 'VS Code status bar with extension enabled (highlighted eye icon)',
            'status-bar-disabled.png': 'VS Code status bar with extension disabled (normal eye icon)',
            'command-palette.png': 'Command palette showing "Toggle Markdown Auto Preview" command',
            'settings-panel.png': 'VS Code settings showing workbench.editorAssociations configuration'
        };
        return descriptions[fileName] || 'Extension interface element';
    }

    getRecommendedSize(fileName) {
        const sizes = {
            'status-bar-enabled.png': '400x50px',
            'status-bar-disabled.png': '400x50px',
            'command-palette.png': '600x300px',
            'settings-panel.png': '800x400px',
            'marketplace-banner.png': '1200x630px'
        };
        return sizes[fileName] || '800x600px';
    }

    getGIFDescription(fileName) {
        const descriptions = {
            'toggle-demo.gif': 'Clicking status bar button, showing icon change and notification',
            'installation-demo.gif': 'Installing extension from VS Code marketplace',
            'command-usage.gif': 'Using command palette to toggle functionality'
        };
        return descriptions[fileName] || 'Extension functionality demonstration';
    }

    /**
     * Run validation
     */
    validate() {
        console.log('🔍 Validating Visual Assets...\n');
        
        const required = this.getRequiredAssets();
        
        // Check each category
        Object.entries(required).forEach(([category, files]) => {
            files.forEach(fileName => {
                this.checkFile(null, category, fileName);
            });
        });

        // Check documentation references
        this.checkREADMEReferences();
        this.checkGitHubPagesAssets();

        // Report results
        this.reportResults();
        this.generateCreationGuide();

        return this.errors.length === 0;
    }

    /**
     * Report validation results
     */
    reportResults() {
        console.log('\n📊 Validation Results:');
        console.log('======================');

        if (this.success.length > 0) {
            console.log('\n✅ Found Assets:');
            this.success.forEach(msg => console.log(`   ${msg}`));
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            this.warnings.forEach(msg => console.log(`   ${msg}`));
        }

        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(msg => console.log(`   ${msg}`));
        }

        console.log(`\n📈 Summary: ${this.success.length} found, ${this.warnings.length} warnings, ${this.errors.length} errors`);

        if (this.errors.length === 0) {
            console.log('\n🎉 All required assets are present!');
        } else {
            console.log('\n🔧 Some assets need attention. See creation guide above.');
        }
    }
}

// Command line execution
if (require.main === module) {
    const validator = new AssetValidator();
    const isValid = validator.validate();
    process.exit(isValid ? 0 : 1);
}

module.exports = { AssetValidator };
