import { getHotel } from '@/api/hotelService';
import HomeHeader from '@/components/ui/HomeHeader';
import HomeSections from '@/components/ui/HomeSections';
import InputSearch from '@/components/ui/inputSearch';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ApiHotel = {
  id: string;
  name: string;
  city: string;
  country?: string;
  image: string;
  price?: number;
  pricePerNight?: number;
  rating?: number;
};

type HomeHotel = {
  id: string;
  city: string;
  name: string;
  rating: string;
  reviewText: string;
  reviews: string;
  badge: string | null;
  nights: string;
  oldPrice: string;
  newPrice: string;
  image: string;
};

export default function HomeScreen() {
  const [weekendDeals, setWeekendDeals] = useState<HomeHotel[]>([]);
  const [popularHotels, setPopularHotels] = useState<HomeHotel[]>([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  async function loadHomeData() {
    try {
      const hotelsData = await getHotel();
      const homeHotels = hotelsData.map((hotel: ApiHotel, index: number) => {
        const rating = Number(hotel.rating ?? 0);
        const price = hotel.pricePerNight ?? hotel.price ?? 0;

        return {
          id: hotel.id ?? `hotel-${index}`,
          city: hotel.city ?? hotel.country ?? '',
          name: hotel.name ?? 'Hotel',
          rating: Number.isFinite(rating) ? rating.toFixed(1) : '0.0',
          reviewText: rating >= 8.5 ? 'Excellent' : rating >= 8 ? 'Very good' : 'Good',
          reviews: '0 reviews',
          badge: index < 3 ? 'Weekend deal' : null,
          nights: '2 nights',
          oldPrice: '',
          newPrice: price ? `EUR ${price}` : '',
          image: hotel.image ?? '',
        };
      });

      setWeekendDeals(homeHotels.slice(0, 3));
      setPopularHotels(
        [...homeHotels].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 3),
      );
    } catch {
      setWeekendDeals([]);
      setPopularHotels([]);
    }
  }

  function goToHotelList() {
    router.push('/hotelList');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1F4FFF' }}>
      <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <HomeHeader />

        <InputSearch placeholder="search" onFocus={goToHotelList} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          <HomeSections
            weekendDeals={weekendDeals}
            popularHotels={popularHotels}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
