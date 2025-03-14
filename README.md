# NurseApp

A mobile application designed for senior citizens to easily request nursing services, schedule appointments, and manage their healthcare needs.

## Overview

NurseApp is a user-friendly mobile application built with React Native, specifically designed for senior citizens. The app features large text, simple navigation, and clear visual elements to ensure accessibility for older users. It allows seniors to request nursing services, schedule appointments, view nurse profiles, and manage their healthcare information.

## Features

- **User Authentication**: Secure login and registration system
- **Nurse Request System**: Easy-to-use interface for requesting nursing services
- **Emergency Assistance**: Quick access to emergency nursing services
- **Appointment Scheduling**: Calendar view for scheduling and managing appointments
- **Nurse Profiles**: Detailed information about available nurses
- **User Profiles**: Personal and medical information management
- **Accessibility Features**: Large text, high contrast colors, and simple navigation

## Technology Stack

- **Frontend**: React Native
- **State Management**: React Context API
- **Data Storage**: AsyncStorage
- **API Integration**: Fetch API (with mock data for development)
- **UI Components**: Custom components designed for senior citizens
- **Navigation**: React Navigation

## Project Structure

```
NurseApp/
├── assets/                  # Images and other static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SeniorButton.js  # Custom button for seniors
│   │   └── SeniorTextInput.js # Custom text input for seniors
│   ├── config/              # Configuration files
│   │   └── theme.js         # App theme and styling constants
│   ├── context/             # React Context providers
│   │   └── AuthContext.js   # Authentication context
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js  # Main navigation setup
│   ├── screens/             # App screens
│   │   ├── AppointmentsScreen.js
│   │   ├── EmergencyScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── NurseRequestScreen.js
│   │   ├── NursesListScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── SplashScreen.js
│   │   └── WelcomeScreen.js
│   └── utils/               # Utility functions
│       └── api.js           # API service functions
├── App.js                   # Main app component
├── index.js                 # Entry point
└── app.json                 # App configuration
```

## Prerequisites

- Node.js >= 14
- npm >= 6 or yarn >= 1.22
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nurse-app.git
   cd nurse-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npx react-native start
   ```

4. Run the app:
   ```
   # For iOS
   npx react-native run-ios
   
   # For Android
   npx react-native run-android
   ```

## Development Status

The app is currently in development with the following components implemented:

- [x] Authentication flow (Login, Register)
- [x] Navigation system
- [x] Home screen
- [x] Nurse request screen
- [x] Emergency screen
- [x] Nurses list screen
- [x] Appointments screen
- [x] Profile screen
- [x] Custom UI components for seniors
- [x] Theme configuration
- [x] Mock API services

Upcoming features:
- [ ] Real API integration
- [ ] Push notifications
- [ ] Payment integration
- [ ] Nurse chat functionality
- [ ] Medication reminders

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please contact us at info@nurseapp.example.com 
