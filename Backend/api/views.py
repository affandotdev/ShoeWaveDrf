from rest_framework import viewsets, generics, permissions, status
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.conf import settings
import razorpay
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Sum, Count, Q
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import User
from .models import PasswordResetOTP
from django.contrib.auth import get_user_model
import random
from django.conf import settings
from .serializers import ProductSerializer
from .models import Category
from .serializers import CategorySerializer

from .models import Product, CartItem, Order, OrderItem, Wishlist
from .serializers import (
    ProductSerializer, CartItemSerializer, WishlistSerializer,
    OrderSerializer, UserSerializer,
)

User = get_user_model()




class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and (request.user.role == 'admin' or request.user.is_superuser)

class IsAdminOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role == 'admin' or request.user.is_superuser




class UserViewSet(viewsets.ReadOnlyModelViewSet):   
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
     
        if self.request.user.role == 'admin' or self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)




class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminOnly]

    def get_queryset(self):
       
        if self.request.user.role == 'admin' or self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.none()

    def update(self, request, *args, **kwargs):
     
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
    
        return super().partial_update(request, *args, **kwargs)





class RegisterView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([username, email, password]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)




class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            
            user = User.objects.get(email=request.data.get('email'))
            response.data['user'] = UserSerializer(user).data
        return response




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




class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]




class CartViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    




class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user)





class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product')

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        
     
        cart_items = CartItem.objects.filter(user=self.request.user)
      
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity
            )        
        cart_items.delete()





class AdminOrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().prefetch_related('items__product')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsAdminOnly]

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)




    
class PasswordResetRequestOTPView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            email = request.data.get('email')
            if not email:
                return Response({'error': 'Email is required'}, status=400)

            user = User.objects.get(email=email)
            otp = f"{random.randint(100000, 999999)}"

            
            PasswordResetOTP.objects.create(user=user, otp=otp)

            send_mail(
                'Your OTP for password reset',
                f'Your OTP is: {otp}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return Response({'message': 'OTP sent successfully'}, status=200)

        except Exception as e:
            print("Error in request-otp:", e)
            return Response({'error': str(e)}, status=500)


class PasswordResetVerifyOTPView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not email or not otp or not new_password:
            return Response({'error': 'Missing parameters'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            otp_obj = PasswordResetOTP.objects.filter(user=user, otp=otp).latest('created_at')
        except PasswordResetOTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_obj.is_expired():
            return Response({'error': 'OTP expired'}, status=status.HTTP_400_BAD_REQUEST)

        
        user.set_password(new_password)
        user.save()

       
        otp_obj.delete()
        return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)    





class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer





class TopSellingProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Get top-selling products based on order quantity (excluding cancelled orders)
        products_with_sales = Product.objects.annotate(
            total_sold=Sum(
                'orderitem__quantity',
                filter=~Q(orderitem__order__status='Cancelled')
            )
        ).filter(total_sold__isnull=False).order_by('-total_sold')[:3]
        
        return products_with_sales    





class AdminAnalyticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsAdminOnly]

    def get(self, request, *args, **kwargs):
        total_sales = Order.objects.aggregate(total=Sum('total'))['total'] or 0
        total_orders = Order.objects.count()
        total_users = User.objects.count()
        total_products = Product.objects.count()
        total_admins = User.objects.filter(Q(role='admin') | Q(is_superuser=True)).count()

        
        orders = Order.objects.all().order_by('date')
        monthly = {}
        for o in orders:
            key = o.date.strftime('%b')
            monthly[key] = float(monthly.get(key, 0)) + float(o.total)
        monthly_sales = [{ 'month': m, 'sales': s } for m, s in monthly.items()]

        status_counts = dict(Order.objects.values_list('status').annotate(cnt=Count('status')))

      
        top = {}
        for oi in OrderItem.objects.select_related('product').all():
            name = oi.product.name
            top[name] = top.get(name, 0) + oi.quantity
        top_products = [ { 'name': k, 'qty': v } for k, v in sorted(top.items(), key=lambda kv: kv[1], reverse=True)[:5] ]

        return Response({
            'totals': {
                'total_sales': float(total_sales),
                'total_orders': total_orders,
                'total_users': total_users,
                'total_products': total_products,
                'total_admins': total_admins,
            },
            'monthly_sales': monthly_sales,
            'status_counts': status_counts,
            'top_products': top_products,
        })






class BlockAdminAPIView(APIView):
    def post(self, request, admin_id):
        current_user = request.user
        if current_user.id == admin_id:
            return Response({"detail": "You cannot block yourself."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            admin_to_block = User.objects.get(id=admin_id)
            admin_to_block.is_active = False
            admin_to_block.save()
            return Response({"detail": "Admin blocked successfully."})
        except User.DoesNotExist:
            return Response({"detail": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
        




@method_decorator(csrf_exempt, name='dispatch')
class RazorpayCreateOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'INR')
        if not amount:
            return Response({"detail": "amount is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            
            int_amount = int(float(amount) * 100)
            order = client.order.create(dict(amount=int_amount, currency=currency, payment_capture=1))
            return Response({
                'order_id': order.get('id'),
                'amount': order.get('amount'),
                'currency': order.get('currency'),
                'key_id': settings.RAZORPAY_KEY_ID
            })
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@method_decorator(csrf_exempt, name='dispatch')
class RazorpayVerifyPaymentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            params_dict = {
                'razorpay_order_id': request.data.get('razorpay_order_id'),
                'razorpay_payment_id': request.data.get('razorpay_payment_id'),
                'razorpay_signature': request.data.get('razorpay_signature'),
            }

            if not all(params_dict.values()):
                return Response({"detail": "Missing payment verification parameters"}, status=status.HTTP_400_BAD_REQUEST)

            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            client.utility.verify_payment_signature(params_dict)
            return Response({"verified": True})
        except razorpay.errors.SignatureVerificationError:
            return Response({"verified": False, "detail": "Signature verification failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"verified": False, "detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)        
        