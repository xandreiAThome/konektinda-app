import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button } from '@/components/ui/button';
import { M_FormField } from '../molecules/FormField';
import { Text } from '@/components/ui/text';

interface AuthOrganismLoginAreaProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
}

export const O_LoginArea: React.FC<AuthOrganismLoginAreaProps> = ({
  onLogin,
  onForgotPassword,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    if (!username || !password) {
      Alert.alert('Login Error', 'Please enter both username and password.');
      return;
    }
    onLogin(username, password);
  };

  return (
    <View className="w-full items-center">
      <M_FormField
        label="Username"
        placeholder="Enter your username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />

      <M_FormField
        label="Password"
        placeholder="Enter your password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button variant="link" className="mb-4 self-end px-2" onPress={onForgotPassword}>
        <Text className="text-xs text-white">Forgot Password?</Text>
      </Button>

      <Button
        variant="default"
        className="w-full rounded-md bg-[#ef4444] drop-shadow-md hover:bg-red-600"
        onPress={handleLoginPress}>
        <Text className="text-center text-base font-semibold text-white">Login</Text>
      </Button>
    </View>
  );
};
