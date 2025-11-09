import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Rating } from 'react-native-ratings';
import { Image as ExpoImage } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(ExpoImage, { className: 'style' });

interface ReviewCardProps {
  reviewText: string;
  rating: number;
  reviewDate: string;
  reviewerImage: any;
}

export const M_ReviewCard: React.FC<ReviewCardProps> = ({
  reviewText,
  rating,
  reviewDate,
  reviewerImage,
}) => {
  return (
    <View className="mx-2 px-4 py-4">
      <View className="relative">
        <View className="flex-1 rounded-lg bg-gray-200 p-5">
          <View className="flex-1 flex-col items-start justify-start">
            <View className="mb-3 flex-row items-center gap-3">
              <Text className="ml-8 text-xs font-semibold text-black">{reviewText}</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={16}
                readonly
                startingValue={rating}
                fractions={1}
                tintColor="#e5e7eb"
              />
            </View>
            <Text className="mb-2 text-xs text-gray-600">Reviewed on {reviewDate}</Text>
            <Text className="text-xs text-gray-700">
              This is a sample review text that captures the user's experience and overall
              satisfaction with the product. It highlights both the quality and the value it
              provides.
            </Text>
          </View>
        </View>
        <ExpoImage
          source={reviewerImage}
          className="absolute -left-4 -top-4 h-16 w-16 rounded-full"
        />
      </View>
    </View>
  );
};
