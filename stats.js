// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    // Intersection Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    // Animate counter function
    function animateCounter(target, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            target.textContent = current + (target.dataset.suffix || '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                target.style.opacity = '1';
                animateCounter(target, 0, endValue, 2000); // 2000ms = 2 seconds duration
                target.classList.add('counted'); // Prevent re-animation
            }
        });
    }, options);

    // Observe each stat
    stats.forEach(stat => {
        // Store original number
        stat.dataset.value = stat.textContent.replace(/[^0-9]/g, '');
        // Set initial state
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Set suffix based on content
        if (stat.textContent.includes('%')) {
            stat.dataset.suffix = '%';
        } else {
            stat.dataset.suffix = '+';
        }
        
        observer.observe(stat);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});

// Reinitialize on route change if using the router
window.addEventListener('routeChanged', () => {
    animateStats();
});