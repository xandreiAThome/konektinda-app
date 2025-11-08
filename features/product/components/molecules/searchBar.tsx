import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

export const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
      {/* Menu Icon */}
      <Image
        source={require('../../../../assets/images/icon-menu.png')}
        style={{ 
          width: 24, 
          height: 24, 
          tintColor: COLORS.textMuted 
        }}
        resizeMode="contain"
      />
      
      <TextInput
        placeholder="Find Products"
        className="flex-1 mx-3 text-base font-sans-italic"
        placeholderTextColor={COLORS.textMuted}
      />
      
      {/* Search Icon */}
      <Image
        source={require('../../../../assets/images/icon-search.png')}
        style={{ 
          width: 24, 
          height: 24, 
          tintColor: COLORS.textMuted 
        }}
        resizeMode="contain"
      />
    </View>
  );
};