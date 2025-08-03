Happy to announce my first VSCode Extension, the `vscode review md toggle`, a simple utility to more easily auto preview markdown files, within VSCode. Whole project was developed over the course of 3 hrs.

Here's the thing - I was working on some markdown docs (as we all do these days with AI) and kept getting frustrated with VS Code's inconsistent preview behavior. Sometimes files opened in preview mode, sometimes in editor mode. And when I needed to jump to a specific line number from an error log? Preview mode was completely useless.

Sure, I could toggle this setting in `.vscode/settings.json`:
```json
{
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  }
}
```

But then I'd have to remove it every time I actually wanted to search, debug or edit, the markdown. Annoying cycle.

So I thought: "How hard could it be to build a simple toggle for this?" 

Spoiler alert: With Claude Code (probably Sonnet 4) as my pair programming partner, it took 3 hours from idea to published extension. Here's how it went down...

## The 3-Hour Sprint ⏱️

**3:07 PM** - Started with "Hey Claude, I want to build a VS Code extension..."
**3:11 PM** - Had working scaffolding and core functionality  
**3:29 PM** - CI/CD pipeline running tests across Windows, macOS, Linux
**4:49 PM** - Professional documentation with GitHub Pages deployed
**6:10 PM** - Published to VS Code Marketplace as "Markdown Auto Preview Toggle"

What normally takes weeks happened in a single afternoon

Clean. Simple. Effective.

## What Claude Brought to the Table 🤖

1. **Zero Documentation Diving** - Instead of spending hours reading VS Code API docs, Claude gave me exactly what I needed, when I needed it

2. **Best Practices Baked In** - TypeScript setup, proper testing, CI/CD, professional documentation - all suggested and implemented from the start

3. **Quality Without Compromise** - Unit tests, integration tests, performance tests, visual regression tests. The works.

4. **Professional Polish** - Asset generation, README optimization, marketplace preparation

## The Results 📊

✅ **500+ lines of production code**  
✅ **Comprehensive test suite**  
✅ **Cross-platform CI/CD**  
✅ **Professional documentation**  
✅ **Published and ready for users**  

All in 3 hours. 🤯

## The Real Lesson Here �

This isn't about AI replacing developers. It's about **amplification**.

I brought the problem-solving, creativity, and vision. Claude brought the execution speed, best practices knowledge, and quality assurance.

**Human creativity + AI efficiency = 10x results**

The extension is live now: **"Markdown Auto Preview Toggle"** 
� **Install**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GSejas.markdown-auto-preview-toggle)
📖 **Docs**: [https://gsejas.github.io/vscode-review-md-toggle/](https://gsejas.github.io/vscode-review-md-toggle/)

## What's Your "Annoying 3-Minute Problem"? 🤔

We all have those little friction points in our daily workflow. What's yours? 

Maybe it's time to stop living with it and start building the solution. With tools like Claude, the barrier between "this annoys me" and "shipped solution" has never been lower.

The future isn't about coding faster - it's about turning ideas into reality at the speed of thought.

What will you build next? 🛠️

---

*P.S. - The complete journey with all commits, tests, and documentation is open source. DM me if you want to see the behind-the-scenes!*

#VSCode #AI #ClaudeSonnet4 #Productivity #BuildInPublic #ExtensionDevelopment #AIAssistedDevelopment