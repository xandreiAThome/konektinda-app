import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface AuthAtomTextProps extends TextProps {
  variant?: 'heading' | 'label' | 'body' | 'link'; // Define text variants
}

export const A_Text: React.FC<AuthAtomTextProps> = ({ children, variant = 'body', style, ...props }) => {
  return (
    <Text 
      style={[
        styles.baseText,
        variant === 'heading' && styles.headingText,
        variant === 'label' && styles.labelText,
        variant === 'link' && styles.linkText,
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    color: 'white', // Default text color for auth screens
    fontSize: 16,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 12,
    color: '#F4A261', // Orange/red for links
    textDecorationLine: 'underline',
  }
});