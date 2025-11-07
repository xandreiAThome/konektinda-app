import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Login Page (index.tsx) */}
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      
      {/* 🔑 NEW: Signup Page (signup.tsx) */}
      <Stack.Screen name="signup" options={{ title: 'Create Account', headerShown: true }} /> 
      
      {/* Tabs Group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* ... */}
    </Stack>
  );
}