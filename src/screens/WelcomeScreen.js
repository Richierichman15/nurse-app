import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import { theme } from '../config/theme';
import SeniorButton from '../components/SeniorButton';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/nurse-icon.png')} 
          style={styles.logo}
          // We'll need to add this asset later
          defaultSource={require('../../assets/nurse-icon.png')}
        />
        <Text style={styles.appTitle}>NurseCare</Text>
        <Text style={styles.appTagline}>Healthcare at your fingertips</Text>
      </View>
      
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeDescription}>
          Connect with qualified nurses for home care, medical assistance, or companionship.
        </Text>
      </View>
      
      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: 'rgba(42, 107, 172, 0.2)' }]}>
            <Text style={styles.featureEmoji}>👩‍⚕️</Text>
          </View>
          <Text style={styles.featureText}>Professional Nurses</Text>
        </View>
        
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: 'rgba(80, 176, 134, 0.2)' }]}>
            <Text style={styles.featureEmoji}>🏠</Text>
          </View>
          <Text style={styles.featureText}>Home Care</Text>
        </View>
        
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 138, 101, 0.2)' }]}>
            <Text style={styles.featureEmoji}>⏰</Text>
          </View>
          <Text style={styles.featureText}>24/7 Support</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <SeniorButton
          title="Sign In"
          variant="primary"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
        
        <SeniorButton
          title="Create Account"
          variant="outline"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        />

        <SeniorButton
          title="Emergency Request"
          variant="emergency"
          icon="alert"
          onPress={() => navigation.navigate('Emergency')}
          style={styles.emergencyButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.l,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl * 2,
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.m,
  },
  appTitle: {
    fontSize: theme.typography.fontSizeXLarge,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  appTagline: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
  },
  welcomeTextContainer: {
    marginBottom: theme.spacing.xl,
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  welcomeDescription: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeightRegular,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  featureEmoji: {
    fontSize: 30,
  },
  featureText: {
    fontSize: theme.typography.fontSizeRegular,
    textAlign: 'center',
    fontWeight: '500',
    color: theme.colors.text,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.m,
  },
  emergencyButton: {
    marginTop: theme.spacing.m,
  },
});

export default WelcomeScreen; 