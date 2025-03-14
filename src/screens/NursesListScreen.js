import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import SeniorCard from '../components/SeniorCard';

const NursesListScreen = ({ navigation }) => {
  // Mock data for nurses
  const nurses = [
    {
      id: '1',
      name: 'Maria Johnson',
      specialty: 'General Care',
      experience: '15 years',
      rating: 4.9,
      availability: 'Available Today',
      image: require('../../assets/nurse-icon.png'),
    },
    {
      id: '2',
      name: 'Robert Smith',
      specialty: 'Geriatric Care',
      experience: '8 years',
      rating: 4.7,
      availability: 'Available Tomorrow',
      image: require('../../assets/nurse-icon.png'),
    },
    {
      id: '3',
      name: 'Sarah Williams',
      specialty: 'Home Care',
      experience: '12 years',
      rating: 4.8,
      availability: 'Available Today',
      image: require('../../assets/nurse-icon.png'),
    },
  ];

  const handleSelectNurse = (nurse) => {
    // In a complete app, this would navigate to a nurse details screen
    alert(`You selected ${nurse.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Our Professional Nurses</Text>
        <Text style={styles.subtitle}>Select a nurse to view details or book an appointment</Text>

        {/* Filter Section - Placeholder */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filter by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Available Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Home Care</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Medical Care</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Highest Rated</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Nurses List */}
        <View style={styles.nursesContainer}>
          {nurses.map((nurse) => (
            <TouchableOpacity
              key={nurse.id}
              style={styles.nurseCard}
              onPress={() => handleSelectNurse(nurse)}
            >
              <View style={styles.nurseCardContent}>
                <Image source={nurse.image} style={styles.nurseImage} />
                <View style={styles.nurseInfo}>
                  <Text style={styles.nurseName}>{nurse.name}</Text>
                  <Text style={styles.nurseSpecialty}>{nurse.specialty}</Text>
                  <View style={styles.nurseRatingContainer}>
                    <Ionicons name="star" size={16} color="#FFC107" />
                    <Text style={styles.nurseRating}>{nurse.rating}</Text>
                    <Text style={styles.nurseExperience}>{nurse.experience}</Text>
                  </View>
                  <View style={styles.availabilityContainer}>
                    <View 
                      style={[
                        styles.availabilityDot, 
                        nurse.availability.includes('Today') ? 
                          styles.availableToday : styles.availableLater
                      ]}
                    />
                    <Text style={styles.availabilityText}>{nurse.availability}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* No results placeholder - hidden by default */}
        <View style={[styles.noResultsContainer, { display: 'none' }]}>
          <Ionicons name="search" size={60} color={theme.colors.textLight} />
          <Text style={styles.noResultsTitle}>No nurses found</Text>
          <Text style={styles.noResultsText}>
            Try adjusting your filters or search criteria
          </Text>
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
  title: {
    fontSize: theme.typography.fontSizeLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
  },
  filterContainer: {
    marginBottom: theme.spacing.xl,
  },
  filterTitle: {
    fontSize: theme.typography.fontSizeRegular,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.round,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    marginRight: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  filterChipText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
  },
  nursesContainer: {
    marginBottom: theme.spacing.xl,
  },
  nurseCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.l,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.m,
  },
  nurseCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nurseImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.l,
  },
  nurseInfo: {
    flex: 1,
  },
  nurseName: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  nurseSpecialty: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  nurseRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  nurseRating: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.m,
    fontWeight: 'bold',
  },
  nurseExperience: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing.xs,
  },
  availableToday: {
    backgroundColor: theme.colors.success,
  },
  availableLater: {
    backgroundColor: theme.colors.warning,
  },
  availabilityText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.text,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  noResultsTitle: {
    fontSize: theme.typography.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  noResultsText: {
    fontSize: theme.typography.fontSizeRegular,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

export default NursesListScreen; 