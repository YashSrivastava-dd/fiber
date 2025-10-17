// Mobile Hamburger Menu
class MobileMenu {
    constructor() {
        this.hamburgerMenu = document.getElementById('hamburger-menu');
        this.mobileNavigation = document.getElementById('mobile-navigation');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.init();
    }
    
    init() {
        if (this.hamburgerMenu && this.mobileNavigation) {
            this.hamburgerMenu.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on nav links
            this.mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburgerMenu.contains(e.target) && 
                    !this.mobileNavigation.contains(e.target) && 
                    this.mobileNavigation.classList.contains('active')) {
                    this.closeMenu();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileNavigation.classList.contains('active')) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        this.hamburgerMenu.classList.toggle('active');
        this.mobileNavigation.classList.toggle('active');
    }
    
    closeMenu() {
        this.hamburgerMenu.classList.remove('active');
        this.mobileNavigation.classList.remove('active');
    }
}

// Smooth scroll and intersection observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.text-content, .image-content, .scroll-indicator, .problem-heading, .problem-sub, .intro-title, .intro-subtitle, .intro-copy, .intro-image, .how-title, .how-badge, .how-card, .accordion, .device-frame, .timeline-header, .timeline-item, .timeline-cta, .challenge-header, .plan-card, .challenge-footer');
        animateElements.forEach(el => this.observer.observe(el));
        
        // Observe benefit items for staggered animation
        const benefitItems = document.querySelectorAll('.benefit-item');
        benefitItems.forEach(el => this.observer.observe(el));
    }
}

// Button interactions and hover effects
class ButtonInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const ctaButton = document.querySelector('.cta-button');
        const planCtaButtons = document.querySelectorAll('.plan-cta');
        
        if (ctaButton) {
            // Add ripple effect on click
            ctaButton.addEventListener('click', (e) => {
                this.createRipple(e, ctaButton);
            });
            
            // Add hover glow effect
            ctaButton.addEventListener('mouseenter', () => {
                ctaButton.style.boxShadow = '0 15px 40px rgba(213, 139, 42, 0.4)';
            });
            
            ctaButton.addEventListener('mouseleave', () => {
                ctaButton.style.boxShadow = '';
            });
        }
        
        // Add interactions for plan CTA buttons
        planCtaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
            
            // Add hover effects
            button.addEventListener('mouseenter', () => {
                if (button.classList.contains('plan-cta-100')) {
                    button.style.boxShadow = '0 10px 30px rgba(213, 139, 42, 0.4)';
                } else {
                    button.style.boxShadow = '0 10px 30px rgba(213, 139, 42, 0.2)';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('paused');
            } else {
                document.body.classList.remove('paused');
            }
        });
    }
}

// Splash Screen Controller
class SplashScreen {
    constructor() {
        this.splashElement = document.getElementById('splash-screen');
        this.duration = 3000; // 5 seconds display
        this.init();
    }
    
    init() {
        // Disable body scroll during splash and lock scroll position
        document.body.classList.add('splash-active');
        window.scrollTo(0, 0); // Ensure we start at top
        
        // Start exit animation after duration
        setTimeout(() => {
            this.exit();
        }, this.duration);
    }
    
    exit() {
        // Add exit animation class
        this.splashElement.classList.add('splash-exit');
        
        // Remove splash screen and re-enable scroll after animation
        setTimeout(() => {
            this.splashElement.remove();
            document.body.classList.remove('splash-active');
            // Force scroll to top after splash exits
            window.scrollTo(0, 0);
        }, 800); // Match CSS transition duration
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize splash screen first
    new SplashScreen();
    
    // Initialize all components
    new ScrollAnimations();
    new ButtonInteractions();
    new PerformanceOptimizer();
    new MobileMenu();
    
    // Navigation Active State Management
    class NavigationManager {
        constructor() {
            this.navLinks = document.querySelectorAll('.nav-link');
            this.sections = document.querySelectorAll('section[id]');
            this.currentActive = null;
            this.init();
        }
        
        init() {
            // Set up intersection observer
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    root: null,
                    rootMargin: '-10% 0px -30% 0px',
                    threshold: [0.1, 0.3, 0.5, 0.7]
                }
            );
            
            // Observe all sections
            this.sections.forEach(section => {
                this.observer.observe(section);
            });
            
            // Set initial active state
            this.setActiveNav('home');
        }
        
