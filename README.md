# Markdown Auto Preview Toggle

A simple VS Code extension that provides a status bar button to toggle auto-preview mode for markdown files.

<!-- 🎬 Demo GIF Placeholder -->
![Extension Demo](./assets\gifs\demo.mp4)
> *Quick demo showing the toggle functionality in action*

## Features

- **Status Bar Toggle**: A convenient button in the status bar to quickly toggle markdown auto-preview
- **Visual Indicator**: The button shows different icons and colors based on the current state:
  - 👁️ (eye) with highlighted background when auto-preview is enabled
  - 👁️‍🗨️ (eye-closed) when auto-preview is disabled
- **Global Setting**: Changes are applied globally using VS Code's `workbench.editorAssociations` setting
- **Automatic State Detection**: The extension detects the current state on startup and updates accordingly

<!-- 📸 Visual State Comparison -->
<table>
<tr>
<td align="center">
<strong>Auto-Preview Enabled</strong><br>
<img src="./assets/images/status-bar-enabled.png" alt="Status bar with auto-preview enabled" width="300">
</td>
<td align="center">
<strong>Auto-Preview Disabled</strong><br>
<img src="./assets/images/status-bar-disabled.png" alt="Status bar with auto-preview disabled" width="300">
</td>
</tr>
</table>

## How It Works

The extension toggles the `workbench.editorAssociations` setting for `*.md` files between:
- **Enabled**: `"*.md": "vscode.markdown.preview.editor"` - Markdown files open in preview mode by default
- **Disabled**: No association (removed) - Markdown files open in the editor normally

## Usage

<!-- 🎥 Installation GIF Placeholder -->
### Installation
![Installation Demo](./assets/gifs/installation-demo.gif)

### Quick Start
1. Look for the eye icon in the status bar (bottom right)
2. Click the button to toggle between auto-preview enabled/disabled
3. The icon and background will update to reflect the current state
4. A notification will confirm the change

<!-- 📷 Command Palette Usage -->
### Alternative: Command Palette
![Command Palette Usage](./assets/images/command-palette.png)

You can also use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "Toggle Markdown Auto Preview".

## Development

To run and test this extension:

1. Open this folder in VS Code
2. Press `F5` to open a new Extension Development Host window
3. In the new window, look for the eye icon in the status bar
4. Open the included `test-markdown.md` file to test the functionality

## Extension Settings

This extension modifies the following VS Code setting:

- `workbench.editorAssociations`: Controls which editor to use for specific file types
  - When enabled: `"*.md": "vscode.markdown.preview.editor"`
  - When disabled: The `*.md` association is removed

## Commands

- `markdown-auto-preview-toggle.toggle`: Toggle Markdown Auto Preview

## Release Notes

### 0.0.1

Initial release with basic toggle functionality:
- Status bar button for quick access
- Visual state indicators
- Global setting management
- Automatic state detection

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
