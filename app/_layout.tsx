import { Stack } from 'expo-router';
import React from 'react';
import { QueryProvider } from '@/config/query-provider';
import '../global.css';
import { PortalHost } from '@rn-primitives/portal';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        {/* Login Page (index.tsx) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* 🔑 NEW: Signup Page (signup.tsx) */}
        <Stack.Screen name="signup" options={{ title: 'Create Account', headerShown: true }} />

        {/* Tabs Group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* ... */}
      </Stack>
      <PortalHost />
    </QueryProvider>
  );
}
