import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';

interface ProductInfoProps extends ViewProps {
  productName?: string;
  size?: string;
  description?: string;
}

export const O_ProductInfo: React.FC<ProductInfoProps> = ({
  productName,
  size,
  description,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`items-center py-4 ${className}`} {...viewProps}>
      <Text className="text-center text-lg font-bold text-gray-800">{productName}</Text>
      {size && <Text className="mt-2 text-center text-sm text-gray-600">{size}</Text>}
      <Text className="px-4 py-4 text-center text-sm leading-6 text-gray-700">{description}</Text>
    </View>
  );
};
