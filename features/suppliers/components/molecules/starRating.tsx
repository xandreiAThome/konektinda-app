import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ScalableStarRatingProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
  color?: string;
}

// -- Star rating component --
export const M_StarRating: React.FC<ScalableStarRatingProps> = ({
  rating,
  maxStars = 5,
  starSize = 24,
  color = '#E2B83B',
}) => {
  const displayedRating: number = Math.round(rating * 10) / 10;
  const getStarIcon = (index: number) => {
    const diff = displayedRating - index;

    if (diff >= 1) {
      return 'star';
    }
    if (diff > 0) {
      return 'star-half-o';
    }
    return 'star-o';
  };

  const stars = Array(maxStars)
    .fill(0)
    .map((_, i) => (
      <FontAwesome
        key={i}
        name={getStarIcon(i)}
        size={starSize}
        className="mx-0.5"
        style={{ color: color }}
      />
    ));

  return (
    <View className="mt-1 flex-row items-center justify-center">
      {stars}
      <Text className="ml-2 text-xl font-bold">
        {displayedRating}/{maxStars}
      </Text>
    </View>
  );
};
