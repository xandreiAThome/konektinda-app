import React from 'react';
import { View, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { COLORS } from '../../constants/colors';

cssInterop(ExpoImage, { className: 'style' });

export const SearchBar = () => {
  return (
    <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-3">
      {/* Menu Icon */}
      <ExpoImage
        source={require('../../../../assets/images/icon-menu.png')}
        style={{
          width: 24,
          height: 24,
          tintColor: COLORS.textMuted,
        }}
        contentFit="contain"
      />

      <TextInput
        placeholder="Find Products"
        className="font-sans-italic mx-3 flex-1 text-base"
        placeholderTextColor={COLORS.textMuted}
      />

      {/* Search Icon */}
      <ExpoImage
        source={require('../../../../assets/images/icon-search.png')}
        style={{
          width: 24,
          height: 24,
          tintColor: COLORS.textMuted,
        }}
        contentFit="contain"
      />
    </View>
  );
};
