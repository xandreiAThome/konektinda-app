import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SeeMoreCardProps {
  onPress?: () => void;
}

export const SeeMoreCard: React.FC<SeeMoreCardProps> = ({ onPress }) => (
  <TouchableOpacity 
    className="bg-accent rounded-2xl p-3 mb-3 w-[48%] items-center justify-center"
    onPress={onPress}
  >
    <View className="flex-row items-center mb-2">
      <Text className="text-2xl mr-2">🖼️</Text>
      <Text className="text-2xl">📷</Text>
    </View>
    <Text className="font-bold">SEE MORE →</Text>
  </TouchableOpacity>
);