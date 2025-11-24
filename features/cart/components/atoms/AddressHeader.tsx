import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';

interface AddressHeaderProps extends ViewProps {
  houseNoStreetName: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}

export const A_AddressDisplay: React.FC<AddressHeaderProps> = ({
  houseNoStreetName,
  barangay,
  city,
  province,
  postalCode,
  country,
  className = '',
  ...viewProps
}) => {
  return (
    <View
      className={'${className} my-4 flex-row items-center justify-center gap-3 text-black'}
      {...viewProps}>
      <Text className="">
        {' '}
        {houseNoStreetName}, {barangay}, {city}, {province}, {postalCode}, {country}
      </Text>
    </View>
  );
};
