import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from './useAuthStore';

export function useProtectedRoute() {
  // Get the auth state from the Zustand store
  const { user, initializing } = useAuthStore();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 1. Wait until the auth state is initialized
    if (initializing) {
      return;
    }

    // 2. Check if the user is in the auth group
    const inAuthGroup = segments[0] === '(auth)';

    // 3. Perform the redirect
    if (!user && !inAuthGroup) {
      // User is not logged in and not in the auth group.
      // Redirect to the login page.
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // User is logged in but still in the auth group (e.g., on login page).
      // Redirect to the main app (e.g., home).
      router.replace('/(app)/(customer)/(tabs)');
    }
  }, [user, initializing, segments, router]); // Re-run effect when state changes
}
