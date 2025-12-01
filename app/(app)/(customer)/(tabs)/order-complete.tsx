import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native'; // Using Lucide icon
import { Header } from '@/features/product/components/organisms/header';

export default function OrderCompletePage() {
  const router = useRouter();

  // Navigation handlers
  const handleNavigateHome = () => {
    // Navigate back to the home tab
    router.replace('/(app)/(customer)/(tabs)');
  };
  const handleNavigateListing = () => {
    // Navigate back to the product listing
    router.replace('/(app)/(customer)/(tabs)/listing');
  };

  return (
    <View className="flex-1 bg-[#2C5E63]">
      {/* 1. Hide Default Header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* 2. Custom Header */}
      <View className="pb-4">
        <Header />
      </View>

      {/* 3. White Card Content */}
      <View className="flex-1 items-center justify-center rounded-t-3xl bg-white p-8">
        {/* Icon */}
        <ShoppingBag
          size={120}
          color="#6B7280" // Gray color
          strokeWidth={1.5}
          style={{ marginBottom: 24 }}
        />

        {/* Text */}
        <Text className="font-afacad-bold mb-12 text-2xl font-bold text-[#1e1e1e]">
          Order Complete!
        </Text>

        {/* Red Button */}
        <TouchableOpacity
          onPress={handleNavigateHome}
          className="mb-4 w-full items-center rounded-lg bg-[#D55F5A] py-4">
          <Text className="font-afacad-bold text-lg font-bold text-white">Back to Main Hub</Text>
        </TouchableOpacity>

        {/* Link Text */}
        <TouchableOpacity onPress={handleNavigateListing}>
          <Text className="font-sans text-sm italic text-gray-500 underline">Keep Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
