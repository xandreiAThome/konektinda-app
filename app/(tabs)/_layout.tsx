import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function TabsLayout() {
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
          height: 64,
          paddingBottom: 4,
          paddingTop: 4,
        },
        headerStyle: {
          backgroundColor: '#2C666E',
          borderBottomColor: '#0d9488',
          borderBottomWidth: 0,
        },
        headerLeft: () => (
          <Image
            source={require('@/assets/images/KonekTinda_Logo.png')}
            style={{ width: 64, height: 40, marginLeft: 16 }}
          />
        ),
        headerRight: () => (
          <Image
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
        name="product_page"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
