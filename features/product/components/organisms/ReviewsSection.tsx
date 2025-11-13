import React from 'react';
import { View, ViewProps } from 'react-native';
import { FlatList } from 'react-native';
import { M_ReviewCard } from '../molecules/ReviewCard';

interface Review {
  id: string;
  reviewText: string;
  rating: number;
  reviewDate: string;
  reviewerImage: any;
}

interface ReviewsSectionProps extends ViewProps {
  reviews: Review[];
}

export const O_ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  className = '',
  ...viewProps
}) => {
  return (
    <View className={`${className}`} {...viewProps}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        pagingEnabled
        scrollEventThrottle={16}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <M_ReviewCard
            reviewText={item.reviewText}
            rating={item.rating}
            reviewDate={item.reviewDate}
            reviewerImage={item.reviewerImage}
          />
        )}
      />
    </View>
  );
};
