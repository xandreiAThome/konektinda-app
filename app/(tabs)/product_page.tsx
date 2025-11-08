import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ProductTemplate } from '@/features/product/components';

export default function ProductScreen() {
  const params = useLocalSearchParams();
  const brand = Array.isArray(params.brand) ? params.brand[0] : params.brand;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const price = Array.isArray(params.price) ? params.price[0] : params.price;

  // Extract size from product name (e.g., "Soap (150g)" -> "150g")
  const sizeMatch = name?.match(/\(([^)]+)\)/);
  const size = sizeMatch ? sizeMatch[1] : '150g';

  // Generate description based on brand and product
  const description = `Premium ${brand} ${name}. High-quality personal care product with excellent value. Perfect for daily use and recommended by customers. Gentle on skin with long-lasting fragrance.`;

  return (
    <>
      <Stack.Screen options={{ title: name || 'Product' }} />
      <ProductTemplate
        brandName={brand || 'BRAND NAME'}
        productName={name || 'Product Name'}
        price={typeof price === 'string' ? parseFloat(price) : 100.0}
        size={size}
        description={description}
      />
    </>
  );
}
