import React, { useState } from 'react';
import { View } from 'react-native';
import { DeliveryTemplate } from '../../features/delivery/components/template/DeliveryTemplate';

export default function DeliveriesScreen() {
  const [pageState, setPageState] = useState<'delivered' | 'pending'>('pending');
  const [theme, setTheme] = useState<'supplier' | 'customer'>('customer');

  return (
    <View style={{ flex: 1 }}>
      <DeliveryTemplate theme={theme} pageState={pageState} setPageState={setPageState} />
    </View>
  );
}
