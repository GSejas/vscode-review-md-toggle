# Test Markdown File

This is a test markdown file to demonstrate the auto-preview toggle functionality.

## Features to Test

1. Open this file normally (should open in editor)
2. Click the status bar button to enable auto-preview
3. Open another markdown file (should open in preview mode)
4. Click the status bar button again to disable auto-preview
5. Open another markdown file (should open in editor mode)

## Expected Behavior

- When auto-preview is **enabled**: 👁️ icon with highlighted background
- When auto-preview is **disabled**: 👁️‍🗨️ icon with normal background

## Settings Being Toggled

The extension modifies this setting:

```json
{
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  }
}
```

When enabled, all markdown files will open in preview mode by default.
