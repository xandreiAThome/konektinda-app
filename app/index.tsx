import React, { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
// Import the new Template
import { LoginTemplate } from '../features/auth/components/template/LoginTemplate'; 

export default function LoginPage() {
  // 🔑 KEY CHANGE: State to switch between modes
  const [loginMode, setLoginMode] = useState<'customer' | 'supplier'>('customer');

  const isCustomerMode = loginMode === 'customer';

  // --- Login Handler ---
  const handleLogin = (username: string, password: string) => {
    const role = isCustomerMode ? 'Customer' : 'Supplier';
    Alert.alert(
      `${role} Login Attempt`,
      `Logging in as ${role} with: ${username}`
    );
    // On success, navigate to the respective home screen or a shared home
    router.replace('/(tabs)'); 
  };
  
  // --- Mode Switch Handler ---
  const handleSwitchMode = () => {
    setLoginMode(isCustomerMode ? 'supplier' : 'customer');
  };
  
  // --- Other Navigation Handlers (remain the same) ---
  const handleCreateAccount = () => {
    const nextRole = isCustomerMode ? 'customer' : 'supplier';
    router.push({
      pathname: '/signup',
      params: { role: nextRole },
    });
  };
  const handleLoginAsSupplier = () => {
    // This button is removed and replaced by the single switch, but we keep the logic structure
    console.log('Using central switch.');
  };
  const handleForgotPassword = () => {
    Alert.alert('Navigate', 'Forgot Password logic');
  };

  // --- Assembling the Props for the Template ---
  const loginProps = {
    onLogin: handleLogin,
    onCreateAccount: handleCreateAccount,
    onLoginAsSupplier: handleLoginAsSupplier, // Still passed, but the O_LoginArea will ignore the UI element
    onForgotPassword: handleForgotPassword,
  };

  return (
    <LoginTemplate
      theme={loginMode}
      loginProps={loginProps} // Contains onLogin, onForgotPassword
      onSwitchMode={handleSwitchMode} 
      // 🔑 FIX: Add the required prop here!
      onCreateAccount={handleCreateAccount}
    />
  );
}