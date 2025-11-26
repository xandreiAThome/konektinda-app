import React from 'react';
import { View, ViewProps, Image } from 'react-native';
import { Button } from '@/components/ui/button';

interface BackButtonProps extends ViewProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const A_BackButton: React.FC<BackButtonProps> = ({
  onPress,
  isLoading = false,
  className = '',
  ...viewProps
}) => {
  return (
    <View>
      <Button onPress={onPress} disabled={isLoading} className="w-1 border-0 bg-transparent">
        <View>
          <Image source={require('@/assets/images/back_arrow.png')} className="h-2 w-2" />
        </View>
      </Button>
    </View>
  );
};
