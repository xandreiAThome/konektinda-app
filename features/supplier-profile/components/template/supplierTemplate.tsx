import React from 'react';
import { View } from 'react-native';
import { M_TopHeader } from '../molecules/topHeader';
import { O_ProfileDetails } from '../organisms/profileDetails';

interface supplierTemplateProps {
  theme: 'supplier' | 'customer';
  pageState: string;
  setPageState: (state: string) => void;
}

export const SupplierTemplate: React.FC<supplierTemplateProps> = ({
  theme,
  pageState,
  setPageState,
}) => {
  // MockData
  const supplier = {
    name: 'Supplier Name',
    rating: 2.36,
    location: 'City of Manila',
    dateJoined: 'January 1, 2026',
  };

  const mockProducts = [1, 2, 3, 4];

  return (
    <View className="flex-1 bg-white">
      <M_TopHeader />
      <O_ProfileDetails
        name={supplier.name}
        rating={supplier.rating}
        location={supplier.location}
        dateJoined={supplier.dateJoined}
        productList={mockProducts}
      />
    </View>
  );
};
