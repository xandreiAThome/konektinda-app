import React from 'react';
import { View, Text } from 'react-native';
import { ProductCard } from '../molecules/productCard';
import { Product } from '../../constants/mockData';

interface ProductGridProps {
  title: string;
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <View className="mt-6">
      {/* Title */}
      <Text className="font-afacad-bold mb-4 text-xl text-[#EB5555]">{title}</Text>

      {/* 2. Grid */}
      {/* FIX: Added 'flex-row flex-wrap justify-between' back
        This creates the 2-column layout.
      */}
      <View className="flex-row flex-wrap justify-between">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </View>
    </View>
  );
};
