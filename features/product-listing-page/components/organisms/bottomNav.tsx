import React from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

// Internal component for nav items
const NavItem = ({ iconSource, label, active = false }: any) => (
  <TouchableOpacity className="items-center justify-center w-1/5">
    <Image
      source={iconSource}
      style={{ 
        width: 24, 
        height: 24, 
        tintColor: 'white' // Ensures icons are white
      }}
      resizeMode="contain"
    />
    <Text className="text-white text-xs mt-1 font-sans">{label}</Text>
  </TouchableOpacity>
);

export const BottomNav = () => {
  // Add extra padding at the bottom for iOS home bar
  const bottomPadding = Platform.OS === 'ios' ? 'pb-6' : 'pb-4';

  return (
    // Positioned at the bottom of the screen
    <View className="absolute bottom-4 left-0 right-0">
      <View 
        className={`flex-row items-center rounded-full mx-4 pt-4 ${bottomPadding}`}
        style={{ backgroundColor: COLORS.primaryRed }}
      >
        <NavItem 
          iconSource={require('../../../../assets/images/icon-shop.png')}
          label="Shop" 
        />
        <NavItem 
          iconSource={require('../../../../assets/images/icon-cart.png')}
          label="Cart" 
        />
        <NavItem 
          iconSource={require('../../../../assets/images/icon-home.png')}
          label="Home" 
          active={true} 
        />
        <NavItem 
          iconSource={require('../../../../assets/images/icon-deliveries.png')}
          label="Deliveries" 
        />
        <NavItem 
          iconSource={require('../../../../assets/images/icon-inventory.png')}
          label="Inventory" 
        />
      </View>
    </View>
  );
};