#!/usr/bin/env node

/**
 * 🔍 GitHub Actions Log Analyzer
 * 
 * This script helps analyze and diagnose GitHub Actions workflow failures
 * by checking common issues and providing actionable insights.
 */

const fs = require('fs');
const path = require('path');

class GitHubActionsAnalyzer {
  constructor() {
    this.workspaceRoot = process.cwd();
    this.issues = [];
    this.recommendations = [];
  }

  /**
   * 📊 Analyze CI/CD configuration and local environment
   */
  async analyzeWorkflow() {
    console.log('🔍 GitHub Actions CI/CD Pipeline Analysis');
    console.log('=========================================\n');

    // Check package.json scripts
    this.checkPackageScripts();
    
    // Check workflow configuration
    this.checkWorkflowConfig();
    
    // Check dependencies
    this.checkDependencies();
    
    // Test local commands
    await this.testLocalCommands();
    
    // Check file structure
    this.checkFileStructure();
    
    // Generate report
    this.generateReport();
  }

  /**
   * 📦 Check package.json scripts used in CI
   */
  checkPackageScripts() {
    console.log('📦 Checking package.json scripts...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredScripts = ['lint', 'check-types', 'test', 'package'];
      const presentScripts = Object.keys(packageJson.scripts || {});
      
      console.log('   Present scripts:', presentScripts.join(', '));
      
      const missingScripts = requiredScripts.filter(script => !presentScripts.includes(script));
      
      if (missingScripts.length > 0) {
        this.issues.push(`❌ Missing required scripts: ${missingScripts.join(', ')}`);
        this.recommendations.push(`Add missing scripts to package.json: ${missingScripts.join(', ')}`);
      } else {
        console.log('   ✅ All required scripts present\n');
      }
      
      // Check for common script issues
      if (packageJson.scripts.test && packageJson.scripts.test.includes('vscode-test')) {
        console.log('   ✅ Using vscode-test framework');
      }
      
    } catch (error) {
      this.issues.push('❌ Failed to read package.json');
    }
  }

  /**
   * ⚙️ Check workflow configuration
   */
  checkWorkflowConfig() {
    console.log('⚙️ Checking workflow configuration...');
    
    const workflowPath = '.github/workflows/ci.yml';
    if (!fs.existsSync(workflowPath)) {
      this.issues.push('❌ CI workflow file not found');
      return;
    }
    
    try {
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');
      
      // Check for common issues
      const checks = [
        { pattern: /npm ci/, name: 'npm ci usage', required: true },
        { pattern: /npm run lint/, name: 'lint step', required: true },
        { pattern: /npm run check-types/, name: 'type checking', required: true },
        { pattern: /npm test/, name: 'test execution', required: true },
        { pattern: /ubuntu-latest/, name: 'Ubuntu runner', required: false },
        { pattern: /windows-latest/, name: 'Windows runner', required: false },
        { pattern: /macos-latest/, name: 'macOS runner', required: false },
        { pattern: /node-version.*18\.x/, name: 'Node 18.x support', required: false },
        { pattern: /node-version.*20\.x/, name: 'Node 20.x support', required: false }
      ];
      
      checks.forEach(check => {
        if (check.pattern.test(workflowContent)) {
          console.log(`   ✅ ${check.name} configured`);
        } else if (check.required) {
          this.issues.push(`❌ Missing required step: ${check.name}`);
        } else {
          console.log(`   ⚠️  Optional: ${check.name} not configured`);
        }
      });
      
      console.log('');
      
    } catch (error) {
      this.issues.push('❌ Failed to read workflow configuration');
    }
  }

  /**
   * 📋 Check dependencies and versions
   */
  checkDependencies() {
    console.log('📋 Checking dependencies...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check VS Code engine version
      if (packageJson.engines?.vscode) {
        console.log(`   ✅ VS Code engine: ${packageJson.engines.vscode}`);
      } else {
        this.issues.push('❌ Missing VS Code engine specification');
      }
      
      // Check devDependencies for common testing tools
      const devDeps = packageJson.devDependencies || {};
      const testingDeps = ['@vscode/test-cli', '@vscode/test-electron', 'mocha', 'typescript', 'eslint'];
      
      testingDeps.forEach(dep => {
        if (devDeps[dep]) {
          console.log(`   ✅ ${dep}: ${devDeps[dep]}`);
        } else {
          console.log(`   ⚠️  ${dep}: not found`);
        }
      });
      
      console.log('');
      
    } catch (error) {
      this.issues.push('❌ Failed to analyze dependencies');
    }
  }

