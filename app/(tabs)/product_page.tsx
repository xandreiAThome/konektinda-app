import React from 'react';
import { Stack } from 'expo-router';
import { ProductTemplate } from '@/features/product/components';

export default function ProductScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Product Page' }} />
      <ProductTemplate />
    </>
  );
}
