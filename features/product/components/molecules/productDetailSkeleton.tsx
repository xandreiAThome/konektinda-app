import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Skeleton className="mb-4 h-8 w-3/4 rounded" />
      <Skeleton className="mb-4 h-40 w-full rounded" />
      <Skeleton className="mb-4 h-6 w-1/2 rounded" />
      <Skeleton className="mb-4 h-6 w-2/3 rounded" />
      <Skeleton className="h-12 w-full rounded" />
    </View>
  );
};