  /**
   * 🧪 Test local commands
   */
  async testLocalCommands() {
    console.log('🧪 Testing local commands...');
    
    const { spawn } = require('child_process');
    
    const testCommand = (command, args = []) => {
      return new Promise((resolve) => {
        const process = spawn(command, args, { 
          stdio: 'pipe',
          shell: true,
          cwd: this.workspaceRoot
        });
        
        let stdout = '';
        let stderr = '';
        
        process.stdout?.on('data', (data) => stdout += data.toString());
        process.stderr?.on('data', (data) => stderr += data.toString());
        
        process.on('close', (code) => {
          resolve({ code, stdout, stderr });
        });
        
        // Timeout after 30 seconds
        setTimeout(() => {
          process.kill();
          resolve({ code: -1, stdout, stderr: 'Timeout' });
        }, 30000);
      });
    };
    
    const commands = [
      ['npm', ['run', 'lint']],
      ['npm', ['run', 'check-types']],
      ['npm', ['run', 'package']]
    ];
    
    for (const [cmd, args] of commands) {
      const result = await testCommand(cmd, args);
      const commandStr = `${cmd} ${args.join(' ')}`;
      
      if (result.code === 0) {
        console.log(`   ✅ ${commandStr} - Success`);
      } else {
        console.log(`   ❌ ${commandStr} - Failed (code: ${result.code})`);
        if (result.stderr) {
          console.log(`      Error: ${result.stderr.slice(0, 200)}...`);
        }
        this.issues.push(`Local command failed: ${commandStr}`);
      }
    }
    
    console.log('');
  }

  /**
   * 📁 Check file structure
   */
  checkFileStructure() {
    console.log('📁 Checking file structure...');
    
    const requiredFiles = [
      'package.json',
      'tsconfig.json',
      'src/extension.ts',
      '.github/workflows/ci.yml',
      'esbuild.js'
    ];
    
    const optionalFiles = [
      'src/test/extension.test.ts',
      'eslint.config.mjs',
      '.gitignore',
      'README.md'
    ];
    
    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ❌ ${file} - MISSING`);
        this.issues.push(`Required file missing: ${file}`);
      }
    });
    
    optionalFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ⚠️  ${file} - optional`);
      }
    });
    
    console.log('');
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    console.log('📊 Analysis Report');
    console.log('==================\n');
    
    if (this.issues.length === 0) {
      console.log('🎉 No issues detected! Your CI/CD pipeline should work correctly.');
      console.log('\nPossible reasons for GitHub Actions failures:');
      console.log('1. Network timeouts during dependency installation');
      console.log('2. VS Code test environment setup issues in CI');
      console.log('3. Platform-specific failures (Windows/macOS/Linux differences)');
      console.log('4. GitHub Actions runner resource limitations');
      console.log('5. Timing issues with VS Code Extension Development Host');
      
    } else {
      console.log('❌ Issues detected:');
      this.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
    }
    
    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }
    
    console.log('\n🔗 Useful debugging commands:');
    console.log('   npm run lint              # Test linting locally');
    console.log('   npm run check-types       # Test TypeScript compilation');
    console.log('   npm test                  # Run test suite locally');
    console.log('   npm run package           # Test extension packaging');
    console.log('   npm audit                 # Check for vulnerabilities');
    
    console.log('\n🌐 GitHub Actions debugging:');
    console.log('   1. Check Actions tab: https://github.com/GSejas/vscode-review-md-toggle/actions');
    console.log('   2. Look for specific job failures in the matrix');
    console.log('   3. Check VS Code test setup steps');
    console.log('   4. Review dependency installation logs');
    console.log('   5. Compare successful vs failed job configurations');
    
    console.log('\n⚡ Quick fixes for common CI issues:');
    console.log('   • Add display configuration for Linux: DISPLAY=:99.0');
    console.log('   • Increase timeout for VS Code download');
    console.log('   • Use npm ci instead of npm install');
    console.log('   • Cache node_modules between jobs');
    console.log('   • Run tests with --headless flag if available');
  }
}

// CLI Interface
async function main() {
  const analyzer = new GitHubActionsAnalyzer();
  await analyzer.analyzeWorkflow();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = GitHubActionsAnalyzer;
