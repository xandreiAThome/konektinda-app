import React from 'react';
import { View, ViewProps } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { O_LoginArea } from '../organisms/LoginArea';
import { Control, FieldErrors } from 'react-hook-form';
import { LoginFormData } from '../../schemas';

cssInterop(ExpoImage, { className: 'style' });

interface LoginTemplateProps extends ViewProps {
  onLogin: (_email: string, _password: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  control?: Control<LoginFormData>;
  errors?: FieldErrors<LoginFormData>;
  isLoading?: boolean;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  onLogin,
  onForgotPassword,
  onCreateAccount,
  control,
  errors,
  isLoading = false,
}) => {
  return (
    <View style={{ backgroundColor: '#0d9488' }} className="flex flex-1 items-center">
      <View className="flex w-full flex-1 flex-col items-center justify-center px-2">
        {/* Logo */}
        <View className="flex items-center justify-center p-8">
          <ExpoImage
            source={require('@/assets/images/KonekTinda_Logo.png')}
            className="h-32 w-64"
            contentFit="contain"
          />
        </View>

        {/* Login Form Area */}
        <View className="flex w-full max-w-sm items-center justify-center">
          <O_LoginArea
            onLogin={onLogin}
            onForgotPassword={onForgotPassword}
            control={control}
            errors={errors}
            isLoading={isLoading}
          />
        </View>

        {/* Create Account Link */}
        <Button variant="link" className="mb-1 px-0" onPress={onCreateAccount}>
          <Text className="text-sm font-semibold text-white">Create Account</Text>
        </Button>
      </View>
    </View>
  );
};
