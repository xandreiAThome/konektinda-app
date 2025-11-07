import React from 'react';
import { View, StyleSheet, Image, ViewProps } from 'react-native';
// ⚠️ Adjust path to AppColors based on where you placed the config file
import { AppColors } from '../../../../config/colors'; 
import { A_Image } from '../atoms/Image';
import { A_Button } from '../atoms/Button';
import { O_FormArea } from '../organisms/FormArea';
import { M_FormField } from '../molecules/FormField';
import { router } from 'expo-router';

const KonekTindaLogo = require('../../../../assets/images/splash.png'); // Adjust path


// Define the state structure (essential for the keyof operator)
interface SignupFormState {
    username: string;
    email: string;
    password: string;
}


interface SignupTemplateProps extends ViewProps {
  theme: 'supplier' | 'customer'; 
  // Handlers for form input and submission
  formState: SignupFormState; // Ensure formState uses this type too
  
  // 🔑 FIX HERE: Change 'string' to 'keyof SignupFormState'
  onInputChange: (field: keyof SignupFormState, value: string) => void;
  
  onSignup: () => void;
}

export const SignupTemplate: React.FC<SignupTemplateProps> = ({ 
  theme, 
  formState, 
  onInputChange,
  onSignup,
}) => {
  const isCustomer = theme === 'customer';
  
  const themeStyles = {
    background: isCustomer ? AppColors.CustomerBackground : AppColors.SupplierBackground,
    buttonColor: isCustomer ? AppColors.CustomerButton : AppColors.SupplierButton,
    linkText: isCustomer ? AppColors.CustomerLink : AppColors.SupplierLink,
  };

  return (
    <View style={[styles.fullScreenContainer, { backgroundColor: themeStyles.background }]}>
      <View style={styles.contentWrapper}>
        
        {/* Logo */}
        <A_Image source={KonekTindaLogo} style={styles.logo} />

        {/* Signup Form Area */}
        <O_FormArea style={styles.formArea}>
          <M_FormField
            label="Username"
            placeholder="Choose a username"
            onChangeText={(v) => onInputChange('username', v)}
            value={formState.username}
          />
          <M_FormField
            label="Email"
            placeholder="Enter your email"
            onChangeText={(v) => onInputChange('email', v)}
            value={formState.email}
            keyboardType="email-address"
          />
          <M_FormField
            label="Password"
            placeholder="Create a password"
            onChangeText={(v) => onInputChange('password', v)}
            value={formState.password}
            secureTextEntry
          />
          
          {/* Signup Button */}
          <A_Button
            title={`Register as ${isCustomer ? 'Customer' : 'Supplier'}`}
            variant="primary"
            onPress={onSignup}
            style={[styles.signupButton, { backgroundColor: themeStyles.buttonColor }]}
            textStyle={{ color: AppColors.White, fontSize: 18 }}
          />
        </O_FormArea>
        
        {/* Back to Login Link */}
        <A_Button
          title="Already have an account? Log in."
          variant="link"
          onPress={() => router.replace('/')}
          textStyle={{ color: themeStyles.linkText }}
          style={styles.loginLink}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 40,
  },
  formArea: {
    marginTop: 20, 
  },
  signupButton: {
    width: '100%',
    marginTop: 20,
  },
  loginLink: {
    marginTop: 15,
  }
});