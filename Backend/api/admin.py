from django.contrib import admin
from .models import Product, Wishlist, Order, User, PasswordResetToken


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price')
    search_fields = ('name', 'brand', 'category')
    list_filter = ('category', 'brand')

    def has_add_permission(self, request):
        return request.user.is_superuser or request.user.role == 'admin'

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'admin'

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'admin'

admin.site.register(Product, ProductAdmin)




class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'role', 'is_staff', 'is_superuser', 'blocked')
    list_filter = ('role', 'is_staff', 'blocked')
    search_fields = ('email', 'username')

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

admin.site.register(User, UserAdmin)





class WishlistAdmin(admin.ModelAdmin):

    list_display = ('user', 'product')
    search_fields = ('user__email', 'product__name')

    def has_add_permission(self, request):
        return False  
    
    def has_change_permission(self, request, obj=None):
        return False 

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

admin.site.register(Wishlist, WishlistAdmin)



class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'total', 'status', 'date')
    search_fields = ('user__email',)
    list_filter = ('status', 'date')

    def has_add_permission(self, request):
        return False  

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'admin'

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

admin.site.register(Order, OrderAdmin)


