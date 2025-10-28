from django.contrib import admin
from .models import Product, Wishlist, Order, User, PasswordResetToken, ContactMessage


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


class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read', 'replied')
    list_filter = ('is_read', 'replied', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'created_at')
    list_editable = ('is_read', 'replied')
    ordering = ('-created_at',)

    def has_add_permission(self, request):
        return False  # Contact messages come from users only

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'admin'

admin.site.register(ContactMessage, ContactMessageAdmin)