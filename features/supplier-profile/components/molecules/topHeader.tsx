import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export const M_TopHeader = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('/'); // Fallback to Home if no back history
    }
  };

  return (
    <View className="h-[250px] w-full flex-row items-start justify-between bg-[#2C666E] p-5">
      <TouchableOpacity onPress={handleBackPress} className="mt-8">
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
