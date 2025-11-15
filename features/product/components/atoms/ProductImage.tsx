import React from 'react';
import { View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(ExpoImage, { className: 'style' });

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
      <ExpoImage
        source={source}
        style={{
          width,
          height,
        }}
        contentFit="contain"
      />
    </View>
  );
};
