import { HotelProvider } from '@/contexts/HotelContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from "@/lib/queryClient";

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
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { PaperProvider, Portal } from 'react-native-paper';
import 'react-native-reanimated';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebaseconfig';
import { DataProvider } from '@/contexts/DataContext';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (!authReady) {
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, [authReady]);

  useEffect(() => {
    if (fontsLoaded && authReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authReady]);

  const colorScheme = useColorScheme();

  if (!fontsLoaded || !authReady) {
    return null;
  }

  return (
    <PaperProvider>
      <Portal.Host>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Portal.Host>
    </PaperProvider>
  );
}
 