import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { ImagePlaceholder } from '../../../product/components/atoms/imagePlaceholder';

interface PaymentMethodProps {
  title: string;
  subtitle: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const PaymentMethodItem: React.FC<PaymentMethodProps> = ({
  title,
  subtitle,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center border-b border-gray-100 bg-white p-4">
      <ImagePlaceholder />

      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-[#1e1e1e]">{title}</Text>
        <Text className="text-xs italic text-gray-400">{subtitle}</Text>
      </View>

      {/* Checkbox */}
      <View
        className={`h-6 w-6 items-center justify-center rounded border-2 ${isSelected ? 'border-red-400 bg-red-400' : 'border-gray-400'}`}>
        {isSelected && <Text className="text-xs text-white">✓</Text>}
      </View>
    </TouchableOpacity>
  );
};
