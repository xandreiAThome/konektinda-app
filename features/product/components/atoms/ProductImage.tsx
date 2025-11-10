import React from 'react';
import { Image, View } from 'react-native';

interface ProductImageProps {
  source: any;
  width: number;
  height: number;
  containerClassName?: string;
}

export const A_ProductImage: React.FC<ProductImageProps> = ({
  source,
  width,
  height,
  containerClassName = '',
}) => {
  return (
    <View className={`items-center justify-center ${containerClassName}`}>
      <Image
        source={source}
        style={{
          width,
          height,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};
