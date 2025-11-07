import '@/global.css';

import { QueryProvider } from '@/config/query-provider';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'Afacad-Regular': require('../assets/fonts/Afacad/static/Afacad-Regular.ttf'),
    'Afacad-Bold': require('../assets/fonts/Afacad/static/Afacad-Bold.ttf'),
    'Afacad-Italic': require('../assets/fonts/Afacad/static/Afacad-Italic.ttf'),
  });

  useEffect(() => {
    // Hide the splash screen once fonts are loaded or an error occurs
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until the fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack
            screenOptions={{
              headerShown: false, 
            }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryProvider>
  );
}
