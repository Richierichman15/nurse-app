import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import SeniorButton from '../components/SeniorButton';
import SeniorTextInput from '../components/SeniorTextInput';

const EmergencyScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock emergency request
  const handleEmergencyRequest = () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      setSuccessMessage('Your emergency request has been sent. A nurse will contact you immediately.');
      setShowSuccessModal(true);
    }, 2000);
  };

  // Mock call emergency services
  const handleCallEmergency = () => {
    alert('In a real app, this would directly call emergency services.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Emergency Header */}
        <View style={styles.emergencyHeader}>
          <Ionicons name="alert-circle" size={60} color="#fff" />
          <Text style={styles.emergencyTitle}>Emergency Request</Text>
          <Text style={styles.emergencySubtitle}>
            Request immediate assistance from a nurse
          </Text>
        </View>

        {/* Emergency Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>When to use Emergency Request:</Text>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
            <Text style={styles.infoText}>Urgent medical concern but not life-threatening</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
            <Text style={styles.infoText}>Sudden health change requiring professional advice</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
            <Text style={styles.infoText}>Need for immediate care at home</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.warningTitle}>For severe emergencies:</Text>
          <View style={styles.infoItem}>
            <Ionicons name="warning" size={24} color={theme.colors.error} />
            <Text style={styles.warningText}>For life-threatening emergencies, call 911 instead</Text>
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Briefly describe your emergency:</Text>
          <SeniorTextInput
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us what's happening so we can provide the right help..."
          />
        </View>

        {/* Emergency Actions */}
        <View style={styles.actionsContainer}>
          <SeniorButton
            title="Request Urgent Nurse"
            variant="emergency"
            icon="medkit"
            onPress={handleEmergencyRequest}
            loading={isRequesting}
            style={styles.emergencyButton}
          />
          
          <Text style={styles.orText}>OR</Text>
          
          <TouchableOpacity 
            style={styles.callButton}
            onPress={handleCallEmergency}
          >
            <Ionicons name="call" size={30} color="#fff" />
            <Text style={styles.callButtonText}>Call Emergency Services (911)</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need assistance?</Text>
          <Text style={styles.helpText}>Our support team is available 24/7</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="call" size={24} color={theme.colors.primary} />
            <Text style={styles.helpButtonText}>Call Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              size={60}
              color={theme.colors.success}
              style={styles.successIcon}
            />
            <Text style={styles.modalTitle}>Request Sent!</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
            <SeniorButton
              title="OK"
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              style={styles.modalButton}
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
  },
  emergencyHeader: {
    backgroundColor: theme.colors.emergency,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  emergencyTitle: {
    fontSize: theme.typography.fontSizeXLarge,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: theme.spacing.m,
  },
  emergencySubtitle: {
    fontSize: theme.typography.fontSizeRegular,
    color: '#fff',
    marginTop: theme.spacing.s,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.small,
  },
  infoTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  infoText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.m,
  },
  warningTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.error,
    marginBottom: theme.spacing.m,
  },
  warningText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.error,
    marginLeft: theme.spacing.m,
    flex: 1,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: theme.spacing.xl,
  },
  formLabel: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  actionsContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  emergencyButton: {
    width: '100%',
  },
  orText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginVertical: theme.spacing.m,
    fontWeight: 'bold',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e53935',
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    width: '100%',
    ...theme.shadows.medium,
  },
  callButtonText: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: theme.spacing.m,
  },
  helpSection: {
    alignItems: 'center',
    padding: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  helpTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  helpText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.m,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    backgroundColor: 'rgba(42, 107, 172, 0.1)',
  },
  helpButtonText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: theme.spacing.s,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.l,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    ...theme.shadows.large,
  },
  successIcon: {
    marginBottom: theme.spacing.l,
  },
  modalTitle: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  modalMessage: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  modalButton: {
    minWidth: 150,
  },
});

export default EmergencyScreen; 