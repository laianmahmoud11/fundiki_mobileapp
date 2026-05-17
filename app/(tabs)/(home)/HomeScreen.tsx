import HomeHeader from '@/components/ui/HomeHeader';
import HomeSections from '@/components/ui/HomeSections';
import InputSearch from '@/components/ui/inputSearch';
import { useHotels } from '@/hooks/useHotels';
import { router } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  const { data, isLoading, error } = useHotels();

  const homeHotels = (data ?? []).map((hotel: any, index:number) => {
   const rating = Number(hotel?.starRating ?? 0);
    const price = hotel?.price ?? 0;

    return {
      id: hotel?.id ?? `hotel-${index}`,
      city: hotel?.city ?? hotel?.country ?? '',
      name: hotel?.name ?? 'Hotel',
      rating: Number.isFinite(rating) ? rating.toFixed(1) : '0.0',
      reviewText: rating >= 4.5 ? 'Excellent' : rating >= 4 ? 'Very good' : 'Good',
      reviews: '0 reviews',
      badge: hotel?.isWeekendDeal ? 'Weekend deal' : null,
      nights: '2 nights',
      oldPrice: hotel?.oldPrice ? `$${hotel.oldPrice}` : '',
      newPrice: price ? `$${price}` : '',
      image: hotel?.image ?? '',
    };
  });

  const weekendDeals = homeHotels
    .filter((hotel) => hotel?.badge === 'Weekend deal')
    .slice(0, 5);

  const popularHotels = [...homeHotels]
    .filter((hotel) => Number(hotel.rating) >= 4)
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 5);

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
          {isLoading ? (
            <ActivityIndicator color="#1F4FFF" style={{ marginTop: 40 }} />
          ) : error ? (
            <Text style={{ marginTop: 40, textAlign: 'center' }}>Error fetching data</Text>
          ) : (
            <HomeSections
              weekendDeals={weekendDeals}
              popularHotels={popularHotels}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
