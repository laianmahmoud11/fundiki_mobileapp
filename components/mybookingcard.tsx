import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Booking } from '../types/booking';
import { getBookingStatusColor, getBookingStatusLabel } from '../services/mybookingService';

type Props = {
  booking: Booking;
  showActions?: boolean;
  onCancelBooking?: (bookingId: string) => void;
  onCompleteBooking?: (bookingId: string) => void;
};

export default function BookingCard({
  booking,
  showActions = false,
  onCancelBooking,
  onCompleteBooking
}: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: booking.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {booking.hotelName}
        </Text>

        {booking.city && (
          <Text style={styles.city} numberOfLines={1}>
            {booking.city}
          </Text>
        )}

        <Text style={styles.details}>
          🗓 {booking.checkIn} - {booking.checkOut}
        </Text>
        <Text style={styles.details}>🛏 {booking.rooms} Rooms</Text>
        <Text style={styles.details}>👤 {booking.guests} Guests</Text>

        <Text style={[styles.status, { color: getBookingStatusColor(booking.status) }]}>
          {getBookingStatusLabel(booking.status)}
        </Text>

        {showActions && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.completeButton]}
              onPress={() => onCompleteBooking?.(booking.id)}
            >
              <Text style={styles.buttonText}>Complete Stay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => onCancelBooking?.(booking.id)}
            >
              <Text style={styles.buttonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4
  },
  image: {
    width: '100%',
    height: 180
  },
  info: {
    padding: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  city: {
    color: 'gray',
    marginTop: 3,
    marginBottom: 6,
    fontSize: 13
  },
  details: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18
  },
  status: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14
  },
  actions: {
    flexDirection: 'column',
    marginTop: 12
  },
  button: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center'
  },
  completeButton: {
    backgroundColor: '#1f4ba5',
    marginBottom: 8
  },
  cancelButton: {
    backgroundColor: '#d32f2f'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13
  }
});