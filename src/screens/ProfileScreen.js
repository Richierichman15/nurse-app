import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import SeniorButton from '../components/SeniorButton';

const ProfileScreen = ({ navigation }) => {
  // Mock user data
  const user = {
    id: '1',
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@example.com',
    address: '123 Main Street, Apt 4B, Cityville, ST 12345',
    dateOfBirth: 'May 15, 1953',
    emergencyContact: 'Michael Johnson (Son) - (555) 987-6543',
    insuranceProvider: 'Senior Health Insurance',
    insuranceNumber: 'SHI-1234567890',
    medicalConditions: [
      'High Blood Pressure',
      'Type 2 Diabetes',
      'Arthritis',
    ],
    medications: [
      'Lisinopril 10mg - Once daily',
      'Metformin 500mg - Twice daily',
      'Ibuprofen 200mg - As needed for pain',
    ],
  };

  // Profile sections
  const sections = [
    {
      title: 'Personal Information',
      icon: 'person',
      items: [
        { label: 'Phone', value: user.phone, icon: 'call' },
        { label: 'Email', value: user.email, icon: 'mail' },
        { label: 'Address', value: user.address, icon: 'home' },
        { label: 'Date of Birth', value: user.dateOfBirth, icon: 'calendar' },
      ],
    },
    {
      title: 'Medical Information',
      icon: 'medkit',
      items: [
        { label: 'Emergency Contact', value: user.emergencyContact, icon: 'alert-circle' },
        { label: 'Insurance Provider', value: user.insuranceProvider, icon: 'card' },
        { label: 'Insurance Number', value: user.insuranceNumber, icon: 'document-text' },
      ],
    },
  ];

  // Handle logout
  const handleLogout = () => {
    alert('Logout functionality will be implemented with Firebase');
  };

  // Handle edit profile
  const handleEditProfile = () => {
    alert('Edit profile functionality will be implemented');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../assets/nurse-icon.png')} 
              style={styles.profileImage}
              // We'll need to add a real profile image asset later
              defaultSource={require('../../assets/nurse-icon.png')}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Medical Conditions and Medications Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="fitness" size={24} color={theme.colors.primary} />
            <Text style={styles.sectionTitle}>Medical Conditions</Text>
          </View>
          <View style={styles.conditionsContainer}>
            {user.medicalConditions.map((condition, index) => (
              <View key={index} style={styles.conditionItem}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                <Text style={styles.conditionText}>{condition}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.addButtonText}>Add Medical Condition</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={24} color={theme.colors.primary} />
            <Text style={styles.sectionTitle}>Medications</Text>
          </View>
          <View style={styles.medicationsContainer}>
            {user.medications.map((medication, index) => (
              <View key={index} style={styles.medicationItem}>
                <Ionicons name="pill" size={20} color={theme.colors.primary} />
                <Text style={styles.medicationText}>{medication}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={20} color={theme.colors.primary} />
              <Text style={styles.addButtonText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Sections */}
        {sections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon} size={24} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.infoContainer}>
              {section.items.map((item, i) => (
                <View key={i} style={styles.infoItem}>
                  <View style={styles.infoLabel}>
                    <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
                    <Text style={styles.labelText}>{item.label}:</Text>
                  </View>
                  <Text style={styles.valueText}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Settings Options */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={24} color={theme.colors.primary} />
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications" size={24} color={theme.colors.primary} />
            <Text style={styles.settingText}>Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="shield" size={24} color={theme.colors.primary} />
            <Text style={styles.settingText}>Privacy Settings</Text>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="document-text" size={24} color={theme.colors.primary} />
            <Text style={styles.settingText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <SeniorButton
          title="Logout"
          variant="outline"
          icon="log-out"
          onPress={handleLogout}
          style={styles.logoutButton}
        />

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
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.m,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  userName: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.s,
  },
  editProfileText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  sectionContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.l,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  conditionsContainer: {
    marginBottom: theme.spacing.m,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  conditionText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  medicationsContainer: {
    marginBottom: theme.spacing.m,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  medicationText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  addButtonText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  infoContainer: {
    marginBottom: theme.spacing.m,
  },
  infoItem: {
    marginBottom: theme.spacing.m,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  labelText: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  valueText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: 40, // To align with the label text
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  logoutButton: {
    marginVertical: theme.spacing.xl,
  },
});

export default ProfileScreen; 