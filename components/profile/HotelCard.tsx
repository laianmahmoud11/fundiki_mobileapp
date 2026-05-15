import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SavedHotel } from '@/types/profile';

type Props = {
  hotel: SavedHotel;
  onPress: () => void;
};

export default function HotelCard({ hotel, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e7eb',
      }}
    >
      <Image source={{ uri: hotel.image }} style={{ width: '100%', height: 180 }} />

      <View style={{ padding: 14 }}>
        <Text
          style={{ fontSize: 17, fontWeight: '700', color: '#1f2937', marginBottom: 4 }}
          numberOfLines={1}
        >
          {hotel.name}
        </Text>

        <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 10 }} numberOfLines={1}>
          {hotel.city}, {hotel.country}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Feather name="star" size={14} color="#F59E0B" />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
              {hotel.rating?.toFixed(1) ?? 'N/A'}
            </Text>
          </View>

          <Text style={{ fontSize: 15, fontWeight: '700', color: '#006CE4' }}>
            €{hotel.pricePerNight}/night
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}