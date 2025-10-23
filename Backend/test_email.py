"""
Test Email Configuration Script

This script tests if your email configuration is working correctly.
Run this before testing the password reset functionality.

Usage:
    python test_email.py recipient@example.com
"""

import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings


def test_email(recipient_email):
    """Test sending an email"""
    
    print("=" * 60)
    print("EMAIL CONFIGURATION TEST")
    print("=" * 60)
    
    # Check configuration
    print(f"\n📧 Email Backend: {settings.EMAIL_BACKEND}")
    print(f"📧 Email Host: {settings.EMAIL_HOST}")
    print(f"📧 Email Port: {settings.EMAIL_PORT}")
    print(f"📧 Use TLS: {settings.EMAIL_USE_TLS}")
    print(f"📧 From Email: {settings.EMAIL_HOST_USER or 'NOT SET'}")
    
    if not settings.EMAIL_HOST_USER:
        print("\n❌ ERROR: EMAIL_HOST_USER is not set!")
        print("\nPlease set environment variables:")
        print("  Windows (PowerShell): $env:EMAIL_HOST_USER = 'your.email@gmail.com'")
        print("  Windows (PowerShell): $env:EMAIL_HOST_PASSWORD = 'your-app-password'")
        print("\n  Or update settings.py directly (not recommended for production)")
        return False
    
    if not settings.EMAIL_HOST_PASSWORD:
        print("\n❌ ERROR: EMAIL_HOST_PASSWORD is not set!")
        print("\nPlease set environment variables:")
        print("  Windows (PowerShell): $env:EMAIL_HOST_PASSWORD = 'your-app-password'")
        return False
    
    print(f"\n📤 Sending test email to: {recipient_email}")
    print("Please wait...\n")
    
    try:
        send_mail(
            subject='Test Email - Password Reset Setup',
            message='''Hello!

This is a test email from your Django E-Commerce application.

If you're receiving this, your email configuration is working correctly!

You can now use the password reset functionality.

Best regards,
E-Commerce Team
''',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
        
        print("✅ SUCCESS! Email sent successfully!")
        print(f"\n📬 Check your inbox at: {recipient_email}")
        print("   (Don't forget to check spam/junk folder)")
        print("\n" + "=" * 60)
        return True
        
    except Exception as e:
        print(f"❌ ERROR: Failed to send email!")
        print(f"\nError details: {str(e)}")
        print("\n" + "=" * 60)
        print("\nTroubleshooting tips:")
        print("1. Make sure you're using a Gmail App Password, not your regular password")
        print("2. Enable 2-Step Verification in your Google Account")
        print("3. Generate an App Password at: https://myaccount.google.com/apppasswords")
        print("4. Check if 'Less secure app access' is enabled (if using older Gmail)")
        print("5. Verify your internet connection")
        print("=" * 60)
        return False


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_email.py recipient@example.com")
        print("\nExample: python test_email.py your.email@gmail.com")
        sys.exit(1)
    
    recipient = sys.argv[1]
    
    # Validate email format
    if '@' not in recipient or '.' not in recipient:
        print("❌ Invalid email address format!")
        sys.exit(1)
    
    success = test_email(recipient)
    sys.exit(0 if success else 1)
