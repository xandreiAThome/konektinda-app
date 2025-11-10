import React from 'react';
import { ProductDetailTemplate } from '@/features/product/components';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function ProductScreen() {
  const params = useLocalSearchParams();

  // Get product_id from params
  const product_id = Array.isArray(params.product_id) ? params.product_id[0] : params.product_id;

  return (
    <>
      <Stack.Screen options={{ title: 'Product Details' }} />
      <ProductDetailTemplate product_id={product_id || ''} />
    </>
  );
}
