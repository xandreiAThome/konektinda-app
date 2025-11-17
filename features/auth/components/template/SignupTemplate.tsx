import React from 'react';
import { View, ViewProps } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { Control, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { O_SignupArea } from '../organisms/SignupArea';
import { SignupFormData } from '../../schemas';

cssInterop(ExpoImage, { className: 'style' });

interface SignupTemplateProps extends ViewProps {
  onSignup: () => void;
  onBackToLogin: () => void;
  control?: Control<SignupFormData>;
  errors?: FieldErrors<SignupFormData>;
  isLoading?: boolean;
}

export const SignupTemplate: React.FC<SignupTemplateProps> = ({
  onSignup,
  onBackToLogin,
  control,
  errors,
  isLoading,
}) => {
  // Customer-only theme (teal color)
  const bgColor = '#0d9488';
  const linkColor = '#fed7aa';

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 items-center">
      <View className="w-full flex-1 items-center justify-center gap-6 px-4 pb-5 pt-8">
        {/* Logo Placeholder */}
        <Text className="text-2xl font-bold text-white">KonektindaApp</Text>

        {/* Signup Form Area */}
        <View className="w-full max-w-96 items-center">
          <O_SignupArea control={control} errors={errors} />

          {/* Signup Button */}
          <Button
            variant="default"
            className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3"
            onPress={onSignup}
            disabled={isLoading}>
            <Text className="text-center text-base font-semibold text-white">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </Button>
        </View>

        {/* Back to Login Link */}
        <Button variant="ghost" className="px-0" onPress={onBackToLogin}>
          <Text style={{ color: linkColor }} className="text-sm font-semibold">
            Already have an account? Log in
          </Text>
        </Button>
      </View>
    </View>
  );
};
