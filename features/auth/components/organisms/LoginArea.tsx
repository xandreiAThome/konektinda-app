import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextStyle, ViewStyle } from 'react-native';
import { M_FormField } from '../molecules/FormField'; // Molecule: FormField
import { A_Button } from '../atoms/Button'; // Atom: Button

// We'll update the interface to remove redundant props and add style props for flexibility
interface AuthOrganismLoginAreaProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;

  // New props for dynamic styling from the parent template
  primaryButtonStyle?: ViewStyle;
  primaryButtonTextStyle?: TextStyle;
  forgotPasswordLinkStyle?: TextStyle;
}

export const O_LoginArea: React.FC<AuthOrganismLoginAreaProps> = ({
  onLogin,
  onForgotPassword,
  primaryButtonStyle,
  primaryButtonTextStyle,
  forgotPasswordLinkStyle,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    if (!username || !password) {
      Alert.alert('Login Error', 'Please enter both username and password.');
      return;
    }
    onLogin(username, password);
  };

  return (
    <View style={styles.container}>
      {/* Username Field */}
      <M_FormField
        label="Username"
        placeholder="Enter your username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />

      {/* Password Field */}
      <M_FormField
        label="Password"
        placeholder="Enter your password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {/* Forgot Password Button (This link is specific to the form, so we keep it) */}
      <A_Button
        title="Forgot Password?"
        variant="link"
        onPress={onForgotPassword}
        style={styles.forgotPasswordButton}
        textStyle={[
          styles.forgotPasswordText,
          // 🔑 FIX: Only include forgotPasswordLinkStyle if it exists.
          ...(forgotPasswordLinkStyle ? [forgotPasswordLinkStyle] : []),
        ]} // Apply the new prop
      />

      {/* Primary Login Button: Now accepts dynamic styles */}
      <A_Button
        title="Login"
        variant="primary"
        onPress={handleLoginPress}
        style={[styles.loginButton, primaryButtonStyle]}
        textStyle={primaryButtonTextStyle}
      />

      {/* 🔑 Removed the "Create Account" and "LOGIN AS SUPPLIER/CUSTOMER" buttons 
        as they are now handled by the parent template (LoginTemplate.tsx).
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: -20, // Adjust positioning to align with the design
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  forgotPasswordText: {
    fontSize: 12,
  },
  loginButton: {
    width: '100%',
    marginTop: 10,
  },
});
