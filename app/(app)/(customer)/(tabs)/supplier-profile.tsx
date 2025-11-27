import React, { useState } from 'react';
import { View } from 'react-native';
import { SupplierTemplate } from '@/features/supplier-profile/components/template/supplierTemplate';

export default function supplierProfile() {
  const [pageState, setPageState] = useState<'delivered' | 'pending'>('pending');
  const [theme, setTheme] = useState<'supplier' | 'customer'>('customer');

  return (
    <View style={{ flex: 1 }}>
      <SupplierTemplate theme={theme} pageState={pageState} setPageState={setPageState} />
    </View>
  );
}
