import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';

interface ProductHeaderProps extends ViewProps {
  brandName: string;
  productName: string;
  size: string;
}

export const A_ProductHeader: React.FC<ProductHeaderProps> = ({
  brandName,
  productName,
  size,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`items-center justify-center py-4 ${className}`} {...viewProps}>
      <Text className="text-lg font-bold">{brandName}</Text>
      <Text className="text-base font-semibold">{productName}</Text>
      <Text className="text-sm text-gray-600">({size})</Text>
    </View>
  );
};
