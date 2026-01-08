# Install Java 17 - Quick Guide

## Why Java 17?
Your app uses **Capacitor 5.5.1**, which requires Java 17 or higher due to modern Java language features.

## Installation Steps

### Option 1: Eclipse Temurin 17 (Recommended - Free & Open Source)

1. **Download:**
   - Visit: https://adoptium.net/temurin/releases/?version=17
   - Select: **Windows x64 MSI Installer**
   - Click the download button

2. **Install:**
   - Run the downloaded `.msi` file
   - Follow the installation wizard
   - ✅ Check "Set JAVA_HOME variable" option
   - ✅ Check "Add to PATH" option
   - Complete the installation

3. **Verify Installation:**
   Open PowerShell or Command Prompt and run:
   ```bash
   java -version
   ```
   You should see: `openjdk version "17.0.x"`

### Option 2: Oracle JDK 17 (Official)

1. **Download:**
   - Visit: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
   - Download: **Windows x64 Installer**

2. **Install:**
   - Run the installer
   - Use default installation path: `C:\Program Files\Java\jdk-17`
   - Complete the installation

3. **Verify Installation:**
   ```bash
   java -version
   ```

## After Installing Java 17

Once Java 17 is installed, simply run the build script:

```bash
cd d:\Lakshmi\rajeshnewapp\frontend
.\build-apk.bat
```

The script will:
1. ✅ Automatically detect Java 17
2. ✅ Build your React app
3. ✅ Sync to Android
4. ✅ Generate the APK file

## APK Location

After successful build, find your APK at:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

## Troubleshooting

**If Java 17 is not detected:**
1. Make sure Java 17 is installed in one of these locations:
   - `C:\Program Files\Java\jdk-17`
   - `C:\Program Files\Eclipse Adoptium\jdk-17.x.x.x-hotspot`
   - `C:\Program Files\Eclipse Foundation\jdk-17`

2. Or manually set JAVA_HOME before running the script:
   ```bash
   $env:JAVA_HOME="C:\Program Files\Java\jdk-17"
   .\build-apk.bat
   ```

## Need Help?
- Eclipse Temurin Support: https://adoptium.net/support/
- Oracle Java Documentation: https://docs.oracle.com/en/java/javase/17/



