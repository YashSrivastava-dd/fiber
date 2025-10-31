# Fiber X Landing Page

A luxurious, cinematic landing page for the Fiber X product with integrated Shopify e-commerce functionality.

## Features

- **Dark Luxury Theme**: Black background (#000) with elegant orange-gold accents
- **Floating Particles**: Smooth particle animation system using Canvas API
- **Responsive Design**: Mobile-friendly with stacked layout on smaller screens
- **Smooth Animations**: Fade-in effects and gentle hover interactions
- **Shopify Integration**: Full e-commerce with cart, checkout, and order management
- **Accessibility**: Reduced motion support and proper focus states
- **Performance Optimized**: Efficient particle system and animation pausing

## 🛒 E-Commerce Integration

This website is integrated with **Shopify Buy Button** for seamless purchasing:

- ✅ Add to cart functionality
- ✅ Secure Shopify checkout
- ✅ All orders managed in Shopify dashboard
- ✅ Automatic email notifications
- ✅ Payment gateway integration (Razorpay, PayPal, etc.)
- ✅ Shipping and delivery tracking

### Quick Setup

1. **Follow the setup guide**: See `SHOPIFY-SETUP-GUIDE.md` for complete instructions
2. **Configure credentials**: Update the Shopify config in `index.html` (line 563)
3. **Reference**: Check `shopify-config-example.js` for configuration format

### What You Need from Shopify

- Store domain (e.g., `your-store.myshopify.com`)
- Storefront API access token
- Product IDs for both plans (30 Day & 100 Day)

## File Structure

```
/fiberx
├── index.html                    # Main HTML structure with Shopify SDK
├── style.css                     # Styles, animations, and Shopify cart styling
├── script.js                     # Particle system, interactions, and Shopify integration
├── SHOPIFY-SETUP-GUIDE.md       # Complete Shopify setup instructions
├── shopify-config-example.js    # Configuration template and reference
├── README.md                     # This file
├── fonts/                        # Custom fonts
└── images/                       # Product and hero images
```

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Animations, gradients, responsive design
- **JavaScript**: Canvas-based particle system, smooth interactions
- **Shopify Buy Button SDK**: E-commerce integration
- **Shopify Storefront API**: Product and checkout management
- **SVG**: Scalable product images

## Browser Support

- Modern browsers with Canvas API support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Performance Features

- Hardware acceleration for animations
- Reduced particle count on mobile devices
- Animation pausing when tab is not visible
- Optimized for 60fps smooth animations

## Accessibility

- WCAG compliant color contrasts
- Keyboard navigation support
- Screen reader friendly
- Reduced motion preferences respected

## Usage

### Development
Simply open `index.html` in a web browser. For best results, use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000`

### Production
1. Complete Shopify setup (see `SHOPIFY-SETUP-GUIDE.md`)
2. Update configuration in `index.html`
3. Upload to your web host (current hosting for fiberisefit.com)
4. Test the purchase flow
5. Monitor orders in Shopify dashboard

## Order Management

All orders placed through the website will appear in your **Shopify Admin Dashboard**:

### Viewing Orders
- URL: `https://your-store-name.myshopify.com/admin/orders`
- Each order includes:
  - Customer name, email, phone
  - Billing address
  - Shipping address
  - Payment status
  - Order items and quantities
  - Total amount paid

### Processing Orders
1. View order details in Shopify admin
2. Prepare product for shipping
3. Mark order as "Fulfilled" in Shopify
4. Add tracking number (optional)
5. Customer receives automatic email notification

### Customer Data
- All customer information is stored in Shopify
- Access via: Shopify Admin → Customers
- GDPR compliant data management
- Export options available

## Customization

- Particle count can be adjusted in `script.js`
- Colors and gradients can be modified in `style.css`
- Product images can be updated in `images/` folder
- Shopify cart styling in `style.css` (lines 3783+)
- Button behaviors in `script.js` (ShopifyIntegration class)
