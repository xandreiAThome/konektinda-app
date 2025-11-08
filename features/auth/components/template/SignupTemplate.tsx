import React from 'react';
import { View, ViewProps } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { M_FormField } from '../molecules/FormField';
import { router } from 'expo-router';
import { Image } from 'expo-image';

interface SignupFormState {
  username: string;
  email: string;
  password: string;
}

interface SignupTemplateProps extends ViewProps {
  theme: 'supplier' | 'customer';
  formState: SignupFormState;
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
  const bgColor = isCustomer ? '#0d9488' : '#ef4444';
  const buttonColor = isCustomer ? '#ef4444' : '#0d9488';
  const linkColor = isCustomer ? '#fed7aa' : '#f3f4f6';

  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 items-center">
      <View className="w-full flex-1 items-center justify-center gap-6 px-4 pb-5 pt-8">
        {/* Logo */}

        {/* Signup Form Area */}
        <View className="w-full max-w-96 items-center">
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
          <Button
            variant="default"
            style={{ backgroundColor: buttonColor }}
            className="w-full rounded-lg px-4 py-3"
            onPress={onSignup}>
            <Text className="text-center text-base font-semibold text-white">
              Register as {isCustomer ? 'Customer' : 'Supplier'}
            </Text>
          </Button>
        </View>

        {/* Back to Login Link */}
        <Button variant="ghost" className="px-0" onPress={() => router.replace('/')}>
          <Text style={{ color: linkColor }} className="text-sm font-semibold">
            Already have an account? Log in.
          </Text>
        </Button>
      </View>
    </View>
  );
};
