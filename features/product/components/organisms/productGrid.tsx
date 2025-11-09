import React from 'react';
import { View, Text } from 'react-native';
import { ProductCard } from '../molecules/productCard';
import { ProductWithVariantAndCategory } from '../../types';

interface ProductGridProps {
  title: string;
  products: ProductWithVariantAndCategory[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <View className="mt-6">
      {/* Title */}
      <Text className="font-afacad-bold mb-4 text-xl text-[#EB5555]">{title}</Text>

      {/* 2-Column Grid */}
      <View className="flex-row flex-wrap justify-between">
        {products.map((item) => (
          <ProductCard
            key={`${item.product.product_id}-${item.variant.product_variant_id}`}
            variant={item.variant}
            product={item.product}
            category={item.category}
          />
        ))}
      </View>
    </View>
  );
};
