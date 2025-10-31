// Function to check and handle empty links
document.addEventListener('DOMContentLoaded', function() {
    // Find all links and buttons
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if href is # or empty
            if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                e.preventDefault(); // Prevent default navigation
                
                // Create or get existing message element
                let message = document.getElementById('coming-soon-message');
                if (!message) {
                    message = document.createElement('div');
                    message.id = 'coming-soon-message';
                    message.style.cssText = `
                        position: fixed;
                        top: 80px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: var(--gradient-primary, linear-gradient(to right, #2563eb, #3b82f6));
                        color: white;
                        padding: 12px 24px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        z-index: 999;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        max-width: 90%;
                        text-align: center;
                        word-wrap: break-word;
                    `;
                    document.body.appendChild(message);
                }
                
                // Set message text and show
                message.textContent = 'This page is currently unavailable. It\'s Coming Soon! Thanks for your patience.';
                message.style.opacity = '1';
                
                // Hide message after 2 seconds
                setTimeout(() => {
                    message.style.opacity = '0';
                    // Remove element after fade out
                    setTimeout(() => {
                        if (message.parentNode) {
                            message.parentNode.removeChild(message);
                        }
                    }, 300);
                }, 2000);
            } else if (href.startsWith('/') || !href.startsWith('http')) {
                // Handle internal navigation
                e.preventDefault();
                const path = href === '/' ? '/' : href.replace('.html', '');
                window.history.pushState({}, '', path);
                router();
            }
            // External links will work as normal
        });
    });
});
            }
        });
    });
});
