import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, View } from 'react-native';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NurseRequestScreen from '../screens/NurseRequestScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import NursesListScreen from '../screens/NursesListScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import auth context
import { useAuth } from '../context/AuthContext';
import theme from '../config/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.background }
    }}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Nurses') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Appointments') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textLight,
      tabBarLabelStyle: {
        fontSize: theme.typography.fontSizeSmall,
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing.xs,
      },
      tabBarStyle: {
        height: 65,
        paddingTop: theme.spacing.xs,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Nurses" component={NursesNavigator} />
    <Tab.Screen name="Appointments" component={AppointmentsNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
);

// Home Stack Navigator
const HomeStack = createStackNavigator();
const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="NurseRequest" component={NurseRequestScreen} />
    <HomeStack.Screen name="Emergency" component={EmergencyScreen} />
  </HomeStack.Navigator>
);

// Nurses Stack Navigator
const NursesStack = createStackNavigator();
const NursesNavigator = () => (
  <NursesStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NursesStack.Screen name="NursesList" component={NursesListScreen} />
  </NursesStack.Navigator>
);

// Appointments Stack Navigator
const AppointmentsStack = createStackNavigator();
const AppointmentsNavigator = () => (
  <AppointmentsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppointmentsStack.Screen name="AppointmentsList" component={AppointmentsScreen} />
  </AppointmentsStack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Return a loading screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 