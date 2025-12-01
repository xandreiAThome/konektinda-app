import React from 'react';
import { View, Text } from 'react-native';
import { A_PlaceOrderButton } from '../atoms/PlaceOrderButton';

interface checkoutFooter {
  orderTotal: number;
  deliveryfee: number;
  onPress: () => void; // Defined here
}

// FIX 1: Destructure 'onPress' from props so we can use it
export const M_CheckoutFooter: React.FC<checkoutFooter> = ({
  orderTotal,
  deliveryfee,
  onPress,
}) => {
  // FIX 2: Removed local 'handlePlaceOrder' and 'router'.
  // The parent component (CartTemplate) handles the logic and navigation now.

  return (
    <View className="bg-[#2C666E]">
      <View className="flex-row items-end justify-between pl-3 pr-3 pt-3">
        <Text className="font-Afacad text-base italic text-white"> Order Total - </Text>
        <Text className="font-Afacad text-xl font-bold italic text-white">
          {' '}
          ₱{orderTotal.toFixed(2)}{' '}
        </Text>
      </View>
      <View className="flex-row items-center justify-between pl-3 pr-3 pt-0">
        <Text className="font-Afacad stext-xs italic text-white"> Delivery fee - </Text>
        <Text className="font-Afacad text-sm italic text-white"> ₱{deliveryfee.toFixed(2)} </Text>
      </View>
      <View className="m-3 rounded-[8] bg-[#EB5555]">
        <A_PlaceOrderButton
          // FIX 3: Pass the prop directly to the button
          onPress={onPress}
          // Assuming your atom handles loading visuals internally or via prop,
          // you can keep isLoading={false} or pass it from parent if needed.
          isLoading={false}
          orderTotal={orderTotal}
          deliveryFee={deliveryfee}
        />
      </View>
    </View>
  );
};
