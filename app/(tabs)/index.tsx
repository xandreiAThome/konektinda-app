import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-5">
      <Text className="mb-2.5 text-2xl font-bold text-gray-800">🎉 Welcome to Konek Tinda! 🎉</Text>
      <Text className="text-center text-base text-gray-600">
        You have successfully logged in and reached the main app area.
      </Text>
    </View>
  );
}
