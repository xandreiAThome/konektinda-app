import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const M_TopHeader = () => {
  return (
    <View className="h-[186px] w-full flex-row items-start justify-between bg-[#2C666E] p-5">
      <TouchableOpacity className="mt-8">
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
