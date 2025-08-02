// GitHub Pages JavaScript for Markdown Auto Preview Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Markdown Auto Preview Toggle - GitHub Pages loaded');
    
    // Load GitHub releases
    loadGitHubReleases();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add interactive features
    initInteractiveFeatures();
});

/**
 * 📦 Load and display GitHub releases
 */
async function loadGitHubReleases() {
    const releasesContainer = document.getElementById('releases-container');
    const owner = 'GSejas';
    const repo = 'vscode-review-md-toggle';
    
    try {
        console.log('📥 Fetching releases from GitHub API...');
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const releases = await response.json();
        console.log(`✅ Loaded ${releases.length} releases`);
        
        if (releases.length === 0) {
            releasesContainer.innerHTML = `
                <div class="no-releases">
                    <p>🚧 No releases available yet. Check back soon!</p>
                    <a href="https://github.com/${owner}/${repo}/releases" class="btn btn-outline" target="_blank">
                        View GitHub Releases
                    </a>
                </div>
            `;
            return;
        }
        
        // Display releases
        releasesContainer.innerHTML = releases.slice(0, 5).map(release => createReleaseCard(release)).join('');
        
    } catch (error) {
        console.error('❌ Failed to load releases:', error);
        releasesContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load releases. Please try again later.</p>
                <a href="https://github.com/${owner}/${repo}/releases" class="btn btn-outline" target="_blank">
                    View on GitHub
                </a>
            </div>
        `;
    }
}

/**
 * 🎨 Create a release card HTML
 */
function createReleaseCard(release) {
    const releaseDate = new Date(release.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const assets = release.assets || [];
    const vsixAssets = assets.filter(asset => asset.name.endsWith('.vsix'));
    
    return `
        <div class="release-card">
            <div class="release-header">
                <div class="release-version">
                    <span class="version-tag">${release.tag_name}</span>
                    ${release.prerelease ? '<span class="prerelease-badge">Pre-release</span>' : ''}
                </div>
                <div class="release-date">${releaseDate}</div>
            </div>
            
            <h3>${release.name || release.tag_name}</h3>
            
            <div class="release-description">
                ${formatReleaseBody(release.body || 'No description available.')}
            </div>
            
            <div class="release-assets">
                ${vsixAssets.map(asset => `
                    <a href="${asset.browser_download_url}" class="asset-link" target="_blank">
                        <span>📦</span>
                        <span>${asset.name}</span>
                        <span class="asset-size">(${formatFileSize(asset.size)})</span>
                    </a>
                `).join('')}
                
                <a href="${release.html_url}" class="asset-link" target="_blank">
                    <span>🔗</span>
                    <span>Release Notes</span>
                </a>
            </div>
        </div>
    `;
}

/**
 * 📝 Format release body text
 */
function formatReleaseBody(body) {
    if (!body) return 'No description available.';
    
    // Truncate if too long
    if (body.length > 300) {
        body = body.substring(0, 300) + '...';
    }
    
    // Basic markdown to HTML conversion for common patterns
    return body
        .replace(/### (.*)/g, '<strong>$1</strong>')
        .replace(/## (.*)/g, '<strong>$1</strong>')
        .replace(/# (.*)/g, '<strong>$1</strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

/**
 * 📏 Format file size in human readable format
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 🌊 Initialize smooth scrolling for navigation
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ✨ Initialize interactive features
 */
function initInteractiveFeatures() {
    // Add copy-to-clipboard for code blocks
    initCodeCopyButtons();
    
    // Add scroll-to-top functionality
    initScrollToTop();
    
    // Add loading animations
    initLoadingAnimations();
    
    // Track page analytics (if needed)
    initAnalytics();
}

/**
 * 📋 Add copy buttons to code blocks
 */
function initCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach((codeBlock, index) => {
        const button = document.createElement('button');
        button.textContent = '📋 Copy';
        button.className = 'copy-btn';
        button.onclick = () => copyToClipboard(codeBlock.textContent, button);
        
        codeBlock.parentElement.style.position = 'relative';
        codeBlock.parentElement.appendChild(button);
    });
}

/**
 * 📋 Copy text to clipboard
 */
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = '❌ Failed';
        setTimeout(() => {
            button.textContent = '📋 Copy';
        }, 2000);
    }
}

/**
 * ⬆️ Initialize scroll to top button
 */
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '⬆️';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: var(--shadow);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

/**
 * 🎬 Initialize loading animations
 */
function initLoadingAnimations() {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe feature cards and other animated elements
    document.querySelectorAll('.feature-card, .install-card, .step, .contrib-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
}

/**
 * 📊 Initialize analytics (placeholder)
 */
function initAnalytics() {
    // Track page view
    console.log('📊 Page view tracked');
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent.trim();
            const buttonHref = e.target.href || '';
            console.log('🖱️ Button clicked:', { buttonText, buttonHref });
            
            // Here you could send analytics to your preferred service
            // Example: gtag('event', 'click', { button_text: buttonText });
        });
    });
}

/**
 * 🌟 Add some Easter eggs and fun interactions
 */
function initEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konami.toString()) {
            showEasterEgg();
        }
    });
}

/**
 * 🎉 Show easter egg animation
 */
function showEasterEgg() {
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the easter egg! Thanks for exploring the docs! 👁️';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        text-align: center;
        font-size: 1.2rem;
        animation: bounceIn 0.5s;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Initialize easter eggs
initEasterEggs();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatFileSize,
        formatReleaseBody,
        copyToClipboard
    };
}