        handleIntersection(entries) {
            let visibleSections = [];
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleSections.push({
                        id: entry.target.id,
                        ratio: entry.intersectionRatio,
                        element: entry.target
                    });
                }
            });
            
            if (visibleSections.length > 0) {
                // Prioritize footer section if it's visible
                const footerSection = visibleSections.find(section => section.id === 'section-footer');
                if (footerSection && footerSection.ratio > 0.2) {
                    console.log('Footer section detected, setting active');
                    this.setActiveNav('section-footer');
                    return;
                }
                
                // Find the section with highest intersection ratio
                const mostVisible = visibleSections.reduce((prev, current) => 
                    current.ratio > prev.ratio ? current : prev
                );
                
                console.log('Most visible section:', mostVisible.id, 'Ratio:', mostVisible.ratio);
                this.setActiveNav(mostVisible.id);
            }
        }
        
        setActiveNav(sectionId) {
            if (this.currentActive === sectionId) return;
            
            // Remove active class from all nav links
            this.navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            // Handle special case for footer section
            let targetLink;
            if (sectionId === 'section-footer') {
                targetLink = document.querySelector('a[href="#section-footer"]');
            } else {
                targetLink = document.querySelector(`a[href="#${sectionId}"]`);
            }
            
            if (targetLink) {
                targetLink.classList.add('active');
                this.currentActive = sectionId;
                console.log('Set active nav for:', sectionId, 'Link found:', !!targetLink);
            } else {
                console.log('No nav link found for section:', sectionId);
            }
        }
    }
    
    // Initialize navigation manager
    new NavigationManager();
    
    // Lightweight accordion behavior for How section
    document.querySelectorAll('.accordion').forEach((accordion) => {
        const header = accordion.querySelector('.accordion-header');
        const panel = accordion.querySelector('.accordion-panel');
        const imageContainer = document.getElementById('accordion-image-container');
        if (!header) return;
        
        header.addEventListener('click', () => {
            accordion.classList.toggle('open');
            // Accessibility state
            const expanded = accordion.classList.contains('open');
            header.setAttribute('aria-expanded', String(expanded));
            
            if (panel) {
                if (expanded) {
                    // Set max-height to content height for smooth expand
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                    panel.style.paddingBottom = '1rem';
                } else {
                    // Collapse
                    panel.style.maxHeight = '0px';
                    panel.style.paddingBottom = '0';
                }
            }
            
            // Show/hide image based on accordion content
            if (imageContainer) {
                const accordionText = header.querySelector('span:last-child').textContent.trim();
                const imageElement = document.getElementById('accordion-image');
                
                console.log('Accordion clicked:', accordionText, 'Expanded:', expanded);
                
                if (expanded) {
                    if (accordionText === 'Reduces Hunger, Enhances Satiety') {
                        imageElement.src = 'images/PHOTO-2025-10-16-16-50-07.jpg';
                        imageElement.alt = 'Hunger Reduction Benefits';
                        imageContainer.classList.add('show');
                        console.log('Showing hunger image');
                    } else if (accordionText === 'Improves Energy and Focus') {
                        imageElement.src = 'images/PHOTO-2025-10-16-16-58-26.jpg';
                        imageElement.alt = 'Energy and Focus Benefits';
                        imageContainer.classList.add('show');
                        console.log('Showing energy image');
                    } else if (accordionText === 'Elevates Mood') {
                        imageElement.src = 'images/PHOTO-2025-10-16-16-58-27.jpg';
                        imageElement.alt = 'Mood Elevation Benefits';
                        imageContainer.classList.add('show');
                        console.log('Showing mood image');
                    } else if (accordionText === 'Pre & Pro Biotics') {
                        imageElement.src = 'images/PHOTO-2025-10-16-16-59-35.jpg';
                        imageElement.alt = 'Pre & Pro Biotics Benefits';
                        imageContainer.classList.add('show');
                        console.log('Showing probiotics image');
                    } else {
                        // Show default image for other accordion items
                        imageElement.src = 'images/PHOTO-2025-10-16-17-09-09.jpg';
                        imageElement.alt = 'Fiber X Benefits';
                        imageContainer.classList.add('show');
                        console.log('Showing default image');
                    }
                } else {
                    // When accordion is collapsed, show default image
                    imageElement.src = 'images/PHOTO-2025-10-16-17-09-09.jpg';
                    imageElement.alt = 'Fiber X Benefits';
                    imageContainer.classList.add('show');
                    console.log('Showing default image - accordion collapsed');
                }
            }
        });
    });
    
    // Add loading complete class for any final animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    // Clean up any running animations
    console.log('Page unloading - cleanup complete');
});
