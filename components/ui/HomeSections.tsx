import SectionTitle from '@/components/ui/SectionTitle';
import { AntDesign } from '@expo/vector-icons';
import { Image, ScrollView, Text, View } from 'react-native';

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

type HomeSectionsProps = {
  weekendDeals: HomeHotel[];
  popularHotels: HomeHotel[];
};

export default function HomeSections({
  weekendDeals,
  popularHotels,
}: HomeSectionsProps) {
  const capitalIdeas = [...weekendDeals, ...popularHotels]
    .filter((hotel, index, hotels) => {
      return hotels.findIndex((item) => item.city === hotel.city) === index;
    })
    .slice(0, 4);

  return (
    <>
      <SectionTitle
        title="Deals for weekend"
        subtitle="Save on stays in top Arab destinations"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {weekendDeals.map((hotel) => (
          <View
            key={hotel.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              elevation: 3,
              marginRight: 14,
              overflow: 'hidden',
              shadowColor: '#B8C9F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.18,
              shadowRadius: 12,
              width: 210,
            }}
          >
            <Image source={{ uri: hotel.image }} style={{ height: 170, width: '100%' }} />
            <View style={{ flex: 1, padding: 14 }}>
              <Text
                style={{
                  color: '#0D3B95',
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                {hotel.name}
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#0D3B95',
                    borderRadius: 4,
                    marginRight: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins_700Bold',
                      fontSize: 11,
                    }}
                  >
                    {hotel.rating}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#5C6B89',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                    marginRight: 4,
                  }}
                >
                  {hotel.reviewText}
                </Text>
                <Text
                  style={{
                    color: '#5C6B89',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                    marginRight: 4,
                  }}
                >
                  - {hotel.reviews}
                </Text>
              </View>
              <Text
                style={{
                  color: '#0D3B95',
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                Location: {hotel.city}
              </Text>

              {hotel.badge ? (
                <View
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#15803D',
                    borderRadius: 5,
                    marginTop: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Poppins_700Bold',
                      fontSize: 12,
                    }}
                  >
                    {hotel.badge}
                  </Text>
                </View>
              ) : null}

              <View
                style={{
                  alignItems: 'baseline',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 'auto',
                  paddingTop: 18,
                }}
              >
                <Text
                  style={{
                    color: '#5C6B89',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                    marginRight: 4,
                  }}
                >
                  {hotel.nights}:
                </Text>
                <Text
                  style={{
                    color: '#dc2626',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 13,
                    marginRight: 6,
                    textDecorationLine: 'line-through',
                  }}
                >
                  {hotel.oldPrice}
                </Text>
                <Text
                  style={{
                    color: '#0D3B95',
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 28,
                  }}
                >
                  {hotel.newPrice}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <SectionTitle
        title="Popular hotels"
        subtitle="Top-rated stays across capital cities"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {popularHotels.map((hotel) => (
          <View
            key={hotel.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              elevation: 3,
              marginRight: 14,
              overflow: 'hidden',
              shadowColor: '#B8C9F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              width: 224,
            }}
          >
            <Image source={{ uri: hotel.image }} style={{ height: 178, width: '100%' }} />
            <View style={{ minHeight: 118, paddingHorizontal: 14, paddingVertical: 14 }}>
              <Text
                style={{
                  color: '#101010',
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 15,
                  lineHeight: 22,
                  minHeight: 44,
                }}
              >
                {hotel.name}
              </Text>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                <AntDesign
                  name="star"
                  size={18}
                  color="#FFC107"
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    color: '#101010',
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 13,
                    marginRight: 5,
                  }}
                >
                  {hotel.rating}
                </Text>
                <Text
                  style={{
                    color: '#101010',
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 13,
                    marginRight: 5,
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: '#6A6A6A',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                  }}
                >
                  {hotel.reviews}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'baseline',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: '#101010',
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 14,
                    marginLeft: 6,
                  }}
                >
                  Starting from
                </Text>
                <Text
                  style={{
                    color: '#101010',
                    fontFamily: 'Poppins_700Bold',
                    fontSize: 14,
                    marginRight: 4,
                  }}
                >
                  {hotel.newPrice}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <SectionTitle
        title="Capital ideas"
        subtitle="Explore hand-picked capital stays"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {capitalIdeas.map((hotel) => (
          <View
            key={hotel.id}
            style={{ borderRadius: 12, marginRight: 12, overflow: 'hidden', width: 182 }}
          >
            <Image source={{ uri: hotel.image }} style={{ height: 190, width: '100%' }} />
            <View
              style={{
                backgroundColor: 'rgba(13, 59, 149, 0.24)',
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            />
            <Text
              style={{
                bottom: 14,
                color: '#FFFFFF',
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
                left: 12,
                position: 'absolute',
              }}
            >
              {hotel.city}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
