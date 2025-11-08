import React from 'react';
import { Tabs } from 'expo-router';
// import { AntDesign } from '@expo/vector-icons'; // Import icons if needed

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Show a header for the screen title
        tabBarActiveTintColor: '#E76F51', // Use your primary red color
      }}
    >
      <Tabs.Screen
        name="index" // Corresponds to app/(tabs)/index.tsx
        options={{
          title: 'Home',
          // tabBarIcon: ({ color }) => <AntDesign name="home" color={color} size={24} />,
        }}
      />
      {/* You would add other tabs here, e.g., for orders, profile, etc. */}
    </Tabs>
  );
}