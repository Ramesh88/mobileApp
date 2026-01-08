@echo off
echo ========================================
echo   FraudShield APK Build Script
echo ========================================
echo.

echo Step 1: Building React app...
call npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)
echo ✓ Build successful!
echo.

echo Step 2: Syncing to Android...
call npx cap sync android
if errorlevel 1 (
    echo Sync failed!
    pause
    exit /b 1
)
echo ✓ Sync successful!
echo.

echo Step 3: Building APK...
cd android
set JAVA_HOME=C:\Program Files\Java\jdk-17
call gradlew.bat clean assembleDebug
if errorlevel 1 (
    echo.
    echo ========================================
    echo APK Build Failed!
    echo ========================================
    echo.
    echo This might be due to:
    echo 1. Android SDK licenses not accepted
    echo 2. Missing Android SDK components
    echo 3. Gradle build errors
    echo.
    echo Check the error messages above for details.
    cd ..
    pause
    exit /b 1
)

cd ..
echo.
echo ========================================
echo APK Built Successfully!
echo ========================================
echo.
echo Your APK is located at:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause




