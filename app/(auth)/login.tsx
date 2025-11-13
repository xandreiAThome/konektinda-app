import React, { useState } from 'react';
import { router } from 'expo-router';
import { LoginTemplate } from '../../features/auth/components/template/LoginTemplate';
import { useLoginForm } from '../../features/auth/hooks/useAuthForm';
import { loginWithEmail, saveUserBackend } from '../../features/auth/services';
import { useAlert } from '../../hooks/useAlert';
import { useAuthStore } from '../../features/auth/hooks/useAuthStore';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { setUser } = useAuthStore();

  // Use react-hook-form with zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  // --- Login Handler ---
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      // Firebase authentication
      const result = await loginWithEmail(data.email, data.password);

      if (result.success && result.user) {
        // Save user to auth store
        setUser(result.user);
        try {
          const idToken = await result.user.getIdToken();
          await saveUserBackend(idToken);
          console.log('✅ User saved to backend');
        } catch (backendError) {
          console.warn('⚠️ Failed to save user to backend:', backendError);
          // Continue anyway - user is authenticated in Firebase
        }

        showAlert({
          title: 'Login Success',
          message: `Welcome back, ${data.email}!`,
          buttons: [
            {
              text: 'OK',
              onPress: () => router.replace('/(app)/(customer)/(tabs)'),
            },
          ],
        });
      } else {
        showAlert({
          title: 'Login Error',
          message: result.error || 'Failed to login. Please try again.',
        });
      }
    } catch (error) {
      showAlert({
        title: 'Login Error',
        message: 'An unexpected error occurred. Please try again.',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Navigation Handlers ---
  const handleCreateAccount = () => {
    router.push({
      pathname: '/(auth)/signup',
    });
  };

  const handleForgotPassword = () => {
    showAlert({
      title: 'Forgot Password',
      message: 'Password reset functionality coming soon!',
    });
  };

  // Create a wrapper for onLogin that matches the template's expected signature
  const onLoginWrapper = (_email: string, _password: string) => {
    handleSubmit(handleLogin)();
  };

  return (
    <LoginTemplate
      onLogin={onLoginWrapper}
      onForgotPassword={handleForgotPassword}
      onCreateAccount={handleCreateAccount}
      control={control}
      errors={errors}
      isLoading={isLoading}
    />
  );
}
