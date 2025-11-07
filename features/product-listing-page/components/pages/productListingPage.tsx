import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Header } from '../organisms/header';
import { BottomNav } from '../organisms/bottomNav';
import { SearchBar } from '../molecules/searchBar';
import { ProductGrid } from '../organisms/productGrid';
import { MOST_POPULAR_PRODUCTS, LAST_PURCHASED_PRODUCTS } from '../../constants/mockData';
import { COLORS } from '../../constants/colors';

export const ProductListingPage = () => {
  return (
    // 1. Main container with teal background
    <SafeAreaView 
      className="flex-1" 
      style={{ backgroundColor: COLORS.primaryBg }}
    >
      <StatusBar barStyle="light-content" />
      
      {/* 2. Render the Header */}
      <Header notificationCount={3} />
      
      {/* 3. Main Content Area */}
      {/* This ScrollView creates the white, rounded, overlapping effect */}
      <ScrollView 
        className="flex-1 bg-white rounded-t-3xl -mt-6"
        contentContainerStyle={{ paddingBottom: 100 }} // Space for BottomNav
      >
        {/* Inner container for padding */}
        <View className="p-4">
          
          <SearchBar />
          
          <ProductGrid 
            title="Most Popular Items" 
            products={MOST_POPULAR_PRODUCTS} 
          />
          
          <ProductGrid 
            title="Recently Purchased" 
            products={LAST_PURCHASED_PRODUCTS} 
          />
          
        </View>
      </ScrollView>
      
      {/* 4. Render the Bottom Navigation */}
      {/* Sits outside the ScrollView to remain fixed */}
      <BottomNav />
      
    </SafeAreaView>
  );
};

export default ProductListingPage;