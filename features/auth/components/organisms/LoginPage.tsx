import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Assume you have the logo image imported/required
const konekTindaLogo = require('../assets/logo.png'); // Adjust path as needed

const LoginPage = () => {
  return (
    // 1. Main Container View with the Teal/Dark-Green background
    <View style={styles.container}>
      
      {/* 2. Header Text */}
      <Text style={styles.headerText}>Login Page</Text>

      {/* 3. Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={konekTindaLogo} 
          style={styles.logo}
          resizeMode="contain" // Ensures the whole logo is visible
        />
      </View>

      {/* Input Group: Username */}
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#B0B0B0" 
      />

      {/* Input Group: Password */}
      <Text style={styles.inputLabel}>Password</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry // Hides the password input
        />
        {/* 'Forgot Password?' link */}
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Secondary Links */}
      <TouchableOpacity style={styles.secondaryLink}>
        <Text style={styles.secondaryLinkText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryLink}>
        <Text style={styles.secondaryLinkText}>LOGIN AS SUPPLIER</Text>
      </TouchableOpacity>
    
    </View>
  );
};

// --- Styling Section ---
const styles = StyleSheet.create({
  // The dark teal/dark green background color 
  container: {
    flex: 1, // Takes up the whole screen
    backgroundColor: '#357C7B', // Approximate color from the image
    padding: 20,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'flex-start', // Start content from the top
    paddingTop: 50, // Add top padding for header/status bar space
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Logo container to manage spacing
  logoContainer: {
    height: 200, // Fixed height for the logo area
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 250, // Adjust size based on your actual logo file
    height: 100,
  },
  inputLabel: {
    color: 'white',
    alignSelf: 'flex-start', // Align label to the left
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  // Style for the input fields themselves
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light, semi-transparent background
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    minWidth: 300, // Ensure it fills the width of the main content area
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#F4A261', // Use an orange/red color for contrast
    fontSize: 12,
  },
  // Primary Login Button (Red/Coral color)
  loginButton: {
    width: '100%',
    backgroundColor: '#E76F51', // Approximate coral red color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    minWidth: 300,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Style for the 'Create Account' and 'LOGIN AS SUPPLIER' links
  secondaryLink: {
    marginTop: 15,
  },
  secondaryLinkText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});

export default LoginPage;