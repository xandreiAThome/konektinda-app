import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Header } from '../organisms/header';
import { SearchBar } from '../molecules/searchBar';
import { SkeletonGrid } from '../molecules/skeletonGrid';
import { ProductGrid } from '../organisms/productGrid';
import { COLORS } from '../../constants/colors';
import { useProductsAll } from '../../hooks';
import { Text } from '@/components/ui/text';

export const ProductListingTemplate = () => {
  const { data: products, isLoading, isError } = useProductsAll();

  return (
    // 1. Main container with teal background
    <View className="flex-1" style={{ backgroundColor: COLORS.primaryBg }}>
      <StatusBar barStyle="light-content" />

      {/* 2. Render the Header */}
      <Header notificationCount={3} />

      {/* 3. Main Content Area */}
      {/* This ScrollView creates the white, rounded, overlapping effect */}
      <ScrollView
        className="-mt-6 flex-1 rounded-t-3xl bg-white"
        contentContainerStyle={{ paddingBottom: 100 }} // Space for BottomNav
      >
        {/* Inner container for padding */}
        <View className="p-4">
          <SearchBar />

          {isLoading ? (
            <>
              <SkeletonGrid itemCount={4} />
              <SkeletonGrid itemCount={4} />
            </>
          ) : isError ? (
            <View className="items-center justify-center py-8">
              <Text className="text-center text-red-500">Failed to load products</Text>
            </View>
          ) : (
            <>
              <ProductGrid title="Most Popular Items" products={products || []} />
              <ProductGrid title="Recently Purchased" products={products || []} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
