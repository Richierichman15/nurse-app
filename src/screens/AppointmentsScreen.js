import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import SeniorCard from '../components/SeniorCard';
import SeniorButton from '../components/SeniorButton';

const AppointmentsScreen = ({ navigation }) => {
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: '1',
      nurseName: 'Dr. Maria Johnson',
      date: 'Tomorrow, June 15',
      time: '10:00 AM',
      type: 'Health Check',
      location: 'Your Home',
      status: 'confirmed',
    },
    {
      id: '2',
      nurseName: 'Dr. Robert Smith',
      date: 'Friday, June 18',
      time: '2:30 PM',
      type: 'Medication Review',
      location: 'Your Home',
      status: 'confirmed',
    },
  ];

  const pastAppointments = [
    {
      id: '3',
      nurseName: 'Dr. Sarah Williams',
      date: 'Monday, June 7',
      time: '11:00 AM',
      type: 'Health Check',
      location: 'Your Home',
      status: 'completed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'cancelled':
        return theme.colors.error;
      case 'completed':
        return theme.colors.primary;
      default:
        return theme.colors.textLight;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  // Placeholder for appointment actions
  const handleViewDetails = (appointment) => {
    alert(`View details for appointment with ${appointment.nurseName}`);
  };

  const handleCancelAppointment = (appointment) => {
    alert(`Cancel appointment with ${appointment.nurseName}`);
  };

  const handleRescheduleAppointment = (appointment) => {
    alert(`Reschedule appointment with ${appointment.nurseName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>My Appointments</Text>

        {/* Upcoming Appointments Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentType}>{appointment.type}</Text>
                    <View style={styles.statusContainer}>
                      <View 
                        style={[
                          styles.statusDot, 
                          { backgroundColor: getStatusColor(appointment.status) }
                        ]} 
                      />
                      <Text style={styles.statusText}>
                        {getStatusText(appointment.status)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(appointment)}
                    style={styles.detailsButton}
                  >
                    <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>

                <View style={styles.appointmentDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="person" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.nurseName}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="location" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.location}</Text>
                  </View>
                </View>

                <View style={styles.appointmentActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleRescheduleAppointment(appointment)}
                  >
                    <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                    <Text style={styles.actionText}>Reschedule</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleCancelAppointment(appointment)}
                  >
                    <Ionicons name="close-circle" size={20} color={theme.colors.error} />
                    <Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={60} color={theme.colors.textLight} />
              <Text style={styles.emptyStateTitle}>No Upcoming Appointments</Text>
              <Text style={styles.emptyStateText}>
                You don't have any upcoming appointments scheduled.
              </Text>
              <SeniorButton 
                title="Schedule an Appointment" 
                onPress={() => navigation.navigate('NurseRequest')}
                style={styles.scheduleButton}
              />
            </View>
          )}
        </View>

        {/* Past Appointments Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Past Appointments</Text>
          
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentType}>{appointment.type}</Text>
                    <View style={styles.statusContainer}>
                      <View 
                        style={[
                          styles.statusDot, 
                          { backgroundColor: getStatusColor(appointment.status) }
                        ]} 
                      />
                      <Text style={styles.statusText}>
                        {getStatusText(appointment.status)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(appointment)}
                    style={styles.detailsButton}
                  >
                    <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>

                <View style={styles.appointmentDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="person" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.nurseName}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="location" size={20} color={theme.colors.primary} />
                    <Text style={styles.detailText}>{appointment.location}</Text>
                  </View>
                </View>

                <View style={styles.appointmentActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.fullWidthButton]}
                    onPress={() => alert('Book similar appointment')}
                  >
                    <Ionicons name="repeat" size={20} color={theme.colors.primary} />
                    <Text style={styles.actionText}>Book Similar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No past appointments found.
              </Text>
            </View>
          )}
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
  screenTitle: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
  },
  appointmentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.l,
    padding: theme.spacing.l,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    fontSize: theme.typography.fontSizeSmall,
    color: theme.colors.textLight,
    fontWeight: '500',
  },
  detailsButton: {
    padding: theme.spacing.s,
  },
  appointmentDetails: {
    marginBottom: theme.spacing.m,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  detailText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  actionText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  cancelButton: {
    backgroundColor: 'rgba(216, 72, 72, 0.1)',
  },
  cancelText: {
    color: theme.colors.error,
  },
  fullWidthButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    ...theme.shadows.small,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  scheduleButton: {
    marginTop: theme.spacing.m,
  },
});

export default AppointmentsScreen; 