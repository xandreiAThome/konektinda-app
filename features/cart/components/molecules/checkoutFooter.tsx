import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { A_PlaceOrderButton } from '../atoms/PlaceOrderButton';

interface checkoutFooter {
  orderTotal: number;
  deliveryfee: number;
}

export const M_CheckoutFooter: React.FC<checkoutFooter> = ({ orderTotal, deliveryfee }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    if (isSubmitting) {
      return;
    }

    console.log('Attempting to place order...');
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Order placed successfully!');
      setIsSubmitting(false);
    }, 2000);
  };
  return (
    <View className="bg-[#2C666E]">
      <View className="flex-row items-end justify-between pl-3 pr-3 pt-3">
        <Text className="text-base italic text-white"> Order Total - </Text>
        <Text className="text-xl font-bold italic text-white"> ₱{orderTotal.toFixed(2)} </Text>
      </View>
      <View className="flex-row items-center justify-between pl-3 pr-3 pt-0">
        <Text className="stext-xs italic text-white"> Delivery fee - </Text>
        <Text className="text-sm italic text-white"> ₱{deliveryfee.toFixed(2)} </Text>
      </View>
      <View className="m-3 rounded-[8] bg-[#EB5555]">
        <A_PlaceOrderButton
          onPress={handlePlaceOrder}
          isLoading={isSubmitting}
          orderTotal={orderTotal}
          deliveryFee={deliveryfee}
        />
      </View>
    </View>
  );
};
