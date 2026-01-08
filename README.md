# FraudShield - Fraud Detection Mobile App

A React + Ionic mobile application for detecting and preventing fraud through calls, SMS, links, and QR codes.

## Features

### 1. **Scam-Call Warning** 📞
- Real-time call analysis
- Detect fake bank calls, lottery scams, police impersonation
- Risk level assessment
- Call history tracking

### 2. **Scam-SMS Detection** 💬
- Analyze suspicious text messages
- Detect electricity bill scams, KYC phishing, lottery scams
- Pattern-based fraud detection
- SMS history

### 3. **Link-Safety Scanner** 🔗
- Check URLs before clicking
- Detect shortened URLs, fake bank domains, phishing sites
- SSL/HTTPS verification
- Real-time threat analysis

### 4. **QR-Code Safety Scanner** 📲
- Scan QR codes for tampering
- Verify UPI merchant QR codes
- GPay/PhonePe screenshot verification for shop owners
- Detect tampered payment QR codes

### 5. **Family-Help Mode** 👨‍👩‍👧‍👦
- Protect family members from scams
- Real-time alerts for family
- Multiple protection levels
- SOS alert system

### 6. **Interactive Education** 📚
- Quick fraud awareness lessons
- Interactive quizzes
- Real fraud stories with lessons
- Gamified learning experience

## Technology Stack

- **Frontend Framework**: React 18
- **Mobile Framework**: Ionic React 7
- **Build Tool**: Capacitor 5
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Icons**: Ionicons

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Android Studio (for Android builds)
- Java JDK 17

### Setup Steps

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Run in Browser (Development)**
```bash
npm start
```
This will start the app on `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
```

## Building Android APK

### First Time Setup

1. **Install Capacitor**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

2. **Add Android Platform**
```bash
npx cap add android
```

3. **Sync Web Assets**
```bash
npm run build
npx cap sync android
```

### Build APK

#### Method 1: Using Android Studio (Recommended)

1. Open the project in Android Studio:
```bash
npx cap open android
```

2. In Android Studio:
   - Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
   - Wait for build to complete
   - Click on "locate" link in notification to find the APK
   - APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Method 2: Using Command Line

1. Navigate to android directory:
```bash
cd android
```

2. Build using Gradle:
```bash
# For Debug APK
./gradlew assembleDebug

# For Release APK (requires signing)
./gradlew assembleRelease
```

3. Find APK at:
   - Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Release: `android/app/build/outputs/apk/release/app-release.apk`

### Generate Signed APK for Production

1. **Create Keystore**
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Update capacitor.config.json**
```json
{
  "android": {
    "buildOptions": {
      "keystorePath": "path/to/my-release-key.keystore",
      "keystorePassword": "your_keystore_password",
      "keystoreAlias": "my-key-alias",
      "keystoreAliasPassword": "your_alias_password"
    }
  }
}
```

3. **Build Release APK**
```bash
cd android
./gradlew assembleRelease
```

## Development Workflow

### Making Changes

1. Edit React components in `src/`
2. Test in browser: `npm start`
3. Build: `npm run build`
4. Sync to Android: `npx cap sync android`
5. Test on device/emulator: `npx cap run android`

### Live Reload on Device

```bash
# Run dev server
npm start

# In another terminal, run on device with live reload
npx cap run android --livereload --external
```

## API Configuration

Currently, the app uses **static JSON data** for all features. To connect to the backend API:

1. Open `src/services/api.js`
2. Change `USE_API` to `true`:
```javascript
const USE_API = true;
```
3. Update `API_BASE_URL` if needed:
```javascript
const API_BASE_URL = 'http://your-backend-url:3000/api';
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── data/           # Static JSON data
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── theme/          # Ionic theme variables
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── android/            # Android platform (after cap add android)
├── capacitor.config.json
└── package.json
```

## Features Implementation Status

✅ Dashboard with statistics
✅ Call Scanner with history
✅ SMS Scanner with history
✅ Link Safety Scanner
✅ QR Code Scanner
✅ Payment Screenshot Verifier
✅ Family Protection Mode
✅ Interactive Education Lessons
✅ Quiz System
✅ Real Fraud Stories
✅ Settings Page

## Future Enhancements (Phase 2)

- Real camera integration for QR scanning
- Actual phone call interception (requires system permissions)
- SMS reading permissions and auto-analysis
- OpenAI GPT-5.1 integration for AI-powered analysis
- Push notifications
- Background services
- Offline mode with local database

## Troubleshooting

### Build Errors

**Error: SDK location not found**
- Solution: Create `android/local.properties` with:
```
sdk.dir=/path/to/Android/Sdk
```

**Error: Java version**
- Solution: Install Java JDK 17 and set JAVA_HOME

**Error: Gradle build failed**
- Solution: Clear Gradle cache:
```bash
cd android
./gradlew clean
./gradlew build
```

### App Issues

**White screen on device**
- Check `capacitor.config.json` webDir is set to "build"
- Run `npx cap sync android` after build
- Check console logs in Android Studio Logcat

**API not working**
- Check backend server is running
- Update API_BASE_URL in `api.js`
- Check CORS settings in backend

## Testing

### Test on Browser
```bash
npm start
```

### Test on Android Emulator
1. Create AVD in Android Studio
2. Run:
```bash
npx cap run android
```

### Test on Physical Device
1. Enable USB debugging on device
2. Connect via USB
3. Run:
```bash
npx cap run android
```

## License

MIT

## Support

For issues and questions, please create an issue in the repository.



