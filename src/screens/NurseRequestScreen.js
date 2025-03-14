import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { theme } from '../config/theme';
import SeniorButton from '../components/SeniorButton';
import SeniorTextInput from '../components/SeniorTextInput';
import SeniorCard from '../components/SeniorCard';

const NurseRequestScreen = ({ navigation }) => {
  // State for form fields
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('60'); // Default to 60 minutes

  // State for modals
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Service types
  const serviceTypes = [
    { id: 'medical', title: 'Medical Care', icon: 'medical' },
    { id: 'homecare', title: 'Home Care', icon: 'home' },
    { id: 'companionship', title: 'Companionship', icon: 'people' },
  ];

  // Time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  ];

  // Duration options
  const durationOptions = [
    { value: '30', label: '30 Minutes' },
    { value: '60', label: '1 Hour' },
    { value: '120', label: '2 Hours' },
    { value: '180', label: '3 Hours' },
    { value: '240', label: '4 Hours' },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setFormattedDate(formatDate(day.dateString));
    setShowCalendar(false);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeSelector(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!serviceType || !selectedDate || !selectedTime) {
      alert('Please fill out all required fields');
      return;
    }

    // In a real app, we would submit the request to a backend
    // For now, show a success modal
    setShowSuccessModal(true);
  };

  // Handle view nurses
  const handleViewNurses = () => {
    navigation.navigate('NursesList');
  };

  // Reset form after submission
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setServiceType('');
    setSelectedDate('');
    setFormattedDate('');
    setSelectedTime('');
    setNotes('');
    setDuration('60');
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
          <Text style={styles.screenTitle}>Request a Nurse</Text>
          <Text style={styles.screenDescription}>
            Please fill out the form below to request a nurse visit. All fields marked with * are required.
          </Text>

          {/* Service Type Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Service Type *</Text>
            <Text style={styles.sectionDescription}>
              Select the type of service you need
            </Text>

            <View style={styles.serviceTypesContainer}>
              {serviceTypes.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceTypeCard,
                    serviceType === service.id && styles.selectedServiceType,
                  ]}
                  onPress={() => setServiceType(service.id)}
                >
                  <Ionicons
                    name={service.icon}
                    size={32}
                    color={
                      serviceType === service.id
                        ? theme.colors.primary
                        : theme.colors.textLight
                    }
                  />
                  <Text
                    style={[
                      styles.serviceTypeText,
                      serviceType === service.id && styles.selectedServiceTypeText,
                    ]}
                  >
                    {service.title}
                  </Text>
                  {serviceType === service.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={theme.colors.primary}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date and Time Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Date and Time *</Text>
            <Text style={styles.sectionDescription}>
              Select your preferred date and time for the visit
            </Text>

            <TouchableOpacity
              style={styles.dateSelector}
              onPress={() => setShowCalendar(true)}
            >
              <Ionicons name="calendar" size={24} color={theme.colors.primary} />
              <Text style={styles.dateSelectorText}>
                {formattedDate || 'Select Date'}
              </Text>
              <Ionicons name="chevron-down" size={24} color={theme.colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dateSelector,
                { marginTop: theme.spacing.m },
              ]}
              onPress={() => setShowTimeSelector(true)}
              disabled={!selectedDate}
            >
              <Ionicons
                name="time"
                size={24}
                color={selectedDate ? theme.colors.primary : theme.colors.textDisabled}
              />
              <Text
                style={[
                  styles.dateSelectorText,
                  !selectedDate && { color: theme.colors.textDisabled },
                ]}
              >
                {selectedTime || 'Select Time'}
              </Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={selectedDate ? theme.colors.icon : theme.colors.textDisabled}
              />
            </TouchableOpacity>

            {/* Duration Selector */}
            <View style={styles.durationContainer}>
              <Text style={styles.durationLabel}>Visit Duration:</Text>
              <View style={styles.durationOptions}>
                {durationOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.durationOption,
                      duration === option.value && styles.selectedDuration,
                    ]}
                    onPress={() => setDuration(option.value)}
                  >
                    <Text
                      style={[
                        styles.durationText,
                        duration === option.value && styles.selectedDurationText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Additional Notes Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <Text style={styles.sectionDescription}>
              Please provide any relevant details about your needs
            </Text>

            <SeniorTextInput
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              placeholder="Describe your specific needs or health conditions..."
            />
          </View>

          {/* Available Nurses Card */}
          <SeniorCard
            title="View Available Nurses"
            description="Check qualifications, experience, and ratings of our professional nurses."
            icon="people"
            actionText="Browse Nurses"
            onPress={handleViewNurses}
            style={styles.nursesCard}
          />

          {/* Submit Button */}
          <SeniorButton
            title="Submit Request"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Ionicons name="close" size={28} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: theme.colors.primary },
              }}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 16,
                selectedDayBackgroundColor: theme.colors.primary,
                todayTextColor: theme.colors.primary,
                arrowColor: theme.colors.primary,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Time Selector Modal */}
      <Modal
        visible={showTimeSelector}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimeSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <TouchableOpacity onPress={() => setShowTimeSelector(false)}>
                <Ionicons name="close" size={28} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.timeSlotContainer}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot,
                    ]}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.selectedTimeSlotText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.successModalContent}>
            <Ionicons
              name="checkmark-circle"
              size={80}
              color={theme.colors.success}
              style={styles.successIcon}
            />
            <Text style={styles.successTitle}>Request Submitted!</Text>
            <Text style={styles.successMessage}>
              Your nurse request has been submitted successfully. We will confirm your appointment soon.
            </Text>
            <View style={styles.requestDetails}>
              <View style={styles.requestDetailItem}>
                <Text style={styles.requestDetailLabel}>Service:</Text>
                <Text style={styles.requestDetailValue}>
                  {serviceTypes.find(s => s.id === serviceType)?.title || ''}
                </Text>
              </View>
              <View style={styles.requestDetailItem}>
                <Text style={styles.requestDetailLabel}>Date:</Text>
                <Text style={styles.requestDetailValue}>{formattedDate}</Text>
              </View>
              <View style={styles.requestDetailItem}>
                <Text style={styles.requestDetailLabel}>Time:</Text>
                <Text style={styles.requestDetailValue}>{selectedTime}</Text>
              </View>
            </View>
            <SeniorButton
              title="Close"
              onPress={handleSuccessModalClose}
              style={styles.successButton}
            />
          </View>
        </View>
      </Modal>
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
    paddingBottom: theme.spacing.xxl,
  },
  screenTitle: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  screenDescription: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  sectionDescription: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.m,
  },
  serviceTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTypeCard: {
    width: '30%',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  selectedServiceType: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
  },
  serviceTypeText: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: '500',
    color: theme.colors.text,
    marginTop: theme.spacing.s,
    textAlign: 'center',
  },
  selectedServiceTypeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.m,
    backgroundColor: theme.colors.surface,
  },
  dateSelectorText: {
    flex: 1,
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  durationContainer: {
    marginTop: theme.spacing.l,
  },
  durationLabel: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  durationOption: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.surface,
  },
  selectedDuration: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
  },
  durationText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
  },
  selectedDurationText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  nursesCard: {
    marginBottom: theme.spacing.xl,
  },
  submitButton: {
    marginTop: theme.spacing.l,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  modalTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  selectedTimeSlot: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
  },
  timeSlotText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
  },
  selectedTimeSlotText: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  successModalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.l,
    alignItems: 'center',
    ...theme.shadows.large,
  },
  successIcon: {
    marginBottom: theme.spacing.l,
  },
  successTitle: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  successMessage: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  requestDetails: {
    width: '100%',
    marginBottom: theme.spacing.l,
  },
  requestDetailItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.s,
  },
  requestDetailLabel: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: 'bold',
    color: theme.colors.text,
    width: 80,
  },
  requestDetailValue: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    flex: 1,
  },
  successButton: {
    marginTop: theme.spacing.m,
    width: '80%',
  },
});

export default NurseRequestScreen; 