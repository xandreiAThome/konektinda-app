import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { createElement } from 'react';
import { Truck } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const OrderDetails = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Helper to get "YYYY-MM-DD" for the Web 'min' attribute
  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      if (selectedDate < new Date()) {
        setDate(new Date());
      } else {
        setDate(selectedDate);
      }
    }
  };

  const formatDate = (rawDate: Date) => {
    return rawDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View className="mt-4 bg-white p-4">
      <Text className="mb-4 font-bold text-[#1e1e1e]">Order Details</Text>

      {/* Delivery Date Row */}
      <View className="mb-6 flex-row items-start">
        <Truck color="#D55F5A" size={32} />
        <View className="ml-4">
          <Text className="text-sm text-gray-500">Earliest Arrival on {formatDate(date)}</Text>

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="mt-1 self-start rounded-full bg-[#D55F5A] px-3 py-1">
            <Text className="text-xs text-white">Change Delivery Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Note Input */}
      <View className="h-24 rounded-lg bg-gray-200 p-4">
        <TextInput
          placeholder="Leave a request for supplier..."
          placeholderTextColor="#9CA3AF"
          multiline
          className="font-sans text-[#1e1e1e]"
        />
      </View>

      {/* PICKER LOGIC */}
      {showPicker &&
        (Platform.OS === 'web' ? (
          // --- WEB FIX ---
          <View className="mt-4 rounded-lg bg-gray-100 p-4">
            <Text className="mb-2 text-xs text-gray-500">Select Date (Web Version):</Text>
            {createElement('input', {
              type: 'date',
              value: date.toISOString().split('T')[0],
              min: getTodayString(),
              style: { padding: 10, borderRadius: 5, border: '1px solid #ccc' },
              onChange: (e: any) => {
                const newDate = new Date(e.target.value);
                setDate(newDate);
                setShowPicker(false);
              },
            })}
          </View>
        ) : (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        ))}
    </View>
  );
};
