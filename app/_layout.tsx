import { HotelProvider } from '@/contexts/HotelContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from "@/lib/queryClient";
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Portal.Host>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <HotelProvider>
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
            </HotelProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Portal.Host>
    </PaperProvider>
  );
}
 