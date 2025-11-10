import React from 'react';
import { View, ViewProps, Image } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { O_LoginArea } from '../organisms/LoginArea';

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
    <View style={{ backgroundColor: bgColor }} className="flex flex-1 items-center">
      <View className="flex w-full flex-1 flex-col items-center justify-center px-2">
        {/* Logo */}
        <Image
          source={require('@/assets/images/KonekTinda_Logo.png')}
          className="h-32 w-64"
          style={{ resizeMode: 'contain' }}
        />

        {/* 1. Login Form Area */}
        <View className="flex w-full max-w-sm items-center justify-center">
          <O_LoginArea onLogin={onLogin} onForgotPassword={onForgotPassword} />
        </View>

        {/* 2. Create Account Link */}
        <Button variant="link" className="mb-1 px-0" onPress={onCreateAccount}>
          <Text className="text-sm font-semibold text-white">Create Account</Text>
        </Button>

        {/* 3. Mode Switch Button */}
        <Button variant="ghost" className="" onPress={onSwitchMode}>
          <Text style={{ color: switchTextColor }} className="text-sm font-semibold">
            {isCustomer ? 'LOGIN AS SUPPLIER' : 'LOGIN AS CUSTOMER'}
          </Text>
        </Button>
      </View>
    </View>
  );
};
