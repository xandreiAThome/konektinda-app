import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { AppColors } from '../../../../config/colors';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

interface supplierTemplateProps {
  theme: 'supplier' | 'customer';
  pageState: string;
  setPageState: (state: string) => void;
}

interface ScalableStarRatingProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
  color?: string;
}

const KonektindaLogo = require('../../../../assets/images/konektinda-logo.png');
const SupplierAvatar = require('../../../../assets/images/supplier-user.png');
const MockProductImage = require('../../../../assets/images/icon-placeholder.png');

// -- Star rating component --
const StarRating: React.FC<ScalableStarRatingProps> = ({
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

export const SupplierTemplate: React.FC<supplierTemplateProps> = ({
  theme,
  pageState,
  setPageState,
}) => {
  // MockData
  const supplier = {
    name: 'Supplier Name',
    rating: 2.36,
    location: 'City of Manila',
    dateJoined: 'January 1, 2026',
  };

  const mockProducts = [1, 2, 3, 4];

  return (
    <View className="flex-1 bg-white">
      {/* TOP HEADER & LOGO AREA (Fixed height) */}
      <View className="h-[186px] w-full flex-row items-start justify-between bg-[#2C666E] p-5">
        <TouchableOpacity className="mt-8">
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* PROFILE CARD AREA (white card with floating avatar) */}
      <View className="elevation-10 -mt-20 flex-1 rounded-t-3xl bg-white px-5 pt-16 shadow-xl">
        <View className="absolute -top-16 h-[130px] w-[130px] self-center overflow-hidden rounded-full border-4 border-white shadow-xl">
          <ExpoImage source={SupplierAvatar} className="h-full w-full" contentFit="cover" />
        </View>

        {/* Profile Details */}
        <Text className="mt-2 text-center text-2xl font-bold">{supplier.name}</Text>

        {/* Rating */}
        <StarRating rating={supplier.rating} />

        {/* Description */}
        <Text className="mb-4 mt-4 px-2 text-center text-sm text-gray-500">
          This is a product description that highlights the perfect mix of quality, design, and
          everyday functionality.
        </Text>

        <ScrollView>
          {/* Shipping and Date Joined Info Row */}
          <View className="mb-8 mt-6 w-full flex-row justify-around">
            <View className="items-center">
              <Text className="text-base font-bold text-red-500">Shipping location</Text>
              <Text className="text-base text-gray-700">{supplier.location}</Text>
            </View>
            <View className="items-center">
              <Text className="text-base font-bold text-red-500">Date Joined</Text>
              <Text className="text-base text-gray-700">{supplier.dateJoined}</Text>
            </View>
          </View>
          <Text className="mb-4 text-xl font-bold text-red-500">All Products</Text>

          <View className="flex-row flex-wrap justify-between pb-20 pl-5 pr-5 pt-4">
            {mockProducts.map((id) => (
              <View
                key={id}
                className="elevation-2 mb-4 h-[100px] w-[48%] rounded-xl border border-gray-100 bg-white p-2.5 shadow-md">
                <View className="h-[100%] flex-row content-center items-center">
                  {/* Product Image Placeholder (Using ExpoImage) */}
                  <View className="mr-2.5 h-[60px] w-[60px] overflow-hidden rounded-md bg-gray-200">
                    <ExpoImage
                      source={MockProductImage}
                      className="h-full w-full"
                      contentFit="contain"
                    />
                  </View>
                  <View>
                    <Text className="text-xs font-bold">BRAND NAME</Text>
                    <Text className="text-xs text-gray-600">Product Name (000mL)</Text>
                    <Text className="mt-1 text-sm font-bold text-red-600">Php 100.00</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
