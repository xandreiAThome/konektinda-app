import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { A_ProductInfo } from '../atoms/ProductInfo';
import Checkbox from 'expo-checkbox';

interface ProductCardProps {
  product: any;
  isChecked: boolean;
  oncheckedChange: (_: boolean) => void;
  onQuantityChange?: (_: number) => void;
  showQuantityControls?: boolean;
  onDelete?: () => void;
}

export const M_ProductCard: React.FC<ProductCardProps> = ({
  product,
  isChecked,
  oncheckedChange,
  onQuantityChange,
  showQuantityControls = false,
  onDelete,
}) => {
  return (
    <View className="rounded-lg bg-white p-4 shadow">
      <View className="flex-row items-center gap-6">
        <Checkbox value={isChecked} onValueChange={oncheckedChange} />
        <A_ProductInfo
          productImage={product.productImage}
          productName={product.productName}
          productVariant={product.productVariant}
          quantity={product.quantity}
          productPrice={product.productPrice}
          onQuantityChange={onQuantityChange}
          showControls={showQuantityControls}
          className="flex-1"
        />
      </View>
      {showQuantityControls && onDelete && (
        <View className="mt-3 flex-row justify-end">
          <Pressable onPress={onDelete} className="rounded-lg bg-red-100 px-3 py-2">
            <Text className="font-Afacad text-sm font-semibold text-red-600">Remove</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
