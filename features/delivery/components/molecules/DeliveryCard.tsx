import React from 'react';
import { View, Text } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Feather, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const IconPlaceholder = require('../../../../assets/images/icon-placeholder.png');

interface DeliveryCardProps {
  productName: string;
  quantity: number;
  unitPrice: number;
  statusText: string;
  statusColor: string;
  rightText: string;
  actionIconName: 'truck' | 'process' | 'delay' | 'cancel' | 'dash' | 'check';
}

export const M_DeliveryCard: React.FC<DeliveryCardProps> = ({
  productName,
  quantity,
  unitPrice,
  statusText,
  rightText,
  actionIconName,
}) => {
  const iconClass = 'text-gray-900';
  const ActionIcon = () => {
    if (actionIconName === 'truck') return <Feather name="truck" size={27} className={iconClass} />;
    if (actionIconName === 'process')
      return <FontAwesome name="gears" size={27} className={iconClass} />;
    if (actionIconName === 'delay')
      return <MaterialIcons name="assignment-late" size={27} className={iconClass} />;
    if (actionIconName === 'cancel')
      return <MaterialIcons name="cancel-presentation" size={27} className={'text-red-500'} />;
    if (actionIconName === 'check')
      return <Feather name="check-square" size={27} className={iconClass} />;
    return <AntDesign name="dash" size={27} classname={iconClass} />; // unknown icon
  };

  const isIncoming = statusText === 'Incoming';
  const totalPrice = quantity * unitPrice;

  return (
    // 1. Card container (shadows, border, background, layout)
    <View className="elevation-5 mb-2.5 h-20 w-full flex-row items-center justify-between overflow-hidden rounded-[21px] border border-gray-200 bg-white p-2.5 shadow">
      {/* Left column: image placeholder (fixed length) */}
      <View className="mr-2.5 h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-gray-200">
        <ExpoImage source={IconPlaceholder} className="h-4/5 w-4/5" contentFit="contain" />
      </View>

      {/* midlle column: product info (dynamic length) */}
      <View className="flex-1 justify-center pr-2.5">
        <Text className="text-sm font-bold text-gray-900">
          {productName} {''}
          <Text className="text-sm font-normal text-gray-500">
            {quantity > 1 ? `(x${quantity})` : ''}
          </Text>
        </Text>
        <Text className="mt-0.5 text-base font-bold text-red-600">₱{totalPrice.toFixed(2)}</Text>
      </View>

      {/* right column: delivery status (fixed length) */}
      <View className="ml-1 h-[60px] w-[90px] items-center">
        <ActionIcon />
        {isIncoming ? (
          <Text>
            <Text className="mt-0.5 text-center text-xs font-semibold italic text-red-600">
              {rightText}
            </Text>
            <Text className="text-xs font-normal not-italic text-gray-500">{' away'}</Text>
          </Text>
        ) : (
          <Text className="mt-0.5 text-center text-xs text-gray-600">{rightText}</Text>
        )}
      </View>
    </View>
  );
};
