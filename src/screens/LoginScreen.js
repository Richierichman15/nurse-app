import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import SeniorButton from '../components/SeniorButton';
import SeniorTextInput from '../components/SeniorTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get login function from auth context
  const { login } = useAuth();

  // Simple validation
  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Handle sign in
  const handleSignIn = async () => {
    if (validateInputs()) {
      setIsLoading(true);
      
      try {
        // Call login function from auth context
        const result = await login(email, password);
        
        if (!result.success) {
          Alert.alert('Login Failed', result.error || 'Please check your credentials and try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle sign in with Face ID (placeholder for now)
  const handleFaceID = () => {
    Alert.alert('Face ID', 'Face ID sign in will be implemented in a future update.');
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented in a future update.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/nurse-icon.png')}
              style={styles.logo}
              // We'll need to add this asset later
              defaultSource={require('../../assets/nurse-icon.png')}
            />
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.instructionText}>
              Please sign in to access your account
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <SeniorTextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
              error={emailError}
              required
            />

            <SeniorTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              icon="lock-closed"
              error={passwordError}
              required
            />

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <SeniorButton
              title="Sign In"
              onPress={handleSignIn}
              loading={isLoading}
              style={styles.signInButton}
            />

            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <SeniorButton
              title="Sign In with Face ID"
              variant="outline"
              icon="scan"
              onPress={handleFaceID}
              style={styles.faceIdButton}
            />
          </View>

          {/* Sign Up Prompt */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Help Button */}
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => Alert.alert('Help', 'Help functionality will be implemented in a future update.')}
          >
            <Ionicons
              name="help-circle"
              size={32}
              color="#4A80F0"
            />
            <Text style={styles.helpText}>Need Help?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.l,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing.m,
  },
  welcomeText: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.l,
    padding: theme.spacing.s,
  },
  forgotPasswordText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  signInButton: {
    marginVertical: theme.spacing.m,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.l,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginHorizontal: theme.spacing.m,
  },
  faceIdButton: {
    marginBottom: theme.spacing.l,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.l,
  },
  signUpText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginRight: theme.spacing.s,
  },
  signUpButtonText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  helpText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    marginLeft: theme.spacing.s,
    fontWeight: theme.typography.fontWeightMedium,
  },
});

export default LoginScreen; 