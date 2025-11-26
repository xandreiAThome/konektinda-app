import React from 'react';
import { View, ViewProps, Image } from 'react-native';
import { Text } from '@/components/ui/text';

interface AddressDisplayProps extends ViewProps {
  houseNoStreetName: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}

export const A_AddressDisplay: React.FC<AddressDisplayProps> = ({
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
      className={'${className} my-4 flex-row items-center gap-3 bg-[#EB5555] p-6 pl-8 text-white'}
      {...viewProps}>
      <Image source={require('@/assets/images/Map_pin.png')} />
      <Text className="flex-1 text-center text-white">
        {' '}
        {houseNoStreetName}, {barangay}, {city}, {province}, {postalCode}, {country}
      </Text>
    </View>
  );
};
