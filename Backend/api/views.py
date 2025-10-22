from rest_framework import viewsets, generics, permissions, status
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from .models import Product, CartItem, Order, OrderItem, Wishlist
from .serializers import (
    ProductSerializer, CartItemSerializer, WishlistSerializer,
    OrderSerializer, RegisterSerializer, UserSerializer
)

User = get_user_model()

# -----------------------------
# Custom Permission
# -----------------------------
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and (request.user.role == 'admin' or request.user.is_superuser)

# -----------------------------
# User View (read-only)
# -----------------------------
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Allow admin users to see all users, regular users only see themselves
        if self.request.user.role == 'admin' or self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

# -----------------------------
# Admin User Management ViewSet
# -----------------------------
class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only admin users can access this viewset
        if self.request.user.role == 'admin' or self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.none()

    def update(self, request, *args, **kwargs):
        # Allow updating user fields like blocked status
        return super().update(request, *args, **kwargs)

# -----------------------------
# Register View
# -----------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)

# -----------------------------
# Custom Login View
# -----------------------------
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Get user from the token
            user = User.objects.get(email=request.data.get('email'))
            response.data['user'] = UserSerializer(user).data
        return response

# -----------------------------
# Product CRUD
# -----------------------------
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['get'])
    def category(self, request):
        category = request.query_params.get('category')
        products = Product.objects.filter(category__iexact=category)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

# -----------------------------
# Cart View
# -----------------------------
class CartViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# -----------------------------
# Wishlist ViewSet
# -----------------------------
class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # DRF automatically converts product ID to Product instance
        serializer.save(user=self.request.user)


# -----------------------------
# Order View
# -----------------------------
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        
        # Get cart items for this user
        cart_items = CartItem.objects.filter(user=self.request.user)
        
        # Create order items from cart items
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity
            )
        
        # Clear cart after creating order
        cart_items.delete()
