import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '@/constants/theme';
import { Hotel } from '@/types/hotel';

interface HotelInfoCardProps {
  hotel: Hotel;
}

const HotelInfoCard= ({ hotel }: HotelInfoCardProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStars}>{hotel.starRating} </Text>
          <Text style={styles.reviews}>{hotel.reviews}</Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="#666" />
          <Text style={styles.locationText}>
            {hotel.city}, {hotel.country}
          </Text>
        </View>
        
      </View>
      <Image source={{ uri: hotel.image }} style={styles.heroImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(2),
  },
  heroImage: {
    width: '100%',
    height: wp(80),
  },
  infoContainer: {
    padding: wp(2),},
  hotelName: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: colors.black,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: wp(4),
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 8,
  },
  reviews: {
    fontSize: wp(3.5),
    color: '#666',
  },
});

export default HotelInfoCard;