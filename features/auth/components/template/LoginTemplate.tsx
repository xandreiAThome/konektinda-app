import React from 'react';
import { View, ViewProps } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { O_LoginArea } from '../organisms/LoginArea';
import { Image } from 'expo-image';

interface LoginTemplateProps extends ViewProps {
  theme: 'supplier' | 'customer';
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
  onSwitchMode: () => void;
  onCreateAccount: () => void;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  theme,
  onLogin,
  onForgotPassword,
  onSwitchMode,
  onCreateAccount,
}) => {
  const isCustomer = theme === 'customer';
  const bgColor = isCustomer ? '#0d9488' : '#ef4444';
  const buttonColor = isCustomer ? '#ef4444' : '#0d9488';
  const linkColor = isCustomer ? '#fed7aa' : '#f3f4f6';
  const switchTextColor = '#ffffff';

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 items-center">
      <View className="w-full flex-1 items-center justify-center gap-8 px-4 pb-5 pt-8">
        {/* Logo */}
        <Image source={require('@/assets/images/logo.webp')} className="h-28 w-28" />

        {/* 1. Login Form Area */}
        <View className="w-full max-w-sm items-center">
          <O_LoginArea onLogin={onLogin} onForgotPassword={onForgotPassword} />
        </View>

        {/* 2. Create Account Link */}
        <Button variant="link" className="mb-1 px-0" onPress={onCreateAccount}>
          <Text className="text-sm font-semibold text-white">Create Account</Text>
        </Button>

        {/* 3. Mode Switch Button */}
        <Button variant="ghost" className="mt-auto px-0" onPress={onSwitchMode}>
          <Text style={{ color: switchTextColor }} className="text-sm font-semibold">
            {isCustomer ? 'LOGIN AS SUPPLIER' : 'LOGIN AS CUSTOMER'}
          </Text>
        </Button>
      </View>
    </View>
  );
};
