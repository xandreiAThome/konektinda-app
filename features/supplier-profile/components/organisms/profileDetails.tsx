import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { M_StarRating } from '../molecules/starRating';

const SupplierAvatar = require('../../../../assets/images/supplier-user.png');
const MockProductImage = require('../../../../assets/images/icon-placeholder.png');

interface ProfileDetailsProps {
  name: string;
  rating: number;
  location: string;
  dateJoined: string;
  description: string;
  productList: number[];
}

export const O_ProfileDetails: React.FC<ProfileDetailsProps> = ({
  name,
  rating,
  location,
  dateJoined,
  description,
  productList,
}) => {
  return (
    <View className="elevation-10 -mt-20 flex-1 rounded-t-3xl bg-white px-5 pt-16 shadow-xl">
      <View className="absolute -top-16 h-[130px] w-[130px] self-center overflow-hidden rounded-full border-4 border-white shadow-xl">
        <ExpoImage source={SupplierAvatar} className="h-full w-full" contentFit="cover" />
      </View>

      <Text className="mt-2 text-center text-2xl font-bold">{name}</Text>

      <M_StarRating rating={rating} />

      <Text className="mb-4 mt-4 px-2 text-center text-sm text-gray-500">{description}</Text>

      <ScrollView>
        {/* Shipping and Date Joined Info Row */}
        <View className="mb-8 mt-6 w-full flex-row justify-around">
          <View className="items-center">
            <Text className="text-base font-bold text-red-500">Shipping location</Text>
            <Text className="text-base text-gray-700">{location}</Text>
          </View>
          <View className="items-center">
            <Text className="text-base font-bold text-red-500">Date Joined</Text>
            <Text className="text-base text-gray-700">{dateJoined}</Text>
          </View>
        </View>

        <Text className="mb-4 text-xl font-bold text-red-500">All Products</Text>

        <View className="flex-row flex-wrap justify-between pb-20 pl-5 pr-5 pt-4">
          {productList.map((id) => (
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
  );
};
