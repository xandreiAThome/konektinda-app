import React from 'react';
import { View, ViewProps } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

cssInterop(ExpoImage, { className: 'style' });

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
      <Button
        onPress={onPress}
        disabled={isLoading}
        className="w-4/5 rounded-lg bg-red-500 py-3 hover:bg-red-700">
        <View className="flex-row items-center justify-center gap-2">
          <ExpoImage source={require('@/assets/images/cart.png')} className="h-5 w-5" />
          <Text className="text-center font-semibold text-white">
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Text>
        </View>
      </Button>
    </View>
  );
};
