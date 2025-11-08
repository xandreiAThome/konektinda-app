import React, { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { LoginTemplate } from '../features/auth/components/template/LoginTemplate';

export default function LoginPage() {
  // 🔑 KEY CHANGE: State to switch between modes
  const [loginMode, setLoginMode] = useState<'customer' | 'supplier'>('customer');

  const isCustomerMode = loginMode === 'customer';

  // --- Login Handler ---
  const handleLogin = (username: string, password: string) => {
    const role = isCustomerMode ? 'Customer' : 'Supplier';
    Alert.alert(`${role} Login Attempt`, `Logging in as ${role} with: ${username}`);
    // On success, navigate to the respective home screen or a shared home
    router.replace('/(tabs)');
  };

  // --- Mode Switch Handler ---
  const handleSwitchMode = () => {
    setLoginMode(isCustomerMode ? 'supplier' : 'customer');
  };

  // --- Other Navigation Handlers ---
  const handleCreateAccount = () => {
    const nextRole = isCustomerMode ? 'customer' : 'supplier';
    router.push({
      pathname: '/signup',
      params: { role: nextRole },
    });
  };

  const handleForgotPassword = () => {
    Alert.alert('Navigate', 'Forgot Password logic');
  };

  return (
    <LoginTemplate
      theme={loginMode}
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSwitchMode={handleSwitchMode}
      onCreateAccount={handleCreateAccount}
    />
  );
}
