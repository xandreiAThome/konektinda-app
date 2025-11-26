import React, { useState } from 'react';
import { View } from 'react-native';
import { T_CheckoutTemplate } from '@/features/cart/components/template/CheckoutTemplate';

export default function CartScreen() {
  return (
    <View style={{ flex: 1 }}>
      <T_CheckoutTemplate />
    </View>
  );
}
