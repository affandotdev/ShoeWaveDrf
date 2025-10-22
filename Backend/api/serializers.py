from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, CartItem, Order, OrderItem, Wishlist

User = get_user_model()

# ---------------- Product Serializer ----------------
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


# ---------------- Cart Serializer ----------------
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

    def create(self, validated_data):
        product = validated_data.pop('product_id')  # DRF converts ID → Product instance
        return CartItem.objects.create(product=product, **validated_data)



# ---------------- Wishlist Serializer ----------------
class WishlistSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )
    product_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'product_details']

    def get_product_details(self, obj):
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'price': obj.product.price,
            'category': obj.product.category,
        }



# ---------------- OrderItem Serializer ----------------
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity']

# ---------------- Order Serializer ----------------
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'address', 'status', 'date', 'items']
        read_only_fields = ['user', 'date']


# ---------------- User Serializer ----------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'status', 'blocked']


# ---------------- Register Serializer ----------------
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
