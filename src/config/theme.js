import { DefaultTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

// Theme configuration for the NurseApp
// This file contains all the styling constants used throughout the app

export const theme = {
  // Color palette
  colors: {
    primary: '#4A80F0', // Main brand color - blue
    secondary: '#F0F0F0', // Light gray for secondary elements
    accent: '#FF9500', // Orange for accents and highlights
    success: '#34C759', // Green for success states
    error: '#FF3B30', // Red for errors and alerts
    warning: '#FFCC00', // Yellow for warnings
    emergency: '#FF3B30', // Red for emergency buttons
    
    // Text colors
    text: '#333333', // Primary text color
    textLight: '#666666', // Secondary text color
    textDisabled: '#999999', // Disabled text color
    buttonText: '#FFFFFF', // Text color on buttons
    
    // Background colors
    background: '#FFFFFF', // Main background
    surface: '#FFFFFF', // Surface elements like cards
    surfaceVariant: '#F8F8F8', // Alternative surface color
    
    // Border colors
    border: '#E1E1E1', // Standard border color
    divider: '#E1E1E1', // Divider lines
  },
  
  // Typography
  typography: {
    // Font sizes - larger for senior citizens
    fontSizeSmall: 14,
    fontSizeRegular: 16,
    fontSizeMedium: 18,
    fontSizeLarge: 24,
    fontSizeXLarge: 32,
    
    // Line heights
    lineHeightSmall: 20,
    lineHeightRegular: 24,
    lineHeightMedium: 28,
    lineHeightLarge: 32,
    lineHeightXLarge: 40,
    
    // Font weights
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    round: 999, // For circular elements
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  
  // Animation durations
  animation: {
    short: 150,
    medium: 300,
    long: 500,
  },
};

export default theme; 