import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { QueryProvider } from '@/config/query-provider';
import '../global.css';
import { PortalHost } from '@rn-primitives/portal';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useProtectedRoute } from '@/features/auth/hooks/useProtectRoutes';
import LoadingScreen from '@/components/molecule/loadingScreen';
import { auth } from '@/config/firebase';

function ProtectedLayout() {
  useProtectedRoute();

  return (
    <QueryProvider>
      <Stack>
        {/* Login Page (index.tsx) */}
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />

        {/* Signup Page (signup.tsx) */}
        <Stack.Screen
          name="(auth)/signup"
          options={{ title: 'Create Account', headerShown: false }}
        />

        {/* Customer Routes */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </QueryProvider>
  );
}

export default function RootLayout() {
  // Get state and setters from the store
  const { initializing, setInitializing, setUser } = useAuthStore();

  // Set up the auth listener
  useEffect(() => {
    // Firebase will check its persisted session automatically
    // This listener will fire with the persisted user if one exists
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [setUser, setInitializing]);

  // Render loading while initializing
  if (initializing) {
    return <LoadingScreen />;
  }

  // Once initialized, render the ProtectedLayout
  return <ProtectedLayout />;
}
