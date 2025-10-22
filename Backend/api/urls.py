from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ProductViewSet, CartViewSet, OrderViewSet, WishlistViewSet,
    RegisterView, UserViewSet, AdminUserViewSet, CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet)
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'orders', OrderViewSet)
router.register(r'users', AdminUserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
