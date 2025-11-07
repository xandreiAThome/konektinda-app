import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface AuthAtomTextInputProps extends TextInputProps {}

export const A_TextInput: React.FC<AuthAtomTextInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor= '#49454F' // Consistent placeholder color, old "#B0B0B0"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light, semi-transparent background
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000', // Input text color
  },
});