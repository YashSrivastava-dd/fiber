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

// Shopping Cart Manager
class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartDrawer = document.getElementById('cart-drawer');
        this.cartButton = document.getElementById('cart-button');
        this.cartClose = document.getElementById('cart-close');
        this.cartOverlay = document.getElementById('cart-overlay');
        this.cartItemsContainer = document.getElementById('cart-items');
        this.cartCount = document.getElementById('cart-count');
        this.cartTotal = document.getElementById('cart-total');
        this.cartCheckoutBtn = document.getElementById('cart-checkout-btn');
        
        this.loadCart();
        this.setupEventListeners();
        this.updateCartUI();
    }
    
    setupEventListeners() {
        // Open cart
        this.cartButton?.addEventListener('click', () => this.openCart());
        
        // Close cart
        this.cartClose?.addEventListener('click', () => this.closeCart());
        this.cartOverlay?.addEventListener('click', () => this.closeCart());
        
        // ESC key to close cart
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartDrawer?.classList.contains('active')) {
                this.closeCart();
            }
        });
    }
    
    openCart() {
        this.cartDrawer?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        this.cartDrawer?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    addItem(product) {
        // Check if item already exists
        const existingItem = this.items.find(item => item.variantId === product.variantId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                variantId: product.variantId,
                productId: product.productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.openCart();
        
        // Show success feedback
        this.showAddedToCartAnimation();
    }
    
    removeItem(variantId) {
        this.items = this.items.filter(item => item.variantId !== variantId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(variantId, quantity) {
        const item = this.items.find(item => item.variantId === variantId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(variantId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    saveCart() {
        localStorage.setItem('fiber_x_cart', JSON.stringify(this.items));
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('fiber_x_cart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (e) {
                console.error('Error loading cart:', e);
                this.items = [];
            }
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
    
    updateCartUI() {
        // Update cart count badge
        const totalItems = this.getTotalItems();
        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
            this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        // Update cart total
        const total = this.getTotal();
        if (this.cartTotal) {
            this.cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
        }
        
        // Update cart items display
        if (this.cartItemsContainer) {
            if (this.items.length === 0) {
                this.cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <svg class="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                        <p class="empty-cart-text">Your cart is empty</p>
                        <p class="empty-cart-subtext">Add products to get started</p>
                    </div>
                `;
                this.cartCheckoutBtn?.setAttribute('disabled', 'true');
            } else {
                this.cartItemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-variant-id="${item.variantId}">
                        <div class="cart-item-image">
                            <img src="${item.image || 'images/9.svg'}" alt="${item.title}">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${item.title}</h3>
                            <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-variant-id="${item.variantId}">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                                    </svg>
                                </button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn plus" data-variant-id="${item.variantId}">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-variant-id="${item.variantId}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                `).join('');
                
                this.cartCheckoutBtn?.removeAttribute('disabled');
                
                // Add event listeners to quantity buttons
                this.cartItemsContainer.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const variantId = e.currentTarget.dataset.variantId;
                        const item = this.items.find(item => item.variantId === variantId);
                        if (item) {
                            this.updateQuantity(variantId, item.quantity + 1);
                        }
                    });
                });
                
                this.cartItemsContainer.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const variantId = e.currentTarget.dataset.variantId;
                        const item = this.items.find(item => item.variantId === variantId);
                        if (item) {
                            this.updateQuantity(variantId, item.quantity - 1);
                        }
                    });
                });
                
                this.cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const variantId = e.currentTarget.dataset.variantId;
                        this.removeItem(variantId);
                    });
                });
            }
        }
    }
    
    showAddedToCartAnimation() {
        // Add a pulse animation to cart button
        this.cartButton?.classList.add('pulse');
        setTimeout(() => {
            this.cartButton?.classList.remove('pulse');
        }, 600);
    }
    
    getItems() {
        return this.items;
    }
}

// Shopify Buy Button Integration
class ShopifyIntegration {
    constructor() {
        this.client = null;
        this.cart = new ShoppingCart();
        this.init();
    }
    
    init() {
        // Wait for Shopify SDK to load
        if (typeof ShopifyBuy === 'undefined') {
            console.error('Shopify Buy SDK not loaded');
            return;
        }
        
        // Initialize Shopify client
        this.client = ShopifyBuy.buildClient({
            domain: window.shopifyConfig.domain,
            storefrontAccessToken: window.shopifyConfig.storefrontAccessToken
        });
        
        // Set up button handlers
        this.setupButtons();
        
        // Set up checkout button
        this.setupCheckout();
    }
    
