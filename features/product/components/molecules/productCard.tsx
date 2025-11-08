import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ImagePlaceholder } from '../atoms/imagePlaceholder';
import { Product } from '../../constants/mockData';

type ProductCardProps = Product & { onPress?: (product: Product) => void };

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  brand,
  name,
  price,
  imageUrl,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    // Extract size from product name (e.g., "Soap (150g)" -> "150g")
    const sizeMatch = name?.match(/\(([^)]+)\)/);
    const size = sizeMatch ? sizeMatch[1] : '150g';

    // Generate description based on brand and product
    const description = `Premium ${brand} ${name}. High-quality personal care product with excellent value. Perfect for daily use and recommended by customers. Gentle on skin with long-lasting fragrance.`;

    if (onPress) {
      onPress({ id, brand, name, price, imageUrl });
    } else {
      // Default navigation to product detail screen
      router.push({
        pathname: '/(tabs)/product_page',
        params: { productId: id, brand, name, price, size, description },
      });
    }
  };

  return (
    // FIX:
    // 1. Re-added 'w-[48%]' for the 2-column grid
    // 2. Kept 'flex-row' for the internal layout
    <Pressable onPress={handlePress} className="mb-4 w-[48%]">
      <View className="flex-row items-center overflow-hidden rounded-xl bg-gray-100 px-2 py-4">
        {/* 1. Image Placeholder (now a small square) */}
        <ImagePlaceholder />

        {/* 2. Text Content */}
        {/* FIX: 
          - 'flex-1' makes this View take the remaining width
          - 'p-2' reduces padding to fit the small card
        */}
        <View className="flex-1 pl-2">
          <Text className="font-sans text-[11px] text-[#1E1E1E]" numberOfLines={1}>
            {brand}
          </Text>

          {/* FIX: Removed 'font-afacad'. It will now use 'font-sans'
            (which is Afacad-Regular) by default.
          */}
          <Text className="my-1 font-sans text-[10px] text-[#1E1E1E]" numberOfLines={2}>
            {name}
          </Text>

          {/* USE BOLD FONT */}
          <Text className="font-sans-italic text-[11px] text-[#EB5555]" numberOfLines={1}>
            Php {price.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
