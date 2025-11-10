import React from 'react';
import { Stack } from 'expo-router';
import { ProductListingTemplate } from '@/features/product/components/template/ProductListingTemplate';

export default function ProductListingScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ProductListingTemplate />
    </>
  );
}
