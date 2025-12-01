import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, FlatList, Image } from 'react-native';
import { createElement } from 'react';
import { Truck } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface OrderDetailsProps {
  cartItems?: any[];
  selectedIds?: string[];
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ cartItems = [], selectedIds = [] }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Filter selected items
  const selectedItems = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return [];

    return cartItems.filter((item: any) => {
      const itemId = String(item.cart_item_id || item.id);
      return selectedIds.length > 0 ? selectedIds.includes(itemId) : false;
    });
  }, [cartItems, selectedIds]);

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

  const renderCartItem = ({ item }: { item: any }) => {
    const productName =
      item.product?.product_name || item.variant?.product?.product_name || 'Unknown';
    const variantName = item.variant?.variant_name || 'Standard';
    const price = item.unit_price || item.price || item.variant?.price || 0;
    const quantity = item.quantity || 1;

    return (
      <View className="flex-row items-center gap-3 border-b border-gray-100 p-3">
        <Image
          source={require('@/assets/images/temp_image.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="font-semibold text-[#1e1e1e]">{productName}</Text>
          <Text className="text-xs text-gray-500">{variantName}</Text>
          <Text className="text-xs font-semibold text-[#3C7F64]">x{quantity} pc</Text>
        </View>
        <View className="items-end">
          <Text className="font-bold text-[#EB5555]">₱{(price * quantity).toFixed(2)}</Text>
          <Text className="text-xs text-gray-500">₱{price.toFixed(2)} each</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="mt-4 bg-white p-4">
      <Text className="mb-4 font-bold text-[#1e1e1e]">Order Details</Text>

      {/* Cart Items Section */}
      {selectedItems.length > 0 && (
        <View className="mb-4 rounded-lg border border-gray-200 bg-gray-50">
          <FlatList
            data={selectedItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => String(item.cart_item_id || item.id)}
            scrollEnabled={false}
          />
        </View>
      )}

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
