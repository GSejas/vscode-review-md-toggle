# Contributing to Markdown Auto Preview Toggle

Thank you for your interest in contributing to this VS Code extension! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Building and Testing](#building-and-testing)
- [Code Style Guidelines](#code-style-guidelines)
- [Release Process](#release-process)
- [Submitting Changes](#submitting-changes)

## 🛠️ Development Setup

### Prerequisites
- **Node.js** v18+ and npm
- **VS Code** v1.102.0+
- **Git** for version control

### Initial Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vscode-review-md-toggle.git
   cd vscode-review-md-toggle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install recommended VS Code extensions**
   - ESBuild Problem Matchers (`connor4312.esbuild-problem-matchers`)

### Development Workflow
1. **Start watch mode** for continuous compilation:
   ```bash
   npm run watch
   ```

2. **Open in VS Code** and press `F5` to launch Extension Development Host

3. **Test your changes** in the new VS Code window

## 📁 Project Structure

```
├── .github/
│   └── copilot-instructions.md    # AI coding assistant instructions
├── .vscode/
│   ├── extensions.json            # Recommended extensions
│   ├── launch.json                # Debug configuration
│   ├── settings.json              # Workspace settings
│   └── tasks.json                 # Build tasks
├── src/
│   ├── extension.ts               # Main extension code
│   └── test/                      # Test files
│       ├── extension.test.ts      # Core functionality tests
│       ├── statusbar.test.ts      # Status bar integration tests
│       └── performance.test.ts    # Performance and edge case tests
├── package.json                   # Extension manifest and dependencies
├── tsconfig.json                  # TypeScript configuration
├── esbuild.js                     # Build configuration
├── eslint.config.mjs              # Linting rules
└── README.md                      # User documentation
```

## 🏗️ Building and Testing

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile TypeScript and bundle with esbuild |
| `npm run watch` | Start watch mode for development |
| `npm run package` | Create production build |
| `npm run test` | Run all tests |
| `npm run lint` | Run ESLint |
| `npm run check-types` | Run TypeScript type checking |

### Testing
- **Unit Tests**: Test core functionality in isolation
- **Integration Tests**: Test VS Code API integration
- **Performance Tests**: Verify activation time and memory usage

Run tests with:
```bash
npm test
```

### Build Verification
Before submitting changes, ensure:
```bash
npm run package  # Should complete without errors
npm test         # All tests should pass
npm run lint     # No linting errors
```

## 📝 Code Style Guidelines

### TypeScript Standards
- Use **explicit typing** where beneficial
- Prefer **const** over let where possible
- Use **async/await** for promises
- Follow **VS Code extension naming conventions**

### Code Organization
- **Single responsibility**: Each function should have one clear purpose
- **Error handling**: Wrap VS Code API calls in try-catch blocks
- **Memory management**: Dispose of subscriptions and resources
- **Performance**: Minimize extension activation time

### Example Code Structure
```typescript
export function activate(context: vscode.ExtensionContext) {
    // 1. Initialize extension state
    // 2. Create UI elements (status bar, commands)
    // 3. Register event handlers
    // 4. Add to subscriptions for cleanup
}

function handleCommand() {
    try {
        // Implementation
    } catch (error) {
        vscode.window.showErrorMessage(`Operation failed: ${error}`);
    }
}
```

## 🚀 Release Process

### Version Management
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

### Release Steps
1. **Update version** in `package.json`
2. **Update CHANGELOG.md** with new features/fixes
3. **Run full test suite**: `npm test`
4. **Create production build**: `npm run package`
5. **Test in clean VS Code instance**
6. **Create Git tag**: `git tag v1.0.0`
7. **Push to repository**: `git push origin main --tags`
8. **Create GitHub release** with changelog
9. **Publish to marketplace** (if applicable)

### Pre-release Checklist
- [ ] All tests passing
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] Changelog updated
- [ ] Manual testing completed

## 📥 Submitting Changes

### Pull Request Process
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/your-feature-name`
3. **Make changes** following code style guidelines
4. **Add tests** for new functionality
5. **Update documentation** if needed
6. **Commit with clear message**: `git commit -m "Add: feature description"`
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Create Pull Request** with description of changes

### Commit Message Format
```
Type: Brief description (50 chars max)

Longer explanation if needed (wrap at 72 characters)

- Bullet points for multiple changes
- Reference issues: Fixes #123
```

**Types**: `Add`, `Fix`, `Update`, `Remove`, `Refactor`, `Test`, `Docs`

### Pull Request Template
- **Description**: What does this PR do?
- **Type of change**: Bug fix / New feature / Breaking change / Documentation
- **Testing**: How was this tested?
- **Checklist**: 
  - [ ] Tests pass
  - [ ] Code follows style guidelines
  - [ ] Documentation updated

## 🐛 Bug Reports

When reporting bugs, include:
- **VS Code version**
- **Extension version**
- **Operating system**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Error messages** (if any)

## 💡 Feature Requests

For new features:
- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches
- **Additional context**: Screenshots, examples

## 📞 Getting Help

- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Documentation**: Check README.md and code comments

## 🏆 Recognition

Contributors will be recognized in:
- **CHANGELOG.md** for each release
- **README.md** contributors section
- **GitHub releases** notes

Thank you for helping make this extension better! 🎉
