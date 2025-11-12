import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { M_FormField } from '../molecules/FormField';
import { Text } from '@/components/ui/text';
import { Controller } from 'react-hook-form';

interface AuthOrganismLoginAreaProps {
  onLogin: (_email: string, _password: string) => void;
  onForgotPassword: () => void;
  control: any;
  errors: any;
  isLoading?: boolean;
}

export const O_LoginArea: React.FC<AuthOrganismLoginAreaProps> = ({
  onLogin,
  onForgotPassword,
  control,
  errors,
  isLoading = false,
}) => {
  return (
    <View className="w-full items-center">
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
            {errors?.email && <Text className="text-xs text-red-500">{errors.email.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full">
            <M_FormField
              label="Password"
              placeholder="Enter your password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
            />
            {errors?.password && (
              <Text className="text-xs text-red-500">{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Button variant="link" className="mb-4 self-end px-2" onPress={onForgotPassword}>
        <Text className="text-xs text-white">Forgot Password?</Text>
      </Button>

      <Button
        variant="default"
        className="w-full rounded-md bg-[#ef4444] drop-shadow-md hover:bg-red-600"
        onPress={() => onLogin('', '')}
        disabled={isLoading}>
        <Text className="text-center text-base font-semibold text-white">
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </Button>
    </View>
  );
};
