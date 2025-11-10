import React from 'react';
import { View, ViewProps, ImageSourcePropType, Image } from 'react-native';
import { Text } from '@/components/ui/text';

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
    <View
      className={`my-4 flex-row items-center justify-center gap-3 text-black ${className}`}
      {...viewProps}>
      <Image source={sellerImage} className="h-10 w-10" />
      <View>
        <Text className="text-sm font-semibold text-black">Distributed by {sellerName}</Text>
        <Text className="text-xs text-gray-600">Product listed on {listingDate}</Text>
      </View>
    </View>
  );
};
