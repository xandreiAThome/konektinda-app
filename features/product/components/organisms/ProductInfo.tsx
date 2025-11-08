import React from 'react';
import { View, ViewProps, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/ui/text';
import { A_ProductHeader } from '../atoms/ProductHeader';
import { A_PriceDisplay } from '../atoms/PriceDisplay';

interface ProductInfoProps extends ViewProps {
  brandName: string;
  productName: string;
  size: string;
  price: number;
  description: string;
}

export const O_ProductInfo: React.FC<ProductInfoProps> = ({
  brandName,
  productName,
  size,
  price,
  description,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`items-center py-4 ${className}`} {...viewProps}>
      <A_ProductHeader brandName={brandName} productName={productName} size={size} />
      <A_PriceDisplay price={price} currency="P" />
      <Text className="px-4 text-center text-sm leading-6 text-gray-700">{description}</Text>
    </View>
  );
};
