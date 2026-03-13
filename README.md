# Aplex - Cryptocurrency Wallet App

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.81.4-blue)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey)

**A comprehensive cryptocurrency wallet application built with React Native**

</div>

---

## 📱 Overview

Aplex is a full-featured cryptocurrency wallet application that enables users to manage their digital assets securely. Built with React Native, it provides a seamless cross-platform experience for both Android and iOS devices.

## ✨ Features

### Core Functionality
- **💰 Multi-Currency Support** - Manage Bitcoin, Ethereum, Solana, and other cryptocurrencies
- **🔄 Swap & Exchange** - Swap between different cryptocurrencies directly in the app
- **📤 Send & Receive** - Quick and secure crypto transactions with QR code support
- **📊 Transaction History** - Track all your past transactions in one place
- **💎 SOL Staking** - Stake your Solana tokens and earn rewards

### Security & Authentication
- **🔐 Secure Authentication** - Email/password login with biometric support
- **🔒 Encrypted Storage** - Local data encryption using AsyncStorage
- **🛡️ Security Settings** - Customizable security preferences and 2FA support

### User Experience
- **🌍 Multi-Language Support** - Internationalization for global users
- **🎨 Beautiful UI** - Modern design with custom fonts (Inter, Roboto, DM Sans)
- **✨ Smooth Animations** - Lottie animations for engaging interactions
- **📱 Responsive Design** - Optimized for various screen sizes
- **🔔 Push Notifications** - Real-time alerts for transactions and updates

### Additional Features
- **📱 Onboarding Flow** - Intuitive first-time user experience
- **👤 User Profile** - Manage account settings and preferences
- **🌙 Custom Navigation** - Drawer and bottom tab navigation
- **📄 PDF Generation** - Generate transaction receipts and reports

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native 0.81.4 |
| **Language** | JavaScript / TypeScript |
| **UI Library** | React Native Vector Icons, Lucide React Native |
| **Navigation** | React Navigation 7.x |
| **State Management** | React Context API |
| **Storage** | AsyncStorage |
| **Animations** | Lottie React Native |
| **Gestures** | React Native Gesture Handler |
| **Media** | React Native Image Picker, Camera Roll |
| **File System** | React Native Blob Util, React Native FS |
| **Charts** | React Native SVG |

## 📦 Key Dependencies

```json
{
  "react-native": "0.81.4",
  "react": "19.1.0",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/stack": "^7.4.9",
  "lottie-react-native": "^7.3.4",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "react-native-svg": "^15.13.0",
  "react-native-vector-icons": "^10.3.0"
}
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tahasaif3/aplex-react-native-app.git
   cd aplex-react-native-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS only - Install CocoaPods dependencies**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

6. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## 📱 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro development server |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run Jest test suite |
| `npm run prebuild` | Bundle assets for Android production |
| `npm run build` | Build Android APK (debug) |
| `npm run clear` | Clean Android build cache |

## 📁 Project Structure

```
Aplex/
├── src/
│   ├── screens/          # All app screens (Onboarding, Login, Home, etc.)
│   ├── components/       # Reusable UI components
│   ├── navigator/        # Navigation configuration
│   ├── context/          # React Context providers (WalletContext)
│   ├── assets/           # Images, fonts, and static resources
│   └── config/           # App configuration files
├── android/              # Android native project
├── ios/                  # iOS native project
├── assets/               # App fonts and resources
├── __tests__/            # Jest test files
└── package.json          # Project dependencies
```

## 🎨 Custom Fonts

The app includes the following font families:
- **Inter** - Modern sans-serif for UI text
- **Roboto** - Clean and readable font
- **DM Sans** - Elegant font for headings
- **Poppins** - Geometric sans-serif
- **Alike Angular** - Decorative font

## 🔧 Configuration

### Environment Setup

Make sure you have configured:
- Android SDK and build tools
- Java Development Kit (JDK 17+)
- CocoaPods (for iOS)

### Permissions

The app requires the following permissions:
- Camera (for QR code scanning)
- Storage (for saving receipts)
- Biometric authentication
- Network access
- Location (optional, for nearby features)

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## 📸 Screenshots

| Onboarding | Home | Wallet |
|------------|------|--------|
| ![Onboarding](./assets/screenshots/onboarding.png) | ![Home](./assets/screenshots/home.png) | ![Wallet](./assets/screenshots/wallet.png) |

| Swap | Staking | Profile |
|------|---------|---------|
| ![Swap](./assets/screenshots/swap.png) | ![Staking](./assets/screenshots/staking.png) | ![Profile](./assets/screenshots/profile.png) |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👨‍💻 Author

**Aplex Team**

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - The framework that makes it all possible
- [React Navigation](https://reactnavigation.org/) - Smooth navigation experience
- [Lottie](https://airbnb.io/lottie/) - Beautiful animations
- [Lucide Icons](https://lucide.dev/) - Clean and consistent icons

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Contact: [Your Email]

---

<div align="center">

**Made with ❤️ using React Native**

⭐ Star this repo if you find it helpful!

</div>
