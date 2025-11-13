import React, { useState } from 'react';
import { router } from 'expo-router';
import { SignupTemplate } from '../../features/auth/components/template/SignupTemplate';
import { useSignupForm } from '../../features/auth/hooks/useAuthForm';
import { signupWithEmail, saveUserBackend } from '../../features/auth/services';
import { SignupFormData } from '../../features/auth/schemas';
import { useAlert } from '../../hooks/useAlert';
import { useAuthStore } from '../../features/auth/hooks/useAuthStore';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { setUser } = useAuthStore();

  // Use react-hook-form with zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSignupForm();

  // --- Signup Handler ---
  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true);

      // Firebase authentication
      const result = await signupWithEmail(data.email, data.password);

      if (result.success && result.user) {
        // Save user to auth store
        setUser(result.user);

        // Save user to backend
        try {
          const idToken = await result.user.getIdToken();
          await saveUserBackend(idToken);
          console.log('✅ User saved to backend');
        } catch (backendError) {
          console.warn('⚠️ Failed to save user to backend:', backendError);
          // Continue anyway - user is authenticated in Firebase
        }

        showAlert({
          title: 'Account Created',
          message: `Welcome, ${data.email}!`,
          buttons: [
            {
              text: 'OK',
              onPress: () => router.replace('/(app)/(customer)/(tabs)'),
            },
          ],
        });
      } else {
        showAlert({
          title: 'Signup Error',
          message: result.error || 'Failed to create account. Please try again.',
        });
      }
    } catch (error) {
      showAlert({
        title: 'Signup Error',
        message: 'An unexpected error occurred. Please try again.',
      });
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Navigation Handlers ---
  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  // Create a wrapper for onSignup that matches the template's expected signature
  const onSignupWrapper = () => {
    handleSubmit(handleSignup)();
  };

  return (
    <SignupTemplate
      onSignup={onSignupWrapper}
      onBackToLogin={handleBackToLogin}
      control={control}
      errors={errors}
      isLoading={isLoading}
    />
  );
}
