import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { Button } from '@/components/ui/button';
interface PlaceOrderButtonProps extends ViewProps {
  onPress: () => void;
  isLoading?: boolean;
  orderTotal: number;
  deliveryFee: number;
}

export const A_PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  onPress,
  isLoading = false,
  orderTotal,
  deliveryFee,
  className = '',
  ...viewProps
}) => {
  const totalPrice = orderTotal + deliveryFee;
  return (
    <View className={` ${className}`} {...viewProps}>
      <Button
        onPress={onPress}
        disabled={isLoading}
        className="w-full rounded-lg bg-[#EB5555] py-3">
        <View className="items-bottom flex-1 flex-row justify-between p-2">
          <Text className="text-lg italic text-white"> Place Order </Text>
          <Text className="text-xl font-bold italic text-white"> ₱{totalPrice.toFixed(2)} </Text>
        </View>
      </Button>
    </View>
  );
};
