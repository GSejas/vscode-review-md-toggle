# Claude Project Context: VS Code Markdown Auto Preview Toggle Extension

## Project Overview
This is a VS Code extension that provides a status bar button to toggle auto-preview mode for markdown files. The extension manages the `workbench.editorAssociations` setting to control whether markdown files open in preview mode by default.

## Project Structure
```
vscode-review-md-toggle/
├── src/
│   ├── extension.ts              # Main extension logic
│   └── test/                     # Test suite
│       ├── extension.test.ts     # Core functionality tests
│       ├── statusbar.test.ts     # Status bar UI tests
│       ├── performance.test.ts   # Performance benchmarks
│       └── visual.test.ts        # Visual documentation tests
├── assets/                       # Visual documentation assets
│   ├── images/                   # Screenshot images
│   │   ├── preview-enabled.png   # Status bar enabled state
│   │   ├── preview-disabled.png  # Status bar disabled state
│   │   └── command-palette.png   # Command palette usage
│   └── gifs/                     # Demo animations
│       ├── demo.gif              # Main feature demonstration
│       └── demo.mp4              # Video version of demo
├── docs/                         # GitHub Pages documentation
├── scripts/                      # Automation scripts
│   ├── capture-screenshots.js    # Screenshot automation
│   └── validate-assets.js        # Asset validation
├── package.json                  # Extension manifest
├── tsconfig.json                 # TypeScript configuration
├── esbuild.js                    # Build configuration
└── .github/workflows/ci.yml      # CI/CD pipeline
```

## Key Technologies
- **TypeScript**: Main development language
- **VS Code Extension API**: Core functionality
- **esbuild**: Fast bundling and compilation
- **Mocha**: Test framework
- **GitHub Actions**: CI/CD automation

## Core Functionality
The extension provides:
1. **Status Bar Toggle**: Eye icon button in VS Code status bar
2. **Setting Management**: Toggles `workbench.editorAssociations` for `*.md` files
3. **Visual Feedback**: Different icons/colors for enabled/disabled states
4. **Command Palette**: Alternative access via `Toggle Markdown Auto Preview`

## Development Setup
```bash
npm install        # Install dependencies
npm run compile    # Compile TypeScript
npm test          # Run test suite
npm run package   # Build VSIX package
```

## Extension Lifecycle
1. **Activation**: Triggered on VS Code startup
2. **State Detection**: Reads current `workbench.editorAssociations` setting
3. **UI Creation**: Adds status bar item with appropriate icon
4. **Event Handling**: Responds to button clicks and command execution
5. **Setting Updates**: Modifies workspace configuration
6. **Cleanup**: Disposes resources on deactivation

## Testing Strategy
- **Unit Tests**: Core functionality and edge cases
- **Integration Tests**: VS Code API interactions
- **Performance Tests**: Activation time and memory usage
- **Visual Tests**: Screenshot generation and validation
- **CI/CD**: Automated testing across platforms (Windows, macOS, Linux)

## Visual Assets
The project includes comprehensive visual documentation:
- **Screenshots**: Status bar states and command palette
- **GIFs**: Animated demonstrations of functionality
- **SVG Icons**: Scalable graphics for documentation
- **Automated Capture**: Scripts for consistent screenshot generation

## Publishing Information
- **Publisher**: GSejas
- **Version**: 1.0.0
- **Extension ID**: GSejas.markdown-auto-preview-toggle
- **Marketplace**: Ready for VS Code marketplace publication

## Configuration Schema
```json
{
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"  // When enabled
    // Key removed when disabled
  }
}
```

## Commands
- `markdown-auto-preview-toggle.toggle`: Main toggle command

## Recent Development
- Updated from local development to production-ready state
- Fixed test suite for correct extension ID references
- Generated comprehensive visual documentation
- Implemented CI/CD pipeline with cross-platform testing
- Created production VSIX package for marketplace publishing

## Known Issues
- None currently identified

## Future Enhancements
- Per-workspace toggle settings
- Additional file type support
- Custom keyboard shortcuts
- Settings UI integration

## Documentation
- README.md: User-facing documentation with demos
- CONTRIBUTING.md: Development guidelines
- CHANGELOG.md: Version history
- GitHub Pages: Live documentation site

This project follows VS Code extension best practices and is ready for marketplace publication.
