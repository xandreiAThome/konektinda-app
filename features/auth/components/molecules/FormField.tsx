import React from 'react';
import { View, StyleSheet, TextInputProps } from 'react-native';
import { A_Text } from '../atoms/Text';         // Atom: Text for label
import { A_TextInput } from '../atoms/TextInput'; // Atom: TextInput field

interface AuthMoleculeFormFieldProps extends TextInputProps {
  label: string;
}

export const M_FormField: React.FC<AuthMoleculeFormFieldProps> = ({ label, style, ...inputProps }) => {
  return (
    <View style={[styles.container, style]}>
      <A_Text variant="label" style={styles.label}>{label}</A_Text>
      <A_TextInput {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
});