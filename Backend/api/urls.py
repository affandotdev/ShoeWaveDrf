from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ProductViewSet, CartViewSet, OrderViewSet, WishlistViewSet,
    RegisterView, UserViewSet, AdminUserViewSet, CustomTokenObtainPairView,
    RazorpayCreateOrderView, RazorpayVerifyPaymentView,
    AdminOrderViewSet, AdminAnalyticsView,
    PasswordResetRequestOTPView, PasswordResetVerifyOTPView,ProductListCreateView, ProductDetailView, BlockAdminAPIView,TopSellingProductsView,
    CategoryListView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet,basename='product')
router.register(r'cart', CartViewSet,basename='cart')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'orders', OrderViewSet,basename='order')
router.register(r'admin/users', AdminUserViewSet, basename='admin-users')
router.register(r'admin/orders', AdminOrderViewSet, basename='admin-orders')
router.register(r'users', UserViewSet, basename='user')


urlpatterns = [
    # Specific routes BEFORE router (to prevent router from catching them)
    path('products/top-selling/', TopSellingProductsView.as_view(), name='top-selling-products'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Router URLs
    path('', include(router.urls)),
    
    # Other routes
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('payments/razorpay/create-order/', RazorpayCreateOrderView.as_view(), name='razorpay-create-order'),
    path('payments/razorpay/verify/', RazorpayVerifyPaymentView.as_view(), name='razorpay-verify'),
    path('admin/analytics/', AdminAnalyticsView.as_view(), name='admin-analytics'),
    path('password-reset/request-otp/', PasswordResetRequestOTPView.as_view(), name='password-reset-request-otp'),
    path('password-reset/verify-otp/', PasswordResetVerifyOTPView.as_view(), name='password-reset-verify-otp'),
    path('admins/block/<int:id>/', BlockAdminAPIView.as_view(), name='block-admin'),
    path('categories/', CategoryListView.as_view(), name='categories-list'),
]
