#!/usr/bin/env node

/**
 * 🚀 Agentic GitHub Workflow Monitor
 * 
 * This script provides automated monitoring and analysis of GitHub Actions workflows
 * for the VS Code Markdown Auto Preview Toggle extension.
 * 
 * Usage:
 *   node workflow-monitor.js [command] [options]
 * 
 * Commands:
 *   status     - Check current workflow status
 *   monitor    - Watch workflows in real-time  
 *   analyze    - Analyze workflow performance
 *   validate   - Validate release readiness
 */

const https = require('https');
const fs = require('fs');

class WorkflowMonitor {
  constructor() {
    this.owner = 'GSejas'; // Update with your GitHub username
    this.repo = 'vscode-review-md-toggle';
    this.token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    this.baseUrl = 'api.github.com';
  }

  /**
   * Make authenticated GitHub API request
   */
  async apiRequest(endpoint) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        path: endpoint,
        headers: {
          'User-Agent': 'Workflow-Monitor/1.0',
          'Accept': 'application/vnd.github.v3+json',
          ...(this.token && { 'Authorization': `token ${this.token}` })
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  /**
   * 📊 Get workflow runs for analysis
   */
  async getWorkflowRuns(limit = 10) {
    try {
      const endpoint = `/repos/${this.owner}/${this.repo}/actions/runs?per_page=${limit}`;
      return await this.apiRequest(endpoint);
    } catch (error) {
      console.error('❌ Failed to fetch workflow runs:', error.message);
      return null;
    }
  }

  /**
   * 🏷️ Get release information
   */
  async getReleases() {
    try {
      const endpoint = `/repos/${this.owner}/${this.repo}/releases`;
      return await this.apiRequest(endpoint);
    } catch (error) {
      console.error('❌ Failed to fetch releases:', error.message);
      return null;
    }
  }

  /**
   * 📈 Analyze workflow performance
   */
  analyzePerformance(runs) {
    if (!runs?.workflow_runs) return null;

    const analysis = {
      totalRuns: runs.workflow_runs.length,
      successRate: 0,
      averageDuration: 0,
      recentFailures: [],
      performanceMetrics: {}
    };

    const completedRuns = runs.workflow_runs.filter(run => 
      run.status === 'completed'
    );

    if (completedRuns.length === 0) return analysis;

    // Calculate success rate
    const successfulRuns = completedRuns.filter(run => 
      run.conclusion === 'success'
    );
    analysis.successRate = (successfulRuns.length / completedRuns.length) * 100;

    // Calculate average duration
    const durations = completedRuns
      .filter(run => run.created_at && run.updated_at)
      .map(run => {
        const start = new Date(run.created_at);
        const end = new Date(run.updated_at);
        return (end - start) / (1000 * 60); // minutes
      });

    if (durations.length > 0) {
      analysis.averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    }

    // Identify recent failures
    analysis.recentFailures = runs.workflow_runs
      .filter(run => run.conclusion === 'failure')
      .slice(0, 3)
      .map(run => ({
        id: run.id,
        created: run.created_at,
        event: run.event,
        head_branch: run.head_branch
      }));

    return analysis;
  }

  /**
   * 🎯 Validate release status for tag v0.0.1
   */
  async validateRelease() {
    console.log('🔍 Validating v0.0.1 release status...\n');

    const validation = {
      tagExists: false,
      workflowTriggered: false,
      testsCompleted: false,
      releaseCreated: false,
      assetsAttached: false,
      marketplaceReady: false
    };

    // Check releases
    const releases = await this.getReleases();
    if (releases?.length > 0) {
      const v001Release = releases.find(r => r.tag_name === 'v0.0.1');
      if (v001Release) {
        validation.tagExists = true;
        validation.releaseCreated = true;
        validation.assetsAttached = v001Release.assets?.length > 0;
        
        console.log('✅ Tag v0.0.1 exists');
        console.log('✅ GitHub release created');
        console.log(validation.assetsAttached ? '✅ Assets attached' : '⚠️  No assets found');
      }
    }

    // Check workflow runs
    const runs = await this.getWorkflowRuns();
    if (runs?.workflow_runs) {
      const tagRuns = runs.workflow_runs.filter(run => 
        run.event === 'push' && run.head_branch === 'v0.0.1'
      );

      if (tagRuns.length > 0) {
        validation.workflowTriggered = true;
        console.log('✅ Workflow triggered by tag');

        const latestTagRun = tagRuns[0];
        if (latestTagRun.status === 'completed') {
          validation.testsCompleted = true;
          console.log(`${latestTagRun.conclusion === 'success' ? '✅' : '❌'} Tests completed: ${latestTagRun.conclusion}`);
        } else {
          console.log('🔄 Workflow still running...');
        }
      }
    }

    // Check marketplace readiness
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    validation.marketplaceReady = !!(packageJson.publisher && packageJson.displayName);
    console.log(validation.marketplaceReady ? '✅ Marketplace metadata ready' : '⚠️  Missing marketplace metadata');

    return validation;
  }

  /**
   * 📋 Generate status report
   */
  async generateStatusReport() {
    console.log('🚀 VS Code Extension Workflow Status Report');
    console.log('============================================\n');

    const runs = await this.getWorkflowRuns();
    const releases = await this.getReleases();
    const analysis = this.analyzePerformance(runs);
    const validation = await this.validateRelease();

    // Recent workflow status
    if (runs?.workflow_runs && runs.workflow_runs.length > 0) {
      console.log('📊 Recent Workflow Runs:');
      runs.workflow_runs.slice(0, 5).forEach((run, index) => {
        const status = run.status === 'completed' 
          ? (run.conclusion === 'success' ? '✅' : '❌')
          : '🔄';
        const duration = run.created_at && run.updated_at 
          ? Math.round((new Date(run.updated_at) - new Date(run.created_at)) / (1000 * 60))
          : 'N/A';
        
        console.log(`  ${index + 1}. ${status} ${run.display_title} (${run.event}) - ${duration}min`);
      });
      console.log();
    }

    // Performance metrics
    if (analysis) {
      console.log('📈 Performance Metrics:');
      console.log(`  Success Rate: ${analysis.successRate.toFixed(1)}%`);
      console.log(`  Average Duration: ${analysis.averageDuration.toFixed(1)} minutes`);
      console.log(`  Total Runs: ${analysis.totalRuns}`);
      console.log();
    }

    // Release status
    if (releases?.length > 0) {
      console.log('🏷️  Recent Releases:');
      releases.slice(0, 3).forEach(release => {
        console.log(`  • ${release.tag_name}: ${release.name}`);
        console.log(`    Assets: ${release.assets?.length || 0}`);
      });
      console.log();
    }

    // Validation summary
    console.log('🎯 v0.0.1 Release Validation:');
    Object.entries(validation).forEach(([key, value]) => {
      const emoji = value ? '✅' : '❌';
      const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
      console.log(`  ${emoji} ${label}`);
    });

    console.log('\n🔗 Quick Links:');
    console.log(`  Repository: https://github.com/${this.owner}/${this.repo}`);
    console.log(`  Actions: https://github.com/${this.owner}/${this.repo}/actions`);
    console.log(`  Releases: https://github.com/${this.owner}/${this.repo}/releases`);
    
    return { runs, releases, analysis, validation };
  }

  /**
   * 🔄 Monitor workflows in real-time
   */
  async startMonitoring(intervalMinutes = 2) {
    console.log(`🔄 Starting workflow monitoring (checking every ${intervalMinutes} minutes)...`);
    console.log('Press Ctrl+C to stop\n');

    const monitor = async () => {
      try {
        await this.generateStatusReport();
        console.log(`\n⏰ Next check in ${intervalMinutes} minutes...\n`);
      } catch (error) {
        console.error('❌ Monitoring error:', error.message);
      }
    };

    // Initial check
    await monitor();

    // Set up interval
    setInterval(monitor, intervalMinutes * 60 * 1000);
  }
}

// CLI Interface
async function main() {
  const monitor = new WorkflowMonitor();
  const command = process.argv[2] || 'status';

  try {
    switch (command) {
      case 'status':
        await monitor.generateStatusReport();
        break;
      
      case 'monitor':
        const interval = parseInt(process.argv[3]) || 2;
        await monitor.startMonitoring(interval);
        break;
      
      case 'validate':
        await monitor.validateRelease();
        break;
      
      case 'analyze':
        const runs = await monitor.getWorkflowRuns(20);
        const analysis = monitor.analyzePerformance(runs);
        console.log('📊 Workflow Analysis:', JSON.stringify(analysis, null, 2));
        break;
      
      default:
        console.log('Usage: node workflow-monitor.js [status|monitor|validate|analyze]');
        console.log('  status   - Generate current status report');
        console.log('  monitor  - Watch workflows in real-time');
        console.log('  validate - Validate v0.0.1 release');
        console.log('  analyze  - Analyze workflow performance');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Handle authentication check
if (!process.env.GITHUB_TOKEN && !process.env.GH_TOKEN) {
  console.log('⚠️  GitHub token not found. Some features may be limited.');
  console.log('Set GITHUB_TOKEN or GH_TOKEN environment variable for full access.\n');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = WorkflowMonitor;
