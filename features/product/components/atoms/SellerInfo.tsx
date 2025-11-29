import React from 'react';
import { View, ViewProps, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

cssInterop(ExpoImage, { className: 'style' });

interface SellerInfoProps extends ViewProps {
  supplierId: number;
  sellerImage: ImageSourcePropType;
  sellerName: string;
  listingDate: string;
}

export const A_SellerInfo: React.FC<SellerInfoProps> = ({
  supplierId,
  sellerImage,
  sellerName,
  listingDate,
  className = '',
  ...viewProps
}) => {
  const router = useRouter();

  const handleSellerPress = () => {
    if (supplierId) {
      router.push(`/supplier-profile/${supplierId}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSellerPress}
      className={`elevation-5 mx-auto my-4 flex-row items-center justify-center gap-3 rounded-lg bg-white p-4 text-black shadow hover:bg-gray-100 hover:shadow-lg ${className} `}
      {...viewProps}>
      <ExpoImage source={sellerImage} className="h-10 w-10" />
      <View>
        <Text className="text-sm font-semibold text-black">Distributed by {sellerName}</Text>
        <Text className="text-xs text-gray-600">Product listed on {listingDate}</Text>
      </View>
    </TouchableOpacity>
  );
};
