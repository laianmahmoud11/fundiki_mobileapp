import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SavedHotel } from '@/types/profile';
import HotelCard from './HotelCard';

type Props = {
  title: string;
  hotels?: SavedHotel[];
  emptyMessage: string;
  onBack: () => void;
};

export default function HotelsList({ title, hotels, emptyMessage, onBack }: Props) {
  const isEmpty = !hotels || hotels.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {isEmpty ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#E0E7FF',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Feather name="inbox" size={36} color="#006CE4" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 6 }}>
            Nothing here yet
          </Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20 }}>
            {emptyMessage}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 18 }} showsVerticalScrollIndicator={false}>
          {hotels.map((hotel, idx) => (
            <HotelCard
              key={hotel.id || `hotel-${idx}`}
              hotel={hotel}
              onPress={() =>
                Alert.alert(
                  hotel.name,
                  'Hotel details will open here once integrated with the team.'
                )
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}