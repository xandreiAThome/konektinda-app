import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

export const AddressHeader = () => {
  return (
    <View className="flex-row bg-[#D55F5A] px-6 py-6">
      {/* LEFT COLUMN: Icon + Edit Button */}
      <View className="mr-4 flex-col items-center">
        <MapPin color="white" size={32} />

        {/* Button */}
        <TouchableOpacity className="mt-2 rounded-full bg-white px-3 py-0.5">
          <Text className="text-[10px] font-bold uppercase text-[#D55F5A]">Edit</Text>
        </TouchableOpacity>
      </View>

      {/* RIGHT COLUMN: Address Text */}
      <View className="flex-1 justify-center">
        <Text className="font-sans text-sm leading-tight text-white">
          1234 Mabini Street, Barangay San Isidro, Makati City, Metro Manila, 1200, Philippines
        </Text>
      </View>
    </View>
  );
};
