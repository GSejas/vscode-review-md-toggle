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

## Development Lessons Learned
- **Configuration Objects**: Always create clean copies before manipulation to avoid proxy issues in bundled environments
- **Test Strategy**: Focus on command execution testing rather than configuration state verification in test environments
- **Performance**: Keep activation minimal (<100ms) and dispose of resources properly
- **Error Handling**: Wrap all VS Code API calls in try-catch blocks for graceful failure
- **Bundle Optimization**: Monitor bundle size (<50KB) and exclude 'vscode' from bundling
- **Async Patterns**: Allow time for configuration updates to propagate (200ms delays in tests)

## Architecture Patterns
- Single responsibility functions for better testability
- Proper subscription management for memory leak prevention
- Clean separation between UI (status bar) and logic (configuration management)
- Defensive programming for edge cases (empty configs, rapid toggles)

## Visual Documentation Placeholders
- **Demo GIF**: Status bar toggle operation showing before/after states
- **Installation Video**: Step-by-step marketplace installation guide
- **Configuration Screenshot**: Settings panel showing the toggled association
- **Architecture Diagram**: Component interaction flow (Status Bar → Command → Config → Notification)
- **Compatibility Matrix**: Supported VS Code versions and platforms
- **Performance Metrics**: Activation time and memory usage charts
