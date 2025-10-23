@echo off
REM Password Reset Setup Script for Windows
REM This script helps you configure email settings for password reset

echo ============================================
echo PASSWORD RESET - EMAIL CONFIGURATION SETUP
echo ============================================
echo.

REM Check if running in Backend directory
if not exist "manage.py" (
    echo ERROR: Please run this script from the Backend directory!
    echo Current directory: %cd%
    echo.
    echo Usage:
    echo   cd Backend
    echo   setup_email.bat
    pause
    exit /b 1
)

echo This script will help you configure Gmail for password reset emails.
echo.
echo PREREQUISITES:
echo 1. You need a Gmail account
echo 2. 2-Step Verification must be enabled
echo 3. You need to generate a Gmail App Password
echo.
echo Steps to get Gmail App Password:
echo   1. Go to: https://myaccount.google.com/
echo   2. Click Security - 2-Step Verification (enable if needed)
echo   3. Click Security - App passwords
echo   4. Select 'Mail' and generate
echo   5. Copy the 16-character password
echo.

set /p EMAIL_USER="Enter your Gmail address (e.g., your.email@gmail.com): "
echo.
set /p EMAIL_PASS="Enter your Gmail App Password (16 characters): "
echo.

REM Set environment variables for current session
set EMAIL_HOST_USER=%EMAIL_USER%
set EMAIL_HOST_PASSWORD=%EMAIL_PASS%

echo ============================================
echo CONFIGURATION COMPLETE
echo ============================================
echo.
echo Environment variables set for current session:
echo   EMAIL_HOST_USER = %EMAIL_USER%
echo   EMAIL_HOST_PASSWORD = ****************
echo.
echo NOTE: These variables are only valid for this terminal session.
echo       You need to set them again if you close the terminal.
echo.
echo NEXT STEPS:
echo   1. Test email configuration:
echo      python test_email.py %EMAIL_USER%
echo.
echo   2. If test succeeds, start the server:
echo      python manage.py runserver
echo.

set /p TEST_EMAIL="Would you like to test email configuration now? (y/n): "
if /i "%TEST_EMAIL%"=="y" (
    echo.
    echo Testing email configuration...
    python test_email.py %EMAIL_USER%
)

echo.
echo For permanent setup, see PASSWORD_RESET_SETUP.md
echo.
pause
