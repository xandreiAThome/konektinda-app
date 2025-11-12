import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack>
      {/* Tabs Group */}
      <Stack.Screen name="(customer)" options={{ headerShown: false }} />
    </Stack>
  );
}
