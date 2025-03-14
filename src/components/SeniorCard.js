import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';

/**
 * SeniorCard - A customizable card component designed for elderly users
 * Features large text, clear layout, high contrast, and optional interaction
 */
const SeniorCard = ({
  title,
  subtitle,
  description,
  image,
  icon,
  iconColor,
  onPress,
  actionText,
  actionIcon,
  variant = 'default', // 'default', 'highlighted', 'info', 'warning'
  style,
}) => {
  // Get card styling based on variant
  const getCardStyles = () => {
    switch (variant) {
      case 'highlighted':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primaryDark,
        };
      case 'info':
        return {
          backgroundColor: theme.colors.info,
          borderColor: '#1976D2',
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          borderColor: '#FB8C00',
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        };
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    if (['highlighted', 'info', 'warning'].includes(variant)) {
      return theme.colors.surface;
    }
    return theme.colors.text;
  };

  // Determine if card is interactive
  const isInteractive = !!onPress;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        getCardStyles(),
        isInteractive && styles.interactiveCard,
        style,
      ]}
      onPress={onPress}
      disabled={!isInteractive}
      activeOpacity={isInteractive ? 0.8 : 1}
    >
      {/* Card Header with Title and Optional Icon */}
      <View style={styles.header}>
        {icon && (
          <Ionicons
            name={icon}
            size={28}
            color={iconColor || getTextColor()}
            style={styles.headerIcon}
          />
        )}
        <View style={styles.titleContainer}>
          {title && (
            <Text style={[styles.title, { color: getTextColor() }]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, { color: getTextColor() }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Optional Image */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      )}

      {/* Card Content */}
      {description && (
        <Text style={[styles.description, { color: getTextColor() }]}>
          {description}
        </Text>
      )}

      {/* Optional Action Button */}
      {actionText && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPress}
            disabled={!onPress}
          >
            <Text style={styles.actionText}>{actionText}</Text>
            {actionIcon && (
              <Ionicons
                name={actionIcon}
                size={24}
                color={theme.colors.primary}
                style={styles.actionIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Interactive Indicator */}
      {isInteractive && !actionText && (
        <View style={styles.interactiveIndicator}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={getTextColor()}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    padding: theme.spacing.l,
    marginVertical: theme.spacing.m,
    ...theme.shadows.medium,
  },
  interactiveCard: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  headerIcon: {
    marginRight: theme.spacing.m,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeRegular,
    opacity: 0.8,
  },
  imageContainer: {
    marginVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  description: {
    fontSize: theme.typography.fontSizeRegular,
    lineHeight: theme.typography.lineHeightRegular,
  },
  actionContainer: {
    marginTop: theme.spacing.l,
    alignItems: 'flex-start',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
    borderRadius: theme.borderRadius.m,
  },
  actionText: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  actionIcon: {
    marginLeft: theme.spacing.s,
  },
  interactiveIndicator: {
    position: 'absolute',
    bottom: theme.spacing.m,
    right: theme.spacing.m,
  },
});

export default SeniorCard; 