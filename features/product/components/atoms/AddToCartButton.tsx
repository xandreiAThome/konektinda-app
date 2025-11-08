import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Image } from 'expo-image';

interface AddToCartButtonProps extends ViewProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const M_AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onPress,
  isLoading = false,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`my-4 flex-row items-center justify-center ${className}`} {...viewProps}>
      <Button onPress={onPress} disabled={isLoading} className="w-4/5 rounded-lg bg-red-500 py-3">
        <View className="flex-row items-center justify-center gap-2">
          <Image source={require('@/assets/images/cart.png')} style={{ width: 20, height: 20 }} />
          <Text className="text-center font-semibold text-white">
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Text>
        </View>
      </Button>
    </View>
  );
};
