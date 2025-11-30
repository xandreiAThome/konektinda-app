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
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function ProtectedLayout() {
  useProtectedRoute();

  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/signup"
          options={{ title: 'Create Account', headerShown: false }}
        />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </QueryProvider>
  );
}

export default function RootLayout() {
  const { initializing, setInitializing, setUser } = useAuthStore();

  const [fontsLoaded] = useFonts({
    'Afacad-Regular': require('../assets/fonts/Afacad/static/Afacad-Regular.ttf'),
    'Afacad-Bold': require('../assets/fonts/Afacad/static/Afacad-Bold.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [setUser, setInitializing]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (initializing) {
    return <LoadingScreen />;
  }

  return <ProtectedLayout />;
}
