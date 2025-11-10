import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ImagePlaceholder } from '../atoms/imagePlaceholder';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  // Get first variant (primary variant)
  const variant = product.variants?.[0];
  const category = product.category;

  if (!variant) {
    return null; // Don't render if no variants
  }

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/product',
      params: {
        product_id: String(product.product_id),
      },
    });
  };

  // Calculate discounted price if discount exists
  const discountedPrice =
    variant.discount > 0 ? variant.price * (1 - variant.discount / 100) : variant.price;

  return (
    <Pressable onPress={handlePress} className="mb-4 w-[48%]">
      <View className="overflow-hidden rounded-xl bg-gray-100 p-3">
        {/* Image Placeholder */}
        <View className="mb-2 h-20 w-full items-center justify-center">
          <ImagePlaceholder />
        </View>

        {/* Text Content */}
        <View>
          {/* Category */}
          <Text className="font-sans text-[9px] text-gray-500">{category?.category_name}</Text>

          {/* Product Name */}
          <Text className="font-sans text-[11px] font-semibold text-[#1E1E1E]" numberOfLines={2}>
            {product.product_name}
          </Text>

          {/* Variant Name */}
          <Text className="my-1 font-sans text-[9px] text-gray-600">{variant.variant_name}</Text>

          {/* Price */}
          <View className="flex-row items-baseline gap-1">
            <Text className="font-sans text-[11px] font-bold text-[#EB5555]">
              ₱{discountedPrice.toFixed(2)}
            </Text>
            {variant.discount > 0 && (
              <>
                <Text className="font-sans text-[8px] text-gray-400 line-through">
                  ₱{variant.price.toFixed(2)}
                </Text>
                <Text className="font-sans text-[8px] font-bold text-red-600">
                  -{variant.discount}%
                </Text>
              </>
            )}
          </View>

          {/* Stock Status */}
          <Text
            className={`font-sans text-[8px] ${variant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
