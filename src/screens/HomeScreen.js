import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import SeniorCard from '../components/SeniorCard';
import SeniorButton from '../components/SeniorButton';

const HomeScreen = ({ navigation }) => {
  // Mock data - would come from API in production
  const upcomingAppointment = {
    id: '1',
    nurseName: 'Mary Johnson',
    date: 'Tomorrow, 10:00 AM',
    purpose: 'Health Check',
    nurseImage: require('../../assets/nurse-icon.png'), // Placeholder
  };

  // Quick actions
  const quickActions = [
    {
      id: '1',
      title: 'Request Nurse',
      icon: 'medkit',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('NurseRequest'),
    },
    {
      id: '2',
      title: 'View Appointments',
      icon: 'calendar',
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('Appointments'),
    },
    {
      id: '3',
      title: 'Emergency',
      icon: 'alert-circle',
      color: theme.colors.emergency,
      onPress: () => navigation.navigate('Emergency'),
    },
  ];

  // Health tips
  const healthTips = [
    {
      id: '1',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily for better health.',
      icon: 'water',
    },
    {
      id: '2',
      title: 'Take Medications',
      description: 'Remember to take your prescribed medications on time.',
      icon: 'time',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => alert('Notifications will be implemented')}
          >
            <Ionicons
              name="notifications"
              size={28}
              color={theme.colors.primary}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Emergency Button */}
        <SeniorButton
          title="Emergency Nurse Request"
          variant="emergency"
          icon="alert"
          onPress={() => navigation.navigate('Emergency')}
          style={styles.emergencyButton}
        />

        {/* Upcoming Appointment Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
          {upcomingAppointment ? (
            <SeniorCard
              title={upcomingAppointment.purpose}
              subtitle={upcomingAppointment.date}
              description={`Nurse: ${upcomingAppointment.nurseName}`}
              icon="calendar"
              actionText="View Details"
              onPress={() => navigation.navigate('Appointments')}
            />
          ) : (
            <SeniorCard
              title="No Upcoming Appointments"
              description="You don't have any scheduled appointments."
              icon="calendar-outline"
              actionText="Schedule Now"
              onPress={() => navigation.navigate('NurseRequest')}
            />
          )}
        </View>

        {/* Quick Actions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.quickActionButton,
                  action.title === 'Emergency' && styles.emergencyAction,
                ]}
                onPress={action.onPress}
              >
                <View
                  style={[
                    styles.actionIconContainer,
                    { backgroundColor: action.color },
                  ]}
                >
                  <Ionicons
                    name={action.icon}
                    size={28}
                    color={theme.colors.surface}
                  />
                </View>
                <Text
                  style={[
                    styles.actionTitle,
                    action.title === 'Emergency' && styles.emergencyText,
                  ]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Tips Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          {healthTips.map((tip) => (
            <SeniorCard
              key={tip.id}
              title={tip.title}
              description={tip.description}
              icon={tip.icon}
              variant="default"
              style={styles.tipCard}
            />
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.sectionContainer}>
          <SeniorCard
            title="Need Assistance?"
            description="Our support team is here to help you with any questions or issues."
            icon="help-circle"
            actionText="Contact Support"
            onPress={() => alert('Support contact will be implemented')}
            variant="info"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
  },
  userName: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  notificationButton: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.round,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: theme.colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emergencyButton: {
    marginBottom: theme.spacing.xl,
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  emergencyAction: {
    borderWidth: 2,
    borderColor: theme.colors.emergency,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  actionTitle: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.text,
  },
  emergencyText: {
    color: theme.colors.emergency,
    fontWeight: 'bold',
  },
  tipCard: {
    marginBottom: theme.spacing.m,
  },
});

export default HomeScreen; 