import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; //for implementing shipping icon truck
import { Image as ExpoImage } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cssInterop } from 'nativewind';
cssInterop(ExpoImage, { className: 'style' });

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#ef4444',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingBottom: 4 + insets.bottom,
          paddingTop: 4,
        },
        headerStyle: {
          backgroundColor: '#2C666E',
          borderBottomColor: '#0d9488',
          borderBottomWidth: 0,
        },
        headerLeft: () => (
          <ExpoImage
            source={require('@/assets/images/KonekTinda_Logo.png')}
            style={{ width: 64, height: 40, marginLeft: 16 }}
          />
        ),
        headerRight: () => (
          <ExpoImage
            source={require('@/assets/images/avatar_user.png')}
            style={{ width: 36, height: 36, marginRight: 16 }}
          />
        ),
        headerTitle: '',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="listing"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="deliveries" //must match the file name deliveries.tsx
        options={{
          title: 'Deliveries',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-shipping" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="supplier-profile"
        options={{
          title: 'Supplier',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
