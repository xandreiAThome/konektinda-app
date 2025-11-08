import React, { useState } from 'react';
import { Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// ⚠️ Adjust path to your SignupTemplate component
import { SignupTemplate } from '../features/auth/components/template/SignupTemplate';

// Define the state structure for the form
interface SignupFormState {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  // 1. Theme and State Management
  // Retrieve the 'role' (theme) from the URL query parameters
  const { role } = useLocalSearchParams();

  // Determine the theme: defaults to 'customer' if role is not 'supplier'
  const initialTheme = role === 'supplier' ? 'supplier' : 'customer';

  const [formState, setFormState] = useState<SignupFormState>({
    username: '',
    email: '',
    password: '',
  });

  // 2. Business Logic Handlers

  // Handler to update the form state dynamically
  const handleInputChange = (field: keyof SignupFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for form submission
  const handleSignup = () => {
    if (!formState.username || !formState.email || !formState.password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const registrationRole = initialTheme === 'customer' ? 'Customer' : 'Supplier';

    // 💡 Replace this Alert with your actual API call for registration
    Alert.alert('Registration Success', `Registered as ${registrationRole}. Welcome!`);

    // Navigate to the tabs screen after successful signup
    router.replace('/(tabs)');
  };

  // 3. Render the Thematic Template
  return (
    <SignupTemplate
      theme={initialTheme} // Pass the determined theme to the template
      formState={formState}
      onInputChange={handleInputChange}
      onSignup={handleSignup}
    />
  );
}
