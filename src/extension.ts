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
	// Tooltip is set dynamically in updateStatusBarItem so it reflects current state,
	// available action, and links to documentation for product/UX clarity.
	
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
		statusBarItem.text = '$(markdown)$(eye)';
		statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
		// Rich tooltip for enabled state
		const md = new vscode.MarkdownString();
		md.isTrusted = true; // allow command links
		md.appendMarkdown('**Markdown Auto-Preview — Enabled**\n\n');
		md.appendMarkdown('When enabled, Markdown files open directly in the Preview editor by default. This makes it faster to review rendered content.\n\n');
		md.appendMarkdown('**Action:** [Toggle auto-preview](command:markdown-auto-preview-toggle.toggle)\n\n');
		md.appendMarkdown('**Docs:** [Extension README](https://github.com/GSejas/vscode-review-md-toggle#readme)');
		statusBarItem.tooltip = md;
	} else {
		statusBarItem.text = '$(markdown)$(eye-closed)';
		statusBarItem.backgroundColor = undefined;
		// Rich tooltip for disabled state
		const md = new vscode.MarkdownString();
		md.isTrusted = true; // allow command links
		md.appendMarkdown('**Markdown Auto-Preview — Disabled**\n\n');
		md.appendMarkdown('When disabled, Markdown files open in the default editor. Toggle to enable preview-on-open for faster content review.\n\n');
		md.appendMarkdown('**Action:** [Enable auto-preview](command:markdown-auto-preview-toggle.toggle)\n\n');
		md.appendMarkdown('**Docs:** [Extension README](https://github.com/GSejas/vscode-review-md-toggle#readme)');
		statusBarItem.tooltip = md;
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}
