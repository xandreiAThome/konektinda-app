import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { M_TopHeader } from '../molecules/topHeader';
import { O_ProfileDetails } from '../organisms/profileDetails';
import { useSupplierById } from '../../hooks/useSupplierProfile';

interface supplierTemplateProps {
  supplierId: number; // The required ID from the URL
  theme: 'supplier' | 'customer';
  pageState: string;
  setPageState: (state: string) => void;
}

export const SupplierTemplate: React.FC<supplierTemplateProps> = ({
  supplierId,
  theme,
  pageState,
  setPageState,
}) => {
  // 🔑 State to manage data, loading, and error states
  /*
  const [supplierData, setSupplierData] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  */

  /*
  useEffect(() => {
    const loadProfile = async () => {
      // check for invalid conversion
      if (isNaN(supplierId) || !supplierId) {
        setError('Invalid Supplier ID format.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchSupplierProfile(supplierId);
        setSupplierData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unknown API occured.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [supplierId]); */
  const { data: supplier, isLoading, isError } = useSupplierById(supplierId || 0);

  // --- RENDERING STATES ---
  // 1. Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FF0000" />
        <Text className="mt-2 text-gray-600">Loading profile data...</Text>
      </View>
    );
  }

  // 2. Error state
  if (isError || !supplier) {
    return (
      <View className="flex-1 items-center justify-center p-10">
        <Text className="mb-4 text-xl font-bold text-red-600">Error Loading Profile</Text>
        <Text className="text-center text-gray-700">
          Could not connect to the API or fetch data.
        </Text>
        <Text className="mt-2 text-sm text-gray-500">Details: {isError}</Text>
      </View>
    );
  }

  // 3. Success State (render component with real data)
  return (
    <View className="flex-1 bg-white">
      <M_TopHeader />
      <O_ProfileDetails
        name={supplier.supplier_name}
        rating={supplier.rating}
        location={supplier.location}
        dateJoined={supplier.dateJoined}
        description={supplier.supplier_description}
        productList={supplier.products}
      />
    </View>
  );
};
