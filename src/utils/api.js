// API utility functions for the NurseApp
// This file contains functions for making API requests to the backend

import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API requests
const API_BASE_URL = 'https://api.nurseapp.example.com'; // Replace with actual API URL in production

// Default request headers
const getDefaultHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Generic request function
const request = async (endpoint, method = 'GET', data = null, customHeaders = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      ...(await getDefaultHeaders()),
      ...customHeaders,
    };

    const config = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'An error occurred');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// API functions for authentication
export const authAPI = {
  login: (email, password) => request('/auth/login', 'POST', { email, password }),
  register: (userData) => request('/auth/register', 'POST', userData),
  logout: () => request('/auth/logout', 'POST'),
  forgotPassword: (email) => request('/auth/forgot-password', 'POST', { email }),
  resetPassword: (token, newPassword) => request('/auth/reset-password', 'POST', { token, newPassword }),
};

// API functions for user profile
export const userAPI = {
  getProfile: () => request('/user/profile', 'GET'),
  updateProfile: (userData) => request('/user/profile', 'PUT', userData),
  updateAvatar: (imageData) => request('/user/avatar', 'POST', { image: imageData }),
};

// API functions for nurses
export const nursesAPI = {
  getAllNurses: (filters = {}) => request(`/nurses?${new URLSearchParams(filters)}`),
  getNurseById: (id) => request(`/nurses/${id}`),
  getNurseAvailability: (id, date) => request(`/nurses/${id}/availability?date=${date}`),
};

// API functions for appointments
export const appointmentsAPI = {
  getAppointments: (status = 'all') => request(`/appointments?status=${status}`),
  getAppointmentById: (id) => request(`/appointments/${id}`),
  createAppointment: (appointmentData) => request('/appointments', 'POST', appointmentData),
  updateAppointment: (id, appointmentData) => request(`/appointments/${id}`, 'PUT', appointmentData),
  cancelAppointment: (id, reason) => request(`/appointments/${id}/cancel`, 'POST', { reason }),
};

// API functions for emergency requests
export const emergencyAPI = {
  createEmergencyRequest: (data) => request('/emergency', 'POST', data),
  getEmergencyStatus: (id) => request(`/emergency/${id}`),
};

// Mock API functions for development (simulates API responses)
export const mockAPI = {
  // Mock login function
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Mock successful response
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email,
        phone: '555-123-4567',
      },
      token: 'mock-token-12345',
    };
  },
  
  // Mock register function
  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error('Name, email and password are required');
    }
    
    // Mock successful response
    return {
      user: {
        id: '1',
        ...userData,
      },
      token: 'mock-token-12345',
    };
  },
  
  // Mock get nurses function
  getNurses: async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const nurses = [
      {
        id: '1',
        name: 'Sarah Johnson',
        specialty: 'General Care',
        experience: '15 years',
        rating: 4.9,
        available: true,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '2',
        name: 'Michael Chen',
        specialty: 'Physical Therapy',
        experience: '8 years',
        rating: 4.7,
        available: true,
        image: 'https://randomuser.me/api/portraits/men/46.jpg',
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        specialty: 'Elderly Care',
        experience: '12 years',
        rating: 4.8,
        available: false,
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      {
        id: '4',
        name: 'David Wilson',
        specialty: 'Medication Management',
        experience: '10 years',
        rating: 4.6,
        available: true,
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: '5',
        name: 'Lisa Thompson',
        specialty: 'Wound Care',
        experience: '14 years',
        rating: 4.9,
        available: true,
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
    ];
    
    // Apply filters if any
    let filteredNurses = [...nurses];
    
    if (filters.specialty) {
      filteredNurses = filteredNurses.filter(nurse => 
        nurse.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    }
    
    if (filters.available === 'true') {
      filteredNurses = filteredNurses.filter(nurse => nurse.available);
    }
    
    return filteredNurses;
  },
  
  // Mock get appointments function
  getAppointments: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    return {
      upcoming: [
        {
          id: '1',
          nurseName: 'Sarah Johnson',
          nurseImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '2023-07-15',
          time: '10:00 AM',
          type: 'General Checkup',
          location: 'Home Visit',
          status: 'confirmed',
        },
        {
          id: '2',
          nurseName: 'Michael Chen',
          nurseImage: 'https://randomuser.me/api/portraits/men/46.jpg',
          date: '2023-07-18',
          time: '2:30 PM',
          type: 'Physical Therapy',
          location: 'Home Visit',
          status: 'pending',
        },
      ],
      past: [
        {
          id: '3',
          nurseName: 'Lisa Thompson',
          nurseImage: 'https://randomuser.me/api/portraits/women/33.jpg',
          date: '2023-07-01',
          time: '11:00 AM',
          type: 'Wound Dressing',
          location: 'Home Visit',
          status: 'completed',
        },
        {
          id: '4',
          nurseName: 'David Wilson',
          nurseImage: 'https://randomuser.me/api/portraits/men/22.jpg',
          date: '2023-06-25',
          time: '9:15 AM',
          type: 'Medication Review',
          location: 'Video Call',
          status: 'completed',
        },
      ],
    };
  },
  
  // Mock emergency request function
  createEmergencyRequest: async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful response
    return {
      id: '123456',
      status: 'processing',
      message: 'Your emergency request has been received. A nurse will contact you shortly.',
      estimatedArrivalTime: '15-30 minutes',
    };
  },
};

export default {
  authAPI,
  userAPI,
  nursesAPI,
  appointmentsAPI,
  emergencyAPI,
  mockAPI,
}; 