import React from 'react';
import { View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { M_FormField } from '../molecules/FormField';
import { Text } from '@/components/ui/text';
import { SignupFormData } from '../../schemas';

interface O_SignupAreaProps {
  control?: Control<SignupFormData>;
  errors?: FieldErrors<SignupFormData>;
}

export const O_SignupArea: React.FC<O_SignupAreaProps> = ({ control, errors }) => {
  return (
    <View className="w-full items-center gap-4">
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full">
            <M_FormField
              label="Email"
              placeholder="Enter your email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors?.email && (
              <Text className="mt-1 text-xs text-red-600">{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full">
            <M_FormField
              label="Password"
              placeholder="Create a password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
            />
            {errors?.password && (
              <Text className="mt-1 text-xs text-red-600">{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      {/* Confirm Password Field */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full">
            <M_FormField
              label="Confirm Password"
              placeholder="Confirm your password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
            />
            {errors?.confirmPassword && (
              <Text className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
