// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Markdown Auto Preview Toggle extension is now active!');

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'markdown-auto-preview-toggle.toggle';
	statusBarItem.name = 'Markdown Auto Preview Toggle';
	statusBarItem.tooltip = 'Toggle Markdown Auto Preview';
	
	// Update the status bar item text based on current setting
	updateStatusBarItem();
	
	// Show the status bar item
	statusBarItem.show();

	// Register the toggle command
	const disposable = vscode.commands.registerCommand('markdown-auto-preview-toggle.toggle', () => {
		toggleMarkdownAutoPreview();
	});

	// Listen for configuration changes to update the status bar
	const configChangeDisposable = vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('workbench.editorAssociations')) {
			updateStatusBarItem();
		}
	});

	context.subscriptions.push(disposable, statusBarItem, configChangeDisposable);
}

function toggleMarkdownAutoPreview() {
	const config = vscode.workspace.getConfiguration();
	const currentAssociations = config.get<{[key: string]: string}>('workbench.editorAssociations') || {};
	
	// Create a clean copy to avoid proxy issues
	const editorAssociations: {[key: string]: string} = {};
	Object.keys(currentAssociations).forEach(key => {
		editorAssociations[key] = currentAssociations[key];
	});
	
	// Check if markdown auto-preview is currently enabled
	const isAutoPreviewEnabled = editorAssociations['*.md'] === 'vscode.markdown.preview.editor';
	
	if (isAutoPreviewEnabled) {
		// Disable auto-preview by removing the association
		delete editorAssociations['*.md'];
		vscode.window.showInformationMessage('Markdown auto-preview disabled');
	} else {
		// Enable auto-preview
		editorAssociations['*.md'] = 'vscode.markdown.preview.editor';
		vscode.window.showInformationMessage('Markdown auto-preview enabled');
	}
	
	// Update the configuration
	config.update('workbench.editorAssociations', editorAssociations, vscode.ConfigurationTarget.Global);
	
	// Update status bar item
	updateStatusBarItem();
}

function updateStatusBarItem() {
	const config = vscode.workspace.getConfiguration();
	const currentAssociations = config.get<{[key: string]: string}>('workbench.editorAssociations') || {};
	const isAutoPreviewEnabled = currentAssociations['*.md'] === 'vscode.markdown.preview.editor';
	
	if (isAutoPreviewEnabled) {
		statusBarItem.text = '$(eye) MD Preview';
		statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
	} else {
		statusBarItem.text = '$(eye-closed) MD Preview';
		statusBarItem.backgroundColor = undefined;
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}
