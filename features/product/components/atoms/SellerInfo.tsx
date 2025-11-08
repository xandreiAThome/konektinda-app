import React from 'react';
import { View, ViewProps, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';

interface SellerInfoProps extends ViewProps {
  sellerImage: ImageSourcePropType;
  sellerName: string;
  listingDate: string;
}

export const A_SellerInfo: React.FC<SellerInfoProps> = ({
  sellerImage,
  sellerName,
  listingDate,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`my-4 flex-row items-center justify-center gap-3 ${className}`} {...viewProps}>
      <Image source={sellerImage} style={{ width: 40, height: 40 }} />
      <View>
        <Text className="text-sm font-semibold">Distributed by {sellerName}</Text>
        <Text className="text-xs text-gray-600">Product listed on {listingDate}</Text>
      </View>
    </View>
  );
};
