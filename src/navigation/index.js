import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../config/theme';

// Import screens
// Auth screens will be created later
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Main app screens will be created later
import HomeScreen from '../screens/HomeScreen';
import NurseRequestScreen from '../screens/NurseRequestScreen';
import NursesListScreen from '../screens/NursesListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';

// Create navigation stacks
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth navigator for login/registration flow
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
        height: 100, // Taller header for better visibility
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme.colors.surface,
      headerTitleStyle: {
        fontSize: theme.typography.fontSizeMedium,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      cardStyle: { backgroundColor: theme.colors.background },
    }}
  >
    <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: 'Sign In' }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ title: 'Create Account' }}
    />
  </Stack.Navigator>
);

// Large, senior-friendly custom tab bar component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View 
            key={index} 
            style={[
              styles.tabItem,
              isFocused ? styles.tabItemFocused : null,
            ]}
          >
            <Ionicons
              name={icon}
              size={28}
              color={isFocused ? theme.colors.primary : theme.colors.textLight}
              onPress={onPress}
            />
            <Text 
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelFocused : null,
              ]}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

// Main tab navigator for the app
const MainNavigator = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
        height: 100, // Taller header
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme.colors.surface,
      headerTitleStyle: {
        fontSize: theme.typography.fontSizeMedium,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: 'home',
      }}
    />
    <Tab.Screen 
      name="NurseRequest" 
      component={NurseRequestScreen} 
      options={{
        title: 'Request Nurse',
        tabBarLabel: 'Request',
        tabBarIcon: 'medkit',
      }}
    />
    <Tab.Screen 
      name="Appointments" 
      component={AppointmentsScreen} 
      options={{
        title: 'My Appointments',
        tabBarLabel: 'Appointments',
        tabBarIcon: 'calendar',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        title: 'My Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: 'person',
      }}
    />
  </Tab.Navigator>
);

// Additional screens stack
const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
        height: 100,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme.colors.surface,
      headerTitleStyle: {
        fontSize: theme.typography.fontSizeMedium,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      cardStyle: { backgroundColor: theme.colors.background },
    }}
  >
    <Stack.Screen
      name="Main"
      component={MainNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NursesList"
      component={NursesListScreen}
      options={{ title: 'Available Nurses' }}
    />
    <Stack.Screen
      name="Emergency"
      component={EmergencyScreen}
      options={{ 
        title: 'Emergency Request',
        headerStyle: {
          backgroundColor: theme.colors.emergency,
        },
      }}
    />
  </Stack.Navigator>
);

// Root navigator that handles auth state
const RootNavigator = () => {
  // Later we'll implement auth state check here
  const isSignedIn = false; // For now, hardcoded, will be dynamic later
  
  return (
    <NavigationContainer>
      {isSignedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    height: 80, // Taller tab bar for senior accessibility
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.medium,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tabItemFocused: {
    borderTopWidth: 3,
    borderTopColor: theme.colors.primary,
    paddingTop: 7, // Adjust for border
  },
  tabLabel: {
    fontSize: theme.typography.fontSizeSmall,
    marginTop: 4,
    color: theme.colors.textLight,
  },
  tabLabelFocused: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default RootNavigator; 