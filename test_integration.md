# Integration Test Guide

## Test the Fixed Wishlist, Cart, and Order System

### 1. Start Both Servers
```bash
# Terminal 1 - Django Backend
cd react-project/Backend
python manage.py runserver

# Terminal 2 - React Frontend  
cd react-project/Frontend
npm run dev
```

### 2. Test User Registration & Login
1. Go to `http://localhost:5173`
2. Register a new user
3. Login with credentials
4. Verify JWT tokens are stored in localStorage

### 3. Test Product Management
1. Navigate to Products page
2. Verify products load from Django backend
3. Check product images, names, and prices display correctly

### 4. Test Wishlist Functionality
1. Add products to wishlist (heart icon)
2. Go to Wishlist page
3. Verify products show with correct data (name, price, image)
4. Test "Move to Cart" button - should move item from wishlist to cart
5. Test "Remove" button - should remove item from wishlist

### 5. Test Cart Functionality
1. Add products to cart
2. Go to Cart page
3. Verify products show with correct data
4. Test quantity increase/decrease buttons
5. Test remove item button
6. Verify total calculation is correct

### 6. Test Order System
1. Go to Checkout page
2. Enter shipping address
3. Click "Place Order"
4. Verify order is created in Django backend
5. Verify cart is cleared after order
6. Check order success page shows correct details

### 7. Test JWT Token Refresh
1. Wait for access token to expire (or manually clear it)
2. Make an API call (try adding to cart)
3. Verify token is automatically refreshed
4. Check that request succeeds after refresh

## Expected Behavior

### ✅ Fixed Issues:
- **Wishlist to Cart**: Items now properly move from wishlist to cart
- **Order Creation**: Orders are now created using Django API
- **Data Structure**: Components handle nested product data correctly
- **JWT Authentication**: Auto-refresh tokens on 401 errors
- **Cart Management**: Real-time sync with Django backend

### 🔧 Key Changes Made:
1. **Wishlist Component**: Fixed to handle `item.product` nested structure
2. **Cart Component**: Updated to display nested product data
3. **Checkout Component**: Uses Django API for order creation
4. **Backend Order System**: Creates OrderItems from cart items
5. **JWT Configuration**: Added token refresh interceptor

### 🚀 How It Works Now:
1. **Wishlist → Cart**: Passes `item.product` data to `addToCart()`
2. **Order Creation**: Creates Order + OrderItems from cart items
3. **Data Display**: Uses `item.product?.name || item.name` fallback
4. **Token Refresh**: Automatic retry on 401 with new token

## Troubleshooting

### If wishlist items don't show:
- Check browser console for API errors
- Verify user is logged in
- Check Django backend is running

### If cart doesn't update:
- Check JWT token in localStorage
- Verify API calls are successful
- Check Django cart endpoint

### If orders fail:
- Check Django backend logs
- Verify cart items exist
- Check order creation endpoint

### If JWT refresh fails:
- Check refresh token in localStorage
- Verify Django JWT settings
- Check network tab for 401/403 errors

## Success Indicators:
- ✅ Wishlist items move to cart successfully
- ✅ Orders are created in Django database
- ✅ Cart is cleared after order
- ✅ JWT tokens refresh automatically
- ✅ All data displays correctly with nested structure

