import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonGridProps {
  itemCount?: number;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ itemCount = 4 }) => {
  return (
    <View className="mt-6">
      <Skeleton className="mb-4 h-6 w-40" />
      <View className="flex-row flex-wrap justify-between gap-4">
        {Array.from({ length: itemCount }).map((_, i) => (
          <View key={i} className="mb-4 w-[40%]">
            <Skeleton className="mb-2 h-20 w-full rounded-xl" />
            <Skeleton className="mb-2 h-4 w-full rounded" />
            <Skeleton className="mb-2 h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </View>
        ))}
      </View>
    </View>
  );
};
