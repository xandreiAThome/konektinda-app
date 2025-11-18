import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../config/colors';
import { M_DeliveryCard } from '../molecules/DeliveryCard';

const mockData = [
  {
    id: 12,
    name: 'Product K',
    quantity: 4,
    unitPrice: 21.36,
    status: 'Incoming',
    statusColor: AppColors.StatusIncoming,
    rightText: '2.2Km',
    action: 'truck' as const,
  },
  {
    id: 1,
    name: 'Product A',
    quantity: 4,
    unitPrice: 200.366,
    status: 'Incoming',
    statusColor: AppColors.StatusIncoming,
    rightText: '12.3Km',
    action: 'truck' as const,
  },
  {
    id: 13,
    name: 'Product L',
    quantity: 4,
    unitPrice: 173.32,
    status: 'Processing',
    statusColor: AppColors.StatusProcessing,
    rightText: 'Preparing at [Factory B]',
    action: 'process' as const,
  },
  {
    id: 2,
    name: 'Product B',
    quantity: 2,
    unitPrice: 300,
    status: 'Processing',
    statusColor: AppColors.StatusProcessing,
    rightText: 'Preparing at [Factory A]',
    action: 'process' as const,
  },
  {
    id: 3,
    name: 'Product C',
    quantity: 1,
    unitPrice: 100,
    status: 'Delayed',
    statusColor: AppColors.StatusDelayed,
    rightText: 'Delayed',
    action: 'delay' as const,
  },
  {
    id: 4,
    name: 'Product D',
    quantity: 12,
    unitPrice: 332.442,
    status: 'Cancelled',
    statusColor: AppColors.StatusDelayed,
    rightText: 'Cancelled',
    action: 'cancel' as const,
  },
  {
    id: 5,
    name: 'Product E',
    quantity: 7,
    unitPrice: 5,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/12/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 6,
    name: 'Product F',
    quantity: 72,
    unitPrice: 21,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/4/2025 2:21pm',
    action: 'check' as const,
  },
  {
    id: 7,
    name: 'Product G',
    quantity: 1,
    unitPrice: 60,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/2/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 8,
    name: 'Product H',
    quantity: 25,
    unitPrice: 2,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Nov/2/2025 10:23am',
    action: 'check' as const,
  },
  {
    id: 9,
    name: 'Product I',
    quantity: 2,
    unitPrice: 34,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/24/2025 11:43am',
    action: 'check' as const,
  },
  {
    id: 10,
    name: 'Product J',
    quantity: 3,
    unitPrice: 37,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/23/2025 3:21pm',
    action: 'check' as const,
  },
  {
    id: 11,
    name: 'Product K',
    quantity: 4,
    unitPrice: 21,
    status: 'Delivered',
    statusColor: AppColors.StatusDelivered,
    rightText: 'Oct/21/2025 2:22pm',
    action: 'check' as const,
  },
];

interface DeliveryTemplateProps {
  theme: 'supplier' | 'customer';
  pageState: 'delivered' | 'pending';
  setPageState: (state: 'delivered' | 'pending') => void;
}

export const DeliveryTemplate: React.FC<DeliveryTemplateProps> = ({
  theme,
  pageState,
  setPageState,
}) => {
  const isCustomer = theme === 'customer';
  const themeColor = isCustomer ? AppColors.CustomerBackground : AppColors.SupplierBackground;
  const isDelivered = pageState === 'delivered';

  const renderSection = (title: string, data: typeof mockData) => {
    // Original rendering logic
    let bgClass = '';
    let textColorClass = 'text-white';
    if (title === 'Incoming' || title === 'Delivered') {
      bgClass = 'bg-[#3C7F64]'; // Must be a defined Tailwind/NativeWind class
    } else if (title === 'Processing') {
      bgClass = 'bg-[#EB8255]';
    } else if (title === 'Delayed/Cancelled') {
      bgClass = 'bg-[#EB5555]';
    }

    if (data.length === 0) {
      return (
        <View className="mb-2.5" key={title}>
          {/* Section title/pill */}
          {title !== 'Delivered' && (
            <Text
              className={`${bgClass} ${textColorClass} mb-3 mt-2.5 flex-row self-start rounded-xl px-2 py-1 text-sm font-bold`}>
              {title}
            </Text>
          )}

          {/* Message for empty state */}
          <Text className="mt-3.5 text-center text-base text-gray-500">
            No {title.toLowerCase()} items available.
          </Text>
        </View>
      );
    }

    return (
      <View className="mb-2.5 gap-y-[10]" key={title}>
        {title !== 'Delivered' && (
          <Text
            className={`${bgClass} ${textColorClass} mb-3 mt-2.5 flex-row self-start rounded-xl px-2 py-1 text-sm font-bold`}>
            {title}
          </Text>
        )}
        {data.map((item) => (
          <M_DeliveryCard
            key={item.id}
            productName={item.name}
            quantity={item.quantity}
            unitPrice={item.unitPrice}
            statusText={item.status}
            statusColor={item.statusColor}
            rightText={item.rightText}
            actionIconName={item.action}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 items-center">
      {/* Main Content Card */}
      <View className="w-full flex-1 rounded-tl-[30px] rounded-tr-[30px] bg-white px-5 pb-5 pt-5">
        <Text className="mb-4 text-center text-2xl font-bold italic">Deliveries</Text>

        {/* Delivered / Pending Tabs */}
        <View className="mb-5 flex-row gap-x-[10] rounded-xl p-1">
          <TouchableOpacity
            className={`flex-1 items-center rounded-lg py-2 ${isDelivered ? 'elevation-4 bg-[#EB5555] shadow-lg' : 'bg-[#9F9F9F]'}`}
            onPress={() => setPageState('delivered')}>
            <Text className={`${isDelivered ? 'font-bold text-white' : 'text-[#616161]'}`}>
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center rounded-lg py-2 ${!isDelivered ? 'elevation-4 bg-[#EB5555] shadow-lg' : 'bg-[#9F9F9F]'}`}
            onPress={() => setPageState('pending')}>
            <Text className={`${!isDelivered ? 'font-bold text-white' : 'text-[#616161]'}`}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Delivery List */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Render different sections based on state */}
          {isDelivered && (
            <>
              {renderSection(
                'Delivered',
                mockData.filter((d) => d.status === 'Delivered')
              )}
            </>
          )}
          {!isDelivered && (
            <>
              {renderSection(
                'Incoming',
                mockData.filter((d) => d.status === 'Incoming')
              )}
              {renderSection(
                'Processing',
                mockData.filter((d) => d.status === 'Processing')
              )}
              {renderSection(
                'Delayed/Cancelled',
                mockData.filter((d) => ['Delayed', 'Cancelled'].includes(d.status))
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
