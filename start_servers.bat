@echo off
echo Starting Django Backend and React Frontend...

echo.
echo Starting Django Backend on http://127.0.0.1:8000
start cmd /k "cd react-project\Backend && python manage.py runserver"

echo.
echo Starting React Frontend on http://localhost:5173
start cmd /k "cd react-project\Frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo.
pause


