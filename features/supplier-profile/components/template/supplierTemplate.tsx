import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { M_TopHeader } from '../molecules/topHeader';
import { O_ProfileDetails } from '../organisms/profileDetails';
import { fetchSupplierProfile, SupplierProfile } from '../../services/supplier';

interface supplierTemplateProps {
  theme: 'supplier' | 'customer';
  pageState: string;
  setPageState: (state: string) => void;
}

// Mock supplier ID for demonstration
const SUPPLIER_ID = 123;

export const SupplierTemplate: React.FC<supplierTemplateProps> = ({
  theme,
  pageState,
  setPageState,
}) => {
  // 🔑 State to manage data, loading, and error states
  const [supplierData, setSupplierData] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSupplierProfile(SUPPLIER_ID);
        setSupplierData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unknown API occured.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [SUPPLIER_ID]);

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
  if (error || !supplierData) {
    return (
      <View className="flex-1 items-center justify-center p-10">
        <Text className="mb-4 text-xl font-bold text-red-600">Error Loading Profile</Text>
        <Text className="text-center text-gray-700">
          Could not connect to the API or fetch data.
        </Text>
        <Text className="mt-2 text-sm text-gray-500">Details: {error}</Text>
      </View>
    );
  }

  // 3. Success State (render component with real data)
  return (
    <View className="flex-1 bg-white">
      <M_TopHeader />
      <O_ProfileDetails
        name={supplierData.name}
        rating={supplierData.rating}
        location={supplierData.location}
        dateJoined={supplierData.dateJoined}
        description={supplierData.description}
        productList={supplierData.products}
      />
    </View>
  );
};
