@echo off
echo Setting up SaveScape...
echo.
echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    echo Then restart this script.
    pause
    exit /b 1
)

echo.
echo Checking Git...
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git not found!
    echo Please install Git from https://git-scm.com/
    echo Then restart this script.
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Setup complete! You can now run SaveScape with:
echo   npm run electron-dev
echo.
echo Or use the start-dev.bat file for easier launching.
pause
