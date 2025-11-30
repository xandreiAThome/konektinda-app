import React from 'react';
import { View, ViewProps, Text, Image } from 'react-native';
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
        <View className="flex-1 flex-row items-center justify-center p-2">
          <Text className="font-Afacad text-lg font-semibold italic text-white">
            {' '}
            Proceed to Checkout{' '}
          </Text>
          <Image
            source={require('@/assets/images/Chevron_right.png')}
            style={{ width: 27, height: 27 }}
            resizeMode="contain"
          />
        </View>
      </Button>
    </View>
  );
};
