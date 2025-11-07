import React from 'react';
import { View, StyleSheet, ViewProps, TextStyle, ViewStyle } from 'react-native';
// ⚠️ Adjust path to AppColors based on where you placed the config file
import { AppColors } from '../../../../config/colors';
import { A_Image } from '../atoms/Image';
import { A_Button } from '../atoms/Button';
import { O_FormArea } from '../organisms/FormArea';
import { O_LoginArea } from '../organisms/LoginArea';

// Adjust path to the logo asset relative to this file
const KonekTindaLogo = require('../../../../assets/images/splash.png');

// --- Props Interface ---
// Props passed down to the O_LoginArea organism
type LoginAreaProps = React.ComponentProps<typeof O_LoginArea>;

interface LoginTemplateProps extends ViewProps {
  theme: 'supplier' | 'customer'; // The mode state managed in app/index.tsx
  loginProps: LoginAreaProps; // All handler functions (onLogin, onForgotPassword)
  onSwitchMode: () => void; // Handler to change the theme state
  onCreateAccount: () => void; // Handler to navigate to the signup page
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  theme,
  loginProps,
  onSwitchMode,
  onCreateAccount,
}) => {
  const isCustomer = theme === 'customer';

  // 🔑 Theme-Dependent Styles and Text
  const themeStyles: {
    background: string;
    buttonColor: string;
    linkText: string;
    switchText: string;
    switchTextColor: string;
  } = {
    // Background and primary button color swap
    background: isCustomer ? AppColors.CustomerBackground : AppColors.SupplierBackground,
    buttonColor: isCustomer ? AppColors.CustomerButton : AppColors.SupplierButton,

    // Link styles (Forgot Password, Create Account)
    linkText: isCustomer ? AppColors.CustomerLink : AppColors.SupplierLink,

    // Switch button text and color
    switchText: isCustomer ? 'LOGIN AS SUPPLIER' : 'LOGIN AS CUSTOMER',
    switchTextColor: isCustomer ? AppColors.White : AppColors.Black,
  };

  // Override the Forgot Password link style to use the theme's link color
  const forgotPasswordLinkStyle: TextStyle = { color: themeStyles.linkText };

  return (
    <View style={[styles.fullScreenContainer, { backgroundColor: themeStyles.background }]}>
      <View style={styles.contentWrapper}>
        {/* Logo */}
        <A_Image source={KonekTindaLogo} style={styles.logo} />

        {/* 1. Login Form Area */}
        <O_FormArea style={styles.formArea}>
          <O_LoginArea
            {...loginProps}
            // Overriding styles passed down to atoms inside the organism
            primaryButtonStyle={{ backgroundColor: themeStyles.buttonColor }}
            primaryButtonTextStyle={{ color: AppColors.White }}
            forgotPasswordLinkStyle={forgotPasswordLinkStyle}
          />
        </O_FormArea>

        {/* 2. Create Account Link (Always visible, style matches theme) */}
        <A_Button
          title="Create Account"
          variant="link"
          onPress={onCreateAccount}
          textStyle={{ color: themeStyles.linkText }}
          style={styles.createAccountLink}
        />

        {/* 3. Mode Switch Button (Positioned at the bottom) */}
        <A_Button
          title={themeStyles.switchText}
          variant="link"
          onPress={onSwitchMode}
          textStyle={{ color: themeStyles.switchTextColor, fontWeight: 'bold', fontSize: 16 }}
          style={styles.switchButton}
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
    justifyContent: 'center', // Vertically centers content
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 60,
  },
  formArea: {
    marginBottom: 5, // Reduce space between form and links
  },
  createAccountLink: {
    marginBottom: 5,
  },
  switchButton: {
    // Positioned below the main form content, slightly offset
    marginTop: 10,
  },
});