    setupButtons() {
        // Hero CTA Button
        const heroCta = document.querySelector('.cta-button');
        if (heroCta) {
            heroCta.addEventListener('click', () => {
                this.openProductSelection();
            });
        }
        
        // Timeline CTA Button
        const timelineCta = document.querySelector('.timeline-cta-button');
        if (timelineCta) {
            timelineCta.addEventListener('click', () => {
                this.openProductSelection();
            });
        }
        
        // 30 Day Plan Button
        const thirtyDayButton = document.querySelector('.plan-cta-30');
        if (thirtyDayButton) {
            thirtyDayButton.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const originalText = button.textContent;
                button.textContent = 'Adding...';
                button.classList.add('loading');
                button.disabled = true;
                
                this.addToCart(window.shopifyConfig.products.thirtyDay, '30 Day Plan', 2499)
                    .finally(() => {
                        button.textContent = originalText;
                        button.classList.remove('loading');
                        button.disabled = false;
                    });
            });
        }
        
        // 100 Day Challenge Button
        const hundredDayButton = document.querySelector('.plan-cta-100');
        if (hundredDayButton) {
            hundredDayButton.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const originalText = button.textContent;
                button.textContent = 'Adding...';
                button.classList.add('loading');
                button.disabled = true;
                
                this.addToCart(window.shopifyConfig.products.hundredDay, '100 Day Challenge', 6999)
                    .finally(() => {
                        button.textContent = originalText;
                        button.classList.remove('loading');
                        button.disabled = false;
                    });
            });
        }
    }
    
    setupCheckout() {
        const checkoutBtn = document.getElementById('cart-checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.proceedToCheckout();
            });
        }
    }
    
    openProductSelection() {
        // Scroll to pricing section when generic CTA is clicked
        const pricingSection = document.querySelector('.challenge-cta');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    async addToCart(productIdOrHandle, title, price) {
        try {
            console.log('Adding to cart:', productIdOrHandle);
            
            let product;
            
            // Fetch product by handle
            if (productIdOrHandle.startsWith('gid://shopify/Product/')) {
                product = await this.client.product.fetch(productIdOrHandle);
            } else {
                product = await this.client.product.fetchByHandle(productIdOrHandle);
            }
            
            if (product && product.variants && product.variants.length > 0) {
                const variant = product.variants[0];
                
                // Add to cart
                this.cart.addItem({
                    variantId: variant.id,
                    productId: product.id,
                    title: title || product.title,
                    price: price || parseFloat(variant.price.amount),
                    image: product.images[0]?.src || null
                });
                
                console.log('Added to cart successfully');
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Sorry, there was an error adding the product to your cart. Please try again.');
        }
    }
    
    async proceedToCheckout() {
        try {
            const cartItems = this.cart.getItems();
            
            if (cartItems.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            console.log('Creating checkout with items:', cartItems);
            
            // Show loading state
            const checkoutBtn = document.getElementById('cart-checkout-btn');
            const originalContent = checkoutBtn.innerHTML;
            checkoutBtn.innerHTML = '<span>Processing...</span>';
            checkoutBtn.disabled = true;
            
            // Create line items for checkout
            const lineItems = cartItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            }));
            
            // Create checkout
            const checkout = await this.client.checkout.create({
                lineItems: lineItems
            });
            
            console.log('Checkout created:', checkout.webUrl);
            
            // Redirect to checkout
            window.location.href = checkout.webUrl;
            
        } catch (error) {
            console.error('Error creating checkout:', error);
            alert('Sorry, there was an error processing your checkout. Please try again.');
            
            // Restore button
            const checkoutBtn = document.getElementById('cart-checkout-btn');
            checkoutBtn.innerHTML = '<span>Proceed to Checkout</span><svg class="checkout-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>';
            checkoutBtn.disabled = false;
        }
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
    
    // Initialize Shopify integration (after SDK loads)
    setTimeout(() => {
        new ShopifyIntegration();
    }, 500);
    
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
                        imageElement.src = 'images/PHOTO-2025-10-16-17-09-09-removebg-preview.png';
                        imageElement.alt = 'Hunger Reduction Benefits';
                        imageElement.classList.add('hunger-image');
                        imageContainer.classList.add('show');
                        console.log('Showing hunger image');
                    } else if (accordionText === 'Improves Energy and Focus') {
                        imageElement.src = 'images/Group 590.png';
                        imageElement.alt = 'Energy and Focus Benefits';
                        imageElement.classList.remove('hunger-image');
                        imageContainer.classList.add('show');
                        console.log('Showing energy image');
                    } else if (accordionText === 'Elevates Mood') {
                        imageElement.src = 'images/ChatGPT Image Oct 17, 2025 at 03_50_04 PM.png';
                        imageElement.alt = 'Mood Elevation Benefits';
                        imageElement.classList.remove('hunger-image');
                        imageContainer.classList.add('show');
                        console.log('Showing mood image');
                    } else if (accordionText === 'Pre & Pro Biotics') {
                        imageElement.src = 'images/ChatGPT Image Oct 17, 2025 at 12_59_49 PM.png';
                        imageElement.alt = 'Pre & Pro Biotics Benefits';
                        imageElement.classList.remove('hunger-image');
                        imageContainer.classList.add('show');
                        console.log('Showing probiotics image');
                    } else {
                        // Show default image for other accordion items
                        imageElement.src = 'images/ChatGPT Image Oct 17, 2025 at 04_52_53 PM.png';
                        imageElement.alt = 'Fiber X Benefits';
                        imageElement.classList.remove('hunger-image');
                        imageContainer.classList.add('show');
                        console.log('Showing default image');
                    }
                } else {
                    // When accordion is collapsed, show default image
                    imageElement.src = 'images/ChatGPT Image Oct 17, 2025 at 04_52_53 PM.png';
                    imageElement.alt = 'Fiber X Benefits';
                    imageElement.classList.remove('hunger-image');
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
