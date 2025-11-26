import React from 'react';
import { View, ViewProps, ImageSourcePropType, Image } from 'react-native';
import { Text } from '@/components/ui/text';

interface ProductInfoProps extends ViewProps {
  productImage: ImageSourcePropType;
  productName: string;
  productVariant: string;
  quantity: number;
  productPrice: number;
}

export const A_ProductInfo: React.FC<ProductInfoProps> = ({
  productImage,
  productName,
  productVariant,
  quantity,
  productPrice,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`flex-row items-center gap-4 ${className}`} {...viewProps}>
      <Image source={productImage} style={{ width: 80, height: 80 }} resizeMode="contain" />
      <View className="flex-1">
        <Text> {productName} </Text>
        <Text> {productVariant} </Text>
        <Text> {quantity} </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold italic text-[#EB5555]">
          {' '}
          ₱{productPrice.toFixed(2)}{' '}
        </Text>
      </View>
    </View>
  );
};
