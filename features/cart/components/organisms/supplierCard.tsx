import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { M_ProductCard } from '../molecules/productCard';
import { ProductVariant, Product, Supplier } from '../../types';

type SelectableProduct = {
  id: string;
  supplierId: string;
  productImage: any;
  productName: string;
  productVariant: string;
  quantity: number;
  productPrice: number;
  supplierName: string;
  isSelected: boolean;
};

interface SupplierCardProps {
  products: SelectableProduct[];
  supplierName?: string;
  isChecked: boolean;
  oncheckedChange: (newValue: boolean) => void;
  onItemToggle?: (id: string, value: boolean) => void;
  onItemQuantityChange?: (id: string, newQty: number) => void;
}

export const O_SupplierCard: React.FC<SupplierCardProps> = ({
  products,
  supplierName,
  isChecked,
  oncheckedChange,
  onItemToggle,
  onItemQuantityChange,
}) => {
  const [editMode, setEditMode] = useState(false);
  const allSelected = products.length > 0 && products.every((p) => p.isSelected);

  const handleHeaderToggle = (value: boolean) => {
    oncheckedChange(value);
  };

  const handleEditToggle = () => setEditMode((s) => !s);

  const renderProduct = ({ item }: { item: SelectableProduct }) => {
    return (
      <View className="m-1 p-1">
        <M_ProductCard
          product={item}
          isChecked={item.isSelected}
          oncheckedChange={() => onItemToggle?.(item.id, !item.isSelected)}
          onQuantityChange={(newQty) => onItemQuantityChange?.(item.id, newQty)}
          showQuantityControls={editMode}
        />
      </View>
    );
  };

  const headerName = supplierName || products[0]?.supplierName || 'Supplier';

  return (
    <View className="m-2 mb-4 overflow-hidden rounded-xl border border-[#9F9F9F]">
      <View className="flex-row items-center gap-2 bg-gray-50 p-3">
        <Checkbox value={allSelected} onValueChange={handleHeaderToggle} />
        <Image
          source={require('@/assets/images/Shopping_bag.png')}
          style={{ width: 18, height: 18 }}
          resizeMode="contain"
        />
        <Text className="font-Afacad font-semibold text-gray-800">{headerName}</Text>
        <Pressable
          onPress={handleEditToggle}
          className="ml-auto rounded-full bg-[#2C666E] px-3 py-1">
          <Text className="font-Afacad text-sm text-white">{editMode ? 'DONE' : 'EDIT'}</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingVertical: 1 }}
        scrollEnabled={false}
      />
    </View>
  );
};
