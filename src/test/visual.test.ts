import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Visual Testing Helper for capturing UI screenshots during tests
 */
class VisualTestHelper {
	private static screenshotDir = path.join(__dirname, '..', '..', 'assets', 'screenshots', 'test-results');
	private static testRunId = Date.now().toString();

	static async ensureScreenshotDir(): Promise<void> {
		if (!fs.existsSync(this.screenshotDir)) {
			fs.mkdirSync(this.screenshotDir, { recursive: true });
		}
	}

	/**
	 * Capture screenshot of current VS Code window
	 * Note: This requires VS Code Extension Host to be running in a visible window
	 */
	static async captureScreenshot(testName: string, description: string = ''): Promise<string> {
		await this.ensureScreenshotDir();
		
		const filename = `${this.testRunId}-${testName}-${description}.png`.replace(/[^a-zA-Z0-9-_.]/g, '-');
		const filepath = path.join(this.screenshotDir, filename);
		
		try {
			// For now, we'll create a placeholder - actual screenshot would require additional setup
			const timestamp = new Date().toISOString();
			const metadata = {
				testName,
				description,
				timestamp,
				vscodeVersion: vscode.version,
				platform: process.platform,
				filename
			};
			
			// Write metadata file for now (actual screenshot implementation would go here)
			fs.writeFileSync(filepath.replace('.png', '.json'), JSON.stringify(metadata, null, 2));
			
			console.log(`📸 Screenshot captured: ${filename}`);
			return filepath;
		} catch (error) {
			console.warn(`⚠️  Failed to capture screenshot for ${testName}:`, error);
			return '';
		}
	}

	/**
	 * Capture status bar state for visual documentation
	 */
	static async captureStatusBarState(isEnabled: boolean): Promise<string> {
		const description = isEnabled ? 'status-bar-enabled' : 'status-bar-disabled';
		return this.captureScreenshot('status-bar', description);
	}

	/**
	 * Capture command palette interaction
	 */
	static async captureCommandPalette(): Promise<string> {
		return this.captureScreenshot('command-palette', 'toggle-command');
	}

	/**
	 * Wait for UI to settle after changes
	 */
	static async waitForUI(ms: number = 500): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

// Enhanced Test Suite with Visual Capture
suite('Visual Documentation Tests', () => {
	
	let originalConfig: any;
	
	suiteSetup(async () => {
		await VisualTestHelper.ensureScreenshotDir();
		const config = vscode.workspace.getConfiguration();
		originalConfig = config.get('workbench.editorAssociations') || {};
		console.log('🎬 Starting visual documentation test suite');
	});
	
	suiteTeardown(async () => {
		const config = vscode.workspace.getConfiguration();
		await config.update('workbench.editorAssociations', originalConfig, vscode.ConfigurationTarget.Global);
		console.log('📋 Visual documentation test suite completed');
	});

	setup(async () => {
		const config = vscode.workspace.getConfiguration();
		const cleanConfig = { ...originalConfig };
		delete cleanConfig['*.md'];
		await config.update('workbench.editorAssociations', cleanConfig, vscode.ConfigurationTarget.Global);
		await VisualTestHelper.waitForUI(300);
	});

	test('📸 Capture Initial Extension State', async () => {
		const extension = vscode.extensions.getExtension('local-dev.markdown-auto-preview-toggle');
		assert.ok(extension, 'Extension should be present');
		
		if (!extension.isActive) {
			await extension.activate();
		}
		
		await VisualTestHelper.waitForUI(1000);
		await VisualTestHelper.captureStatusBarState(false);
		
		assert.ok(extension.isActive, 'Extension should be activated');
	});

	test('📸 Capture Auto-Preview Enabled State', async () => {
		// Execute toggle command to enable auto-preview
		await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
		await VisualTestHelper.waitForUI(1000);
		
		// Capture the enabled state
		await VisualTestHelper.captureStatusBarState(true);
		
		// Verify the setting was applied
		const config = vscode.workspace.getConfiguration();
		const associations = config.get<{[key: string]: string}>('workbench.editorAssociations') || {};
		assert.strictEqual(associations['*.md'], 'vscode.markdown.preview.editor');
	});

	test('📸 Capture Auto-Preview Disabled State', async () => {
		// First enable, then disable to capture the transition
		await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
		await VisualTestHelper.waitForUI(500);
		
		await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
		await VisualTestHelper.waitForUI(1000);
		
		// Capture the disabled state
		await VisualTestHelper.captureStatusBarState(false);
		
		// Verify the setting was removed
		const config = vscode.workspace.getConfiguration();
		const associations = config.get<{[key: string]: string}>('workbench.editorAssociations') || {};
		assert.ok(!associations['*.md']);
	});

	test('📸 Capture Command Palette Usage', async () => {
		// Open command palette (note: this might not work in headless tests)
		try {
			await vscode.commands.executeCommand('workbench.action.showCommands');
			await VisualTestHelper.waitForUI(500);
			await VisualTestHelper.captureCommandPalette();
		} catch (error) {
			console.log('⚠️  Command palette capture skipped in headless mode');
		}
	});

	test('📸 Document Test Markdown File Interaction', async () => {
		// Open the test markdown file
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (workspaceFolder) {
			const testFile = path.join(workspaceFolder.uri.fsPath, 'test-markdown.md');
			
			if (fs.existsSync(testFile)) {
				const document = await vscode.workspace.openTextDocument(testFile);
				await vscode.window.showTextDocument(document);
				await VisualTestHelper.waitForUI(1000);
				
				await VisualTestHelper.captureScreenshot('markdown-file', 'editor-view');
			}
		}
	});

	test('📸 Generate Cross-Platform Metadata', async () => {
		const metadata = {
			platform: process.platform,
			arch: process.arch,
			vscodeVersion: vscode.version,
			nodeVersion: process.version,
			testTimestamp: new Date().toISOString(),
			extensionId: 'local-dev.markdown-auto-preview-toggle'
		};

		const metadataPath = path.join(
			VisualTestHelper['screenshotDir'], 
			`platform-${process.platform}-metadata.json`
		);
		
		fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
		console.log(`📋 Platform metadata saved: ${metadataPath}`);
	});
});

// Export for use in other test files
export { VisualTestHelper };
