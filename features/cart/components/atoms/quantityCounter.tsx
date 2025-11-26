import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface QuantityCounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChangeText: (text: string) => void;
}

export const QuantityCounter: React.FC<QuantityCounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  onChangeText,
}) => (
  <View className="flex-row items-center">
    <TextInput
      className="w-16 rounded-lg border border-gray-300 bg-gray-100 p-3 text-center font-sans text-base text-[#1e1e1e]"
      value={String(value)}
      onChangeText={onChangeText}
      keyboardType="number-pad"
    />

    <View className="ml-2">
      <TouchableOpacity
        onPress={onIncrement}
        className="rounded-md border border-gray-300 bg-gray-100 p-1 px-2">
        <Text className="font-afacad-bold text-lg text-gray-700">+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDecrement}
        className="mt-1 rounded-md border border-gray-300 bg-gray-100 p-1 px-2">
        <Text className="font-afacad-bold text-lg text-gray-700">-</Text>
      </TouchableOpacity>
    </View>
  </View>
);
