import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ActivityIndicator 
} from 'react-native';
import theme from '../config/theme';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigate to the main app after splash screen
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/nurse-icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>NurseApp</Text>
      <Text style={styles.subtitle}>Care at your fingertips</Text>
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary} 
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.l,
  },
  title: {
    fontSize: theme.typography.fontSizeXLarge,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizeMedium,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  loader: {
    marginTop: theme.spacing.l,
  },
});

export default SplashScreen; 