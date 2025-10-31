// ========================================
// Navigation JavaScript - nav.js
// Mobile Menu Toggle and Navigation Functionality
// ========================================

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // ========================================
        // Mobile Menu Toggle
        // ========================================
        
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelectorAll('nav ul li a');
        const body = document.body;

        // Toggle menu on hamburger click
        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                nav.classList.toggle('active');
                
                // Toggle hamburger icon
                if (nav.classList.contains('active')) {
                    menuToggle.textContent = '✕'; // Change to X when open
                    body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
                } else {
                    menuToggle.textContent = '☰'; // Change back to hamburger
                    body.style.overflow = ''; // Restore body scroll
                }
            });
        }

        // Close menu when clicking on nav links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.textContent = '☰';
                    }
                    body.style.overflow = ''; // Restore body scroll
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active')) {
                const isClickInsideNav = nav.contains(e.target);
                const isClickOnToggle = menuToggle && menuToggle.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnToggle) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.textContent = '☰';
                    }
                    body.style.overflow = ''; // Restore body scroll
                }
            }
        });

        // Close menu on window resize if open
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.textContent = '☰';
                    }
                    body.style.overflow = ''; // Restore body scroll
                }
            }, 250);
        });

        // ========================================
        // Smooth Scrolling for Anchor Links
        // ========================================
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or "#top"
                if (href === '#' || href === '#top') {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Get the target position
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ========================================
        // Sticky Navigation Background on Scroll
        // ========================================
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove shadow based on scroll position
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // ========================================
        // Active Link Highlighting
        // ========================================
        
        function setActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.pageYOffset + nav.offsetHeight + 100;
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(function(link) {
                        link.classList.remove('active-link');
                    });
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector('nav a[href*="#' + sectionId + '"]');
                    if (activeLink) {
                        activeLink.classList.add('active-link');
                    }
                }
            });
        }
        
        // Run on scroll
        window.addEventListener('scroll', setActiveLink);
        
        // Run on load
        setActiveLink();

        // ========================================
        // Back to Top Button (if exists)
        // ========================================
        
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    body.classList.add('scrolled');
                } else {
                    body.classList.remove('scrolled');
                }
            });
        }

        // ========================================
        // Prevent Menu from Opening on Desktop
        // ========================================
        
        function checkViewport() {
            if (window.innerWidth > 991) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                }
                body.style.overflow = '';
            }
        }
        
        // Check on load
        checkViewport();
        
        // Check on resize
        window.addEventListener('resize', checkViewport);

        // ========================================
        // Keyboard Navigation Support
        // ========================================
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                    menuToggle.focus(); // Return focus to toggle button
                }
                body.style.overflow = '';
            }
        });

        // Focus trap in mobile menu when open
        if (menuToggle) {
            menuToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }

        // ========================================
        // Console Log for Debugging
        // ========================================
        
        console.log('✅ Navigation script loaded successfully');
        console.log('📱 Mobile menu ready');
        
    });

})();