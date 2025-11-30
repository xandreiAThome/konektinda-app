import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CartItem } from '../../types';
import { A_ProductInfo } from '../atoms/ProductInfo';
import Checkbox from 'expo-checkbox';

interface ProductCardProps {
  product: any;
  isChecked: boolean;
  oncheckedChange: (newValue: boolean) => void;
  onQuantityChange?: (newQuantity: number) => void;
  showQuantityControls?: boolean;
}

export const M_ProductCard: React.FC<ProductCardProps> = ({
  product,
  isChecked,
  oncheckedChange,
  onQuantityChange,
  showQuantityControls = false,
}) => {
  return (
    <View className="flex-row items-center gap-6 rounded-lg bg-white p-4 shadow">
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
  );
};
