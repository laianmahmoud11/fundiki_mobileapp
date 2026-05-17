import BottomNav from '@/components/common/BottomNav';
import { Stack} from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>

      
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      <BottomNav navItems={['Home', 'Favorite', 'MyBooking', 'Profile']} />
    </View>
  );
}
