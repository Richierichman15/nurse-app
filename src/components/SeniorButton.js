import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

/**
 * SeniorButton - An accessible button component optimized for elderly users
 * Features large touch targets, high contrast, optional icons, and haptic feedback
 */
const SeniorButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary', 'outline', 'secondary'
  size = 'large', // 'large', 'medium', 'small'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  // Determine button style based on variant
  const getButtonStyle = () => {
    if (disabled) {
      return styles.buttonDisabled;
    }
    
    switch (variant) {
      case 'outline':
        return styles.buttonOutline;
      case 'secondary':
        return styles.buttonSecondary;
      default:
        return styles.buttonPrimary;
    }
  };

  // Determine text style based on variant
  const getTextStyle = () => {
    if (disabled) {
      return styles.textDisabled;
    }
    
    switch (variant) {
      case 'outline':
        return styles.textOutline;
      case 'secondary':
        return styles.textSecondary;
      default:
        return styles.textPrimary;
    }
  };

  // Determine button size
  const getButtonSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'medium':
        return styles.buttonMedium;
      default:
        return styles.buttonLarge;
    }
  };

  // Determine text size
  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'medium':
        return styles.textMedium;
      default:
        return styles.textLarge;
    }
  };

  // Determine icon color
  const getIconColor = () => {
    if (disabled) {
      return theme.colors.textDisabled;
    }
    
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.text;
      default:
        return theme.colors.buttonText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getButtonStyle(),
        getButtonSizeStyle(),
        style,
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? theme.colors.buttonText : theme.colors.primary} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 18 : 24}
              color={getIconColor()}
              style={styles.iconLeft}
            />
          )}
          
          <Text style={[
            styles.text,
            getTextStyle(),
            getTextSizeStyle(),
            textStyle,
          ]}>
            {title}
          </Text>
          
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 18 : 24}
              color={getIconColor()}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.l,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    borderColor: theme.colors.border,
  },
  buttonLarge: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    minHeight: 60,
  },
  buttonMedium: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    minHeight: 50,
  },
  buttonSmall: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    minHeight: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  },
  textPrimary: {
    color: theme.colors.buttonText,
  },
  textOutline: {
    color: theme.colors.primary,
  },
  textSecondary: {
    color: theme.colors.text,
  },
  textDisabled: {
    color: theme.colors.textDisabled,
  },
  textLarge: {
    fontSize: theme.typography.fontSizeMedium,
  },
  textMedium: {
    fontSize: theme.typography.fontSizeRegular,
  },
  textSmall: {
    fontSize: theme.typography.fontSizeSmall,
  },
  iconLeft: {
    marginRight: theme.spacing.s,
  },
  iconRight: {
    marginLeft: theme.spacing.s,
  },
});

export default SeniorButton; 