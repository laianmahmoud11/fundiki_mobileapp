import { Stack } from 'expo-router';
import { HotelProvider } from '@/contexts/HotelContext';

export default function Layout() {
  return (
    <HotelProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[id]" />
      </Stack>
    </HotelProvider>
  );
}