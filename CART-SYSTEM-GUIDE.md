# Shopping Cart System - User Guide

## Overview
A complete shopping cart system with glassmorphic design that allows users to add multiple products and checkout with all items at once.

## Features Implemented

### 🛒 Cart Button
- **Location**: Top right of the header, next to the hamburger menu
- **Design**: Glassmorphic style with backdrop blur effect
- **Badge**: Shows the total number of items in cart
- **Animation**: Pulses when items are added

### 🎨 Cart Drawer
- **Style**: Slides in from the right with glassmorphism effect
- **Background**: Dark translucent with blur effect
- **Width**: 480px on desktop, full width on mobile
- **Animation**: Smooth slide-in with bounce effect

### 📦 Cart Features

#### Add to Cart
- Click any plan button (30 Day or 100 Day Challenge)
- Product is added to cart automatically
- Cart drawer opens showing the item
- Cart badge updates with item count

#### View Cart Items
Each item displays:
- Product image
- Product title
- Price
- Quantity controls (+/-)
- Remove button

#### Manage Quantities
- **Plus button**: Increase quantity
- **Minus button**: Decrease quantity (removes if quantity becomes 0)
- **Remove button**: Instantly remove item from cart

#### Checkout
- Shows total amount at the bottom
- "Free shipping on all orders" message
- **Proceed to Checkout** button redirects to Shopify checkout with all items

### 💾 Persistence
- Cart data is saved to localStorage
- Cart persists across page refreshes
- Cart data stored as: `fiber_x_cart`

### 📱 Mobile Responsive

#### Mobile (768px and below)
- Cart panel takes full width
- Smaller cart button and icons
- Adjusted spacing and padding
- Touch-friendly buttons

#### Small Mobile (480px and below)
- Cart items display in vertical layout
- Full-width product images
- Remove button positioned at top-right

## How It Works

### User Flow

1. **Browse Products**
   - User views the 30 Day Plan and 100 Day Challenge

2. **Add to Cart**
   - Click "Try the 30 Day Plan" or "Take the 100 Day Challenge"
   - Button shows "Adding..." while loading
   - Cart drawer automatically opens
   - Item appears in cart with animation

3. **Add Multiple Items**
   - User can add same product multiple times (increases quantity)
   - User can add different products
   - Each item shows separately in cart

4. **Manage Cart**
   - Adjust quantities with +/- buttons
   - Remove items with trash icon
   - View running total at bottom

5. **Checkout**
   - Click "Proceed to Checkout"
   - Redirected to Shopify checkout
   - All items and quantities are transferred

### Technical Implementation

#### Cart Storage
```javascript
// Cart data structure
{
  variantId: "shopify-variant-id",
  productId: "shopify-product-id",
  title: "Product Name",
  price: 2499,
  image: "image-url",
  quantity: 1
}
```

#### Key Classes
- `ShoppingCart`: Manages cart state, UI updates, and localStorage
- `ShopifyIntegration`: Handles Shopify API calls and checkout creation

#### Cart Operations
- `addItem()`: Add product to cart or increase quantity
- `removeItem()`: Remove product from cart
- `updateQuantity()`: Change product quantity
- `getTotal()`: Calculate total price
- `getTotalItems()`: Count total items
- `updateCartUI()`: Refresh cart display

## Styling Features

### Glassmorphism Effect
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.18);
```

### Animations
- **Scale In**: Cart badge appears
- **Pulse**: Cart button when item added
- **Slide In**: Cart items appear
- **Slide From Right**: Cart drawer opens

### Color Scheme
- Primary: `#d58b2a` (Gold/Bronze)
- Secondary: `#e7a23c` (Light Gold)
- Background: `rgba(20, 20, 20, 0.95)` (Dark with opacity)
- Borders: `rgba(255, 255, 255, 0.1)` (Subtle white)

## Browser Compatibility

✅ Chrome/Edge (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Mobile Browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- `-webkit-backdrop-filter` for Safari
- Standard `backdrop-filter` for other browsers

## Testing Checklist

- [ ] Cart button visible in header
- [ ] Cart badge shows correct count
- [ ] Add 30 Day Plan to cart
- [ ] Add 100 Day Challenge to cart
- [ ] Add multiple of same product (quantity increases)
- [ ] Increase quantity with + button
- [ ] Decrease quantity with - button
- [ ] Remove item with trash icon
- [ ] Total price updates correctly
- [ ] Cart persists on page refresh
- [ ] Checkout button works
- [ ] Redirects to Shopify checkout with all items
- [ ] Mobile responsive (test on phone)
- [ ] Cart drawer closes on overlay click
- [ ] Cart drawer closes on X button
- [ ] Cart drawer closes on ESC key

## Customization Options

### Change Cart Width
```css
.cart-panel {
    max-width: 480px; /* Change this value */
}
```

### Change Glassmorphism Intensity
```css
.cart-button {
    background: rgba(255, 255, 255, 0.1); /* Adjust opacity */
    backdrop-filter: blur(10px); /* Adjust blur amount */
}
```

### Change Colors
```css
:root {
    --color-primary: #d58b2a;
    --color-primary-light: #e7a23c;
}
```

## Troubleshooting

### Cart button not visible
- Check if HTML structure is correct
- Verify CSS is loaded
- Check browser console for errors

### Items not adding to cart
- Verify Shopify products are configured
- Check browser console for API errors
- Ensure Shopify SDK is loaded

### Cart not persisting
- Check localStorage is enabled
- Verify data structure is correct
- Check browser privacy settings

### Checkout not working
- Verify Shopify credentials in config
- Check product handles match Shopify
- Ensure variant IDs are correct

## Future Enhancements

Potential features to add:
- [ ] Product recommendations in cart
- [ ] Discount code input
- [ ] Save cart for later
- [ ] Cart animations (shake on error)
- [ ] Product variants (size, color)
- [ ] Gift message option
- [ ] Estimated delivery date
- [ ] Related products suggestions

## Support

For issues or questions:
- Check browser console for errors
- Verify Shopify configuration
- Test on different browsers/devices
- Check network tab for API calls

---

**Last Updated**: October 28, 2025
**Version**: 1.0.0

