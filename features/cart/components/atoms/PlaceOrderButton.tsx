import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { Image } from 'expo-image';
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
        className="w-full rounded-lg bg-[#EB5555] py-3 hover:bg-[#D94343]">
        <View className="flex-1 flex-row items-center justify-center p-2 group-hover:opacity-90">
          <Text className="font-Afacad text-lg font-semibold italic text-white">
            {' '}
            Proceed to Checkout{' '}
          </Text>
          <Image
            source={require('@/assets/images/Chevron_right.png')}
            className="size-[27px] bg-transparent"
            contentFit="contain"
          />
        </View>
      </Button>
    </View>
  );
};
