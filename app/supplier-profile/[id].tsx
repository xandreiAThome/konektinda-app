import React from 'react';
import { useLocalSearchParams } from 'expo-router'; // to get dynamic ID
import { View, Text } from 'react-native';
import { SupplierTemplate } from '../../features/supplier-profile/components/template/supplierTemplate';

export default function SupplierProfilePage() {
  // 1. Extract dynamic supplier ID from the url path: /supplier-profile/[id]
  const { id } = useLocalSearchParams();

  // ensure that is treated as string for fetching
  const supplierId = Array.isArray(id) ? id[0] : id;

  // case when id is missing
  if (!supplierId) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Supplier ID not found.</Text>
      </View>
    );
  }

  // 2. render supplier profile template
  return (
    <SupplierTemplate
      supplierId={Number(supplierId)}
      theme="customer"
      pageState=""
      setPageState={() => {}}
    />
  );
}
