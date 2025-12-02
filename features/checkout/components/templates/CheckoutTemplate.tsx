import React, { useState, useMemo } from 'react'; // 1. Import useState
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { AddressHeader } from '../molecules/AddressHeader';
import { PaymentMethodItem } from '../molecules/PaymentMethodItem';
import { OrderDetails } from '../molecules/OrderDetails';
import { Header } from '../../../product/components/organisms/header';
import { PaymentMethodModal } from '../organisms/PaymentMethodModal';
import { useCartItems } from '../../../cart/hooks';

export const CheckoutTemplate = () => {
  const router = useRouter();
  const { data: cartItems } = useCartItems();
  const params = useLocalSearchParams();
  const selectedIds = useMemo(() => {
    if (params.selectedIds) {
      try {
        // We cast to string because params can be string | string[]
        return JSON.parse(params.selectedIds as string);
      } catch (e) {
        return [];
      }
    }
    return [];
  }, [params.selectedIds]);
  const deliveryFee = 0;
  const orderTotal = useMemo(() => {
    if (!cartItems) return 0;

    return cartItems.reduce((sum: number, item: any) => {
      // Logic: Only add to sum if the item ID is in our list
      // Note: Make sure 'item.cart_item_id' matches the ID field used in CartTemplate
      const itemId = item.cart_item_id || item.id;

      // If selectedIds is empty (e.g. direct navigation), you might want to show 0 or All
      // Here we assume if list is provided, we filter.
      const isSelected = selectedIds.length > 0 ? selectedIds.includes(itemId) : true;

      if (isSelected) {
        const price = item.unit_price || item.variant?.price || 0;
        return sum + price * item.quantity;
      }
      return sum;
    }, 0);
  }, [cartItems, selectedIds]);

  const finalAmount = orderTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Navigate to the Order Complete page
    router.push({
      pathname: '/order-complete',
    });
  };

  // Create state to track the selection
  const [selectedPayment, setSelectedPayment] = useState('COD');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <View className="flex-1 bg-[#2C5E63]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="pb-4">
        <Header />
      </View>

      <View className="flex-1 overflow-hidden rounded-t-3xl bg-white">
        <View className="flex-row items-center border-b border-gray-100 p-5">
          <TouchableOpacity onPress={() => router.back()} className="z-10">
            <ChevronLeft size={28} color="#1e1e1e" />
          </TouchableOpacity>
          <View className="absolute left-0 right-0 items-center">
            <Text className="font-afacad-bold text-2xl font-bold italic text-[#1e1e1e]">
              Checkout
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 bg-gray-50">
          <AddressHeader />

          {/* Payment Methods Section */}
          <View className="mt-2 bg-white">
            <View className="flex-row items-center justify-between border-b border-gray-100 p-4">
              <Text className="font-bold text-[#1e1e1e]">Select Payment Method</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
                <Text className="text-xs text-red-500">View all →</Text>
              </TouchableOpacity>
            </View>

            {/* Pass the props to handle selection */}

            <PaymentMethodItem
              title="Cash On Delivery"
              subtitle="Physical Payment"
              isSelected={selectedPayment === 'COD'} // Check if this is the selected one
              onPress={() => setSelectedPayment('COD')} // Set this as selected
            />

            <PaymentMethodItem
              title="GCASH"
              subtitle="091xxxxxxxxx"
              isSelected={selectedPayment === 'GCASH'}
              onPress={() => setSelectedPayment('GCASH')}
            />

            <PaymentMethodItem
              title="Paymaya"
              subtitle="091xxxxxxxxx"
              isSelected={selectedPayment === 'PAYMAYA'}
              onPress={() => setSelectedPayment('PAYMAYA')}
            />

            <PaymentMethodItem
              title="Credit Card"
              subtitle="xxxx xxxx xxxx xxxx"
              isSelected={selectedPayment === 'CARD'}
              onPress={() => setSelectedPayment('CARD')}
            />
          </View>

          <OrderDetails cartItems={cartItems} selectedIds={selectedIds} />
          <View className="h-40" />
        </ScrollView>

        {/* Footer (Unchanged) */}
        <View className="absolute bottom-0 w-full bg-[#2C5E63] p-4">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-lg font-bold text-white">Order Total -</Text>
            <Text className="text-lg font-bold text-white">₱{orderTotal.toFixed(2)}</Text>
          </View>
          <View className="mb-4 flex-row justify-between">
            <Text className="text-xs italic text-gray-300">Delivery Fee -</Text>
            <Text className="text-xs italic text-gray-300">₱{deliveryFee.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="flex-row items-center justify-between rounded-lg bg-[#D55F5A] px-6 py-4">
            <Text className="text-lg font-bold text-white">Place Order</Text>
            <Text className="text-lg font-bold text-white">₱{finalAmount.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PaymentMethodModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedMethod={selectedPayment}
        onConfirm={setSelectedPayment}
      />
    </View>
  );
};
