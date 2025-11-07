import React from 'react';
import { View, Text } from 'react-native';
import { ImagePlaceholder } from '../atoms/imagePlaceholder';
import { Product } from '../../constants/mockData';

type ProductCardProps = Omit<Product, 'id'>;

export const ProductCard: React.FC<ProductCardProps> = ({ 
  brand, 
  name, 
  price, 
  imageUrl 
}) => {
  return (
    // FIX:
    // 1. Re-added 'w-[48%]' for the 2-column grid
    // 2. Kept 'flex-row' for the internal layout
    <View className="w-[48%] bg-gray-100 rounded-xl overflow-hidden mb-4 flex-row items-center py-4 px-2">
      
      {/* 1. Image Placeholder (now a small square) */}
      <ImagePlaceholder />
      
      {/* 2. Text Content */}
      {/* FIX: 
        - 'flex-1' makes this View take the remaining width
        - 'p-2' reduces padding to fit the small card
      */}
      <View className="pl-2 flex-1">
        
        <Text className="text-[11px] font-sans text-[#1E1E1E]" numberOfLines={1}>
          {brand}
        </Text>
        
        {/* FIX: Removed 'font-afacad'. It will now use 'font-sans'
          (which is Afacad-Regular) by default.
        */}
        <Text className="text-[10px] font-sans text-[#1E1E1E] my-1" numberOfLines={2}>
          {name}
        </Text>
        
        {/* USE BOLD FONT */}
        <Text className="text-[11px] font-sans-italic text-[#EB5555]" numberOfLines={1}>
          Php {price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};