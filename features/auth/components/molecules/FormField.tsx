import React from 'react';
import { View, TextInputProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

interface AuthMoleculeFormFieldProps extends TextInputProps {
  label: string;
}

export const M_FormField: React.FC<AuthMoleculeFormFieldProps> = ({
  label,
  className,
  ...inputProps
}) => {
  return (
    <View className={`mb-5 w-full ${className || ''}`}>
      <Text className="mb-2 text-sm font-semibold text-white">{label}</Text>
      <Input
        style={{ backgroundColor: '#ffffff' }}
        className="w-full rounded-lg px-4 py-2.5 text-base text-gray-900"
        placeholderClassName="text-gray-400"
        {...inputProps}
      />
    </View>
  );
};
