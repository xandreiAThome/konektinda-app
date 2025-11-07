import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface AuthOrganismFormAreaProps extends ViewProps {
  // You can add props for different form area styles, e'g' background
}

export const O_FormArea: React.FC<AuthOrganismFormAreaProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%', // Occupy most of the screen width
    maxWidth: 400, // Max width for larger screens (web)
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 10,
    // No specific background shown in the design, so keep it transparent for now.
    // If it had a distinct card-like background, it would go here.
  },
});