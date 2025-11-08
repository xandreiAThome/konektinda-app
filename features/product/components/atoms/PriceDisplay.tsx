import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';

interface PriceDisplayProps extends ViewProps {
  price: number;
  currency?: string;
}

export const A_PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  currency = 'P',
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`py-2 ${className}`} {...viewProps}>
      <Text className="text-lg font-bold text-red-500">
        {currency}
        {price.toFixed(2)}
      </Text>
    </View>
  );
};
