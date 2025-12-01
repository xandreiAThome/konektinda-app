import React from 'react';
import { View, ViewProps, ImageSourcePropType, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

interface ProductInfoProps extends ViewProps {
  productImage: ImageSourcePropType;
  productName: string;
  productVariant: string;
  quantity: number;
  productPrice: number;
  onQuantityChange?: (newQuantity: number) => void;
  showControls?: boolean;
}

export const A_ProductInfo: React.FC<ProductInfoProps> = ({
  productImage,
  productName,
  productVariant,
  quantity,
  productPrice,
  onQuantityChange,
  showControls = false,
  className = '',
  ...viewProps
}) => {
  let totalItemPrice = productPrice * quantity;

  const handleIncrement = () => {
    onQuantityChange?.(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange?.(quantity - 1);
    }
  };

  return (
    <View className={`flex-row items-center gap-4 ${className}`} {...viewProps}>
      <Image source={productImage} style={{ width: 80, height: 80 }} resizeMode="contain" />
      <View className="flex-1">
        <Text className="font-Afacad text-sm font-bold">{productName}</Text>
        <Text className="font-Afacad text-xs text-[#525252]">{productVariant}</Text>
        <Text className="font-Afacad text-xs font-bold text-[#3C7F64]">x{quantity} pc</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="font-Afacad text-lg font-bold italic text-[#EB5555]">
          ₱{totalItemPrice.toFixed(2)}
        </Text>
      </View>
      {showControls && (
        <View className="mt-2 items-center gap-2">
          <Pressable onPress={handleIncrement} className="">
            <Text className="font-Afacad text-lg font-bold">+</Text>
          </Pressable>
          <Text className="w-5 text-center text-base font-semibold">{quantity}</Text>
          <Pressable onPress={handleDecrement} className="">
            <Text className="font-Afacad text-lg font-bold">−</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
