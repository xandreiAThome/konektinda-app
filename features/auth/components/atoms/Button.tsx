import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle } from 'react-native';

interface AuthAtomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'link'; // 'primary' for Login, 'link' for Forgot Password/Create Account
  textStyle?: TextStyle | TextStyle[];
}

export const A_Button: React.FC<AuthAtomButtonProps> = ({ title, variant = 'primary', style, textStyle, ...props }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.baseButton, 
        variant === 'primary' && styles.primaryButton, 
        variant === 'link' && styles.linkButton, 
        style
      ]} 
      {...props}
    >
      <Text 
        style={[
          styles.baseButtonText, 
          variant === 'primary' && styles.primaryButtonText, 
          variant === 'link' && styles.linkButtonText, 
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100, // Ensure a minimum touch target
  },
  baseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Primary variant (e.g., Login button)
  primaryButton: {
    backgroundColor: '#E76F51', // Coral Red
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
  },
  // Link variant (e.g., Forgot Password, Create Account)
  linkButton: {
    backgroundColor: 'transparent',
    padding: 5, // Less padding for link-like appearance
  },
  linkButtonText: {
    color: 'white', // Default link text color
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});