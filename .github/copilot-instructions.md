# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Overview
This extension provides a status bar button to toggle auto-preview mode for markdown files. It toggles the `workbench.editorAssociations` setting between default editor and preview editor for `*.md` files.

Add placeholders for visual docvumentation, gifs, possible images or veideos we can add. Give references to URLs, navigation, file history management, versioning, add proper headers, and ensure the documentation is clear and concise.

## Key Features
- Status bar button with toggle state indication
- Toggles `workbench.editorAssociations` setting for markdown files
- Simple, minimal implementation
- TypeScript-based VS Code extension

## Implementation Notes
- Use VS Code Configuration API for settings management
- Use StatusBarItem for the toggle button
- Maintain state awareness for the toggle status
