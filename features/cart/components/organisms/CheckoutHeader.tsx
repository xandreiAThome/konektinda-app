import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { A_BackButton } from '../atoms/BackButton';
import { A_AddressDisplay } from '../atoms/AddressDisplay';

interface CheckoutHeaderProps {
  houseNoStreetName: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}

export const O_CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  houseNoStreetName,
  barangay,
  city,
  province,
  postalCode,
  country,
  className = '',
  ...viewProps
}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="bg-[#FFFFFF]">
      <View className="bg-[#2C666E]">
        <View className="border-1 w-full flex-1 flex-row rounded-t-[10px] bg-[#FFFFFF] p-4">
          <A_BackButton onPress={handleGoBack} className="" />
          <Text className="flex-1 items-center justify-center text-center text-3xl">
            {' '}
            Checkout{' '}
          </Text>
        </View>
      </View>
      <View className="">
        <A_AddressDisplay
          houseNoStreetName={'2313 Taft'}
          barangay={'Barangay 728'}
          city={'Malate'}
          province={'Metro Manila'}
          postalCode={1004}
          country={'Philippines'}
        />
      </View>
    </View>
  );
};
