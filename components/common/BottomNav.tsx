import { Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

function BottomBarIcon({
  item,
  active,
}: {
  item: string;
  active: boolean;
}) {
  const color = active ? '#1F4FFF' : '#101010';
  const size = 31;

  if (item === 'Home') {
    return <Feather name="home" size={size} color={color} />;
  }

  if (item === 'Favorite') {
    return <Feather name="heart" size={size - 1} color={color} />;
  }

  if (item === 'MyBooking') {
    return <SimpleLineIcons name="briefcase" size={size - 1} color={color} />;
  }

  return <Ionicons name="person-circle-outline" size={size + 2} color={color} />;
}

type BottomNavProps = {
  navItems: string[];
  activeItem?: string;
};

export default function BottomNav({
  navItems,
  activeItem = 'Search',
}: BottomNavProps) {
  const router = useRouter();

  function handleNavigation(item: string) {
    if (item === 'Home') {
      router.push('/HomeScreen');
    }

    if (item === 'MyBooking') {
      router.push('/');
    }

    if (item === 'Profile') {
      router.push('/profile');
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderTopColor: '#DCE4FF',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingHorizontal: 8,
        paddingTop: 10,
      }}
    >
      {navItems.map((item) => (
        <TouchableOpacity
          key={item}
          style={{ alignItems: 'center', gap: 4 }}
          activeOpacity={0.85}
          onPress={() => handleNavigation(item)}
        >
          <BottomBarIcon item={item} active={item === activeItem} />
          <Text
            style={{
              color: '#101010',
              fontFamily: 'Poppins_500Medium',
              fontSize: 12,
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}