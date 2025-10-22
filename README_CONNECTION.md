# Backend-Frontend Connection Setup

## Overview
Your Django backend and React frontend are now properly connected! Here's what has been configured:

## Backend (Django) Configuration ✅
- **CORS**: Configured to allow all origins for development
- **JWT Authentication**: Set up with SimpleJWT
- **API Endpoints**: RESTful API with proper serializers
- **Media Files**: Configured for product images
- **Database**: SQLite (ready for production upgrade)

## Frontend (React) Configuration ✅
- **Axios**: Configured to point to Django backend (`http://127.0.0.1:8000/api/`)
- **Authentication**: Updated to use Django JWT tokens
- **Cart**: Connected to Django CartItem model
- **Wishlist**: Connected to Django Wishlist model
- **API Calls**: All updated to use Django REST API

## API Endpoints Available

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login (returns JWT tokens + user data)
- `POST /api/token/refresh/` - Refresh JWT token

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create product (admin only)
- `PUT /api/products/{id}/` - Update product (admin only)
- `DELETE /api/products/{id}/` - Delete product (admin only)

### Cart
- `GET /api/cart/` - Get user's cart items
- `POST /api/cart/` - Add item to cart
- `PATCH /api/cart/{id}/` - Update cart item quantity
- `DELETE /api/cart/{id}/` - Remove item from cart

### Wishlist
- `GET /api/wishlist/` - Get user's wishlist
- `POST /api/wishlist/` - Add item to wishlist
- `DELETE /api/wishlist/{id}/` - Remove item from wishlist

### Orders
- `GET /api/orders/` - Get user's orders
- `POST /api/orders/` - Create new order

### Users
- `GET /api/users/` - List users (authenticated)
- `GET /api/users/{id}/` - Get user details

## How to Start Both Servers

### Option 1: Use the Batch File (Windows)
```bash
# Double-click start_servers.bat
# This will start both Django and React servers
```

### Option 2: Manual Start

#### Start Django Backend:
```bash
cd react-project/Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Start React Frontend:
```bash
cd react-project/Frontend
npm install
npm run dev
```

## Testing the Connection

1. **Backend**: Visit `http://127.0.0.1:8000/api/` - should show API endpoints
2. **Frontend**: Visit `http://localhost:5173` - should load the React app
3. **Test Registration**: Try registering a new user
4. **Test Login**: Try logging in with credentials
5. **Test Cart**: Add products to cart (requires login)
6. **Test Wishlist**: Add products to wishlist (requires login)

## Key Changes Made

### Backend Changes:
1. ✅ CORS configured for frontend communication
2. ✅ JWT authentication setup
3. ✅ Custom login view that returns user data
4. ✅ Fixed serializers for proper API responses
5. ✅ Media file configuration

### Frontend Changes:
1. ✅ Updated AuthContext to use Django API
2. ✅ Updated CartContext to sync with Django backend
3. ✅ Updated WishlistContext to sync with Django backend
4. ✅ JWT token handling in axios interceptors
5. ✅ Proper error handling for API calls

## Database Setup

The backend uses SQLite by default. To set up the database:

```bash
cd react-project/Backend
python manage.py migrate
python manage.py createsuperuser  # Optional: create admin user
```

## Production Considerations

For production deployment:
1. Change `DEBUG = False` in settings.py
2. Set up proper database (PostgreSQL recommended)
3. Configure proper CORS origins
4. Set up static file serving
5. Use environment variables for sensitive data

## Troubleshooting

### Common Issues:
1. **CORS Error**: Make sure Django backend is running on port 8000
2. **Authentication Error**: Check if JWT tokens are being stored properly
3. **API 404**: Verify Django server is running and URLs are correct
4. **Database Error**: Run `python manage.py migrate` to set up database

### Check Connection:
- Backend API: `http://127.0.0.1:8000/api/`
- Frontend: `http://localhost:5173`
- Django Admin: `http://127.0.0.1:8000/admin/`

Your backend and frontend are now fully connected! 🎉


