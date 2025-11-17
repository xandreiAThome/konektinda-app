import React from 'react';
import { View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(ExpoImage, { className: 'style' });

export const ImagePlaceholder = () => (
  // FIX: Shrunk to a small square (h-16 w-16 = 64px)
  // Removed margins to let the card handle spacing
  <View className="h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
    <ExpoImage
      source={require('@/assets/images/icon-placeholder.png')}
      style={{
        width: 24,
        height: 24,
      }}
      contentFit="contain"
    />
  </View>
);
