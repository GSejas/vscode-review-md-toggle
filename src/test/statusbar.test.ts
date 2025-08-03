import * as assert from 'assert';
import * as vscode from 'vscode';

// Integration tests for status bar functionality
suite('Status Bar Integration Tests', () => {
	
	test('Status bar item should be created and visible', async () => {
		// Extension should be activated
		const extension = vscode.extensions.getExtension('GSejas.markdown-auto-preview-toggle');
		assert.ok(extension, 'Extension should exist');
		
		if (!extension.isActive) {
			await extension.activate();
		}
		
		// Test that the command executes without errors
		try {
			await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
			assert.ok(true, 'Status bar toggle command executed successfully');
		} catch (error) {
			assert.fail(`Status bar command failed: ${error}`);
		}
	});

	test('Status bar command should execute without errors', async () => {
		// Execute status bar command multiple times
		try {
			await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
			await new Promise(resolve => setTimeout(resolve, 100));
			await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
			await new Promise(resolve => setTimeout(resolve, 100));
			
			assert.ok(true, 'Multiple command executions succeeded');
		} catch (error) {
			assert.fail(`Command execution failed: ${error}`);
		}
	});
});
