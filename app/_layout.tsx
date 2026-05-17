import { HotelProvider } from '@/contexts/HotelContext';
import { DataProvider } from '@/contexts/DataContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from "@/lib/queryClient";
import { auth } from '@/services/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Portal } from 'react-native-paper';
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [authReady, setAuthReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded && authReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authReady]);

  if (!fontsLoaded || !authReady) {
    return null;
  }

  return (
    <PaperProvider>
      <Portal.Host>
        <QueryClientProvider client={queryClient}>
          <HotelProvider>
            <DataProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    headerTitle: "",
                    header: () => null,
                  }}
                >
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>

                <StatusBar style="auto" />
              </ThemeProvider>
            </DataProvider>
          </HotelProvider>
        </QueryClientProvider>
      </Portal.Host>
    </PaperProvider>
  );
}