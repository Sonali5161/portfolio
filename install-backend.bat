@echo off
echo ========================================
echo Portfolio Backend Installation
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/3] Creating environment file...
if not exist .env (
    copy .env.example .env
    echo Created .env file. Please edit it with your email credentials.
) else (
    echo .env file already exists.
)
echo.

echo [3/3] Creating frontend environment file...
cd ..
if not exist .env (
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo Created frontend .env file.
) else (
    echo Frontend .env file already exists.
)
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit server/.env with your Gmail credentials
echo 2. Get Gmail App Password from: https://myaccount.google.com/apppasswords
echo 3. Start backend: cd server ^&^& npm run dev
echo 4. Start frontend: npm run dev
echo.
echo See setup-backend.md for detailed instructions.
echo.
pause
