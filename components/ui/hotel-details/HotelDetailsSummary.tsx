import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '@/constants/theme';
import PrimaryButton from '@/components/common/primaryButton';
import { useHotel } from '@/contexts/HotelContext';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

type BookingSummaryProps = {
  hotelName: string;
  onBookingPress: () => void;
  isDisabled: boolean;
  dateFrom: string;
  dateTo: string;
  nights: number;
  guests: number;
  setGuests: (n: number) => void;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
};

const BookingSummary = ({
  hotelName,
  onBookingPress,
  isDisabled,
  dateFrom,
  dateTo,
  nights,
  guests,
  setGuests,
  setDateFrom,
  setDateTo,
}: BookingSummaryProps) => {
  const { selectedRoom } = useHotel();
  const [showCalendar, setShowCalendar] = useState(false);
  
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const markedDates = {
    [dateFrom]: { 
      startingDay: true, 
      color: colors.primary, 
      textColor: 'white' 
    },
    [dateTo]: { 
      endingDay: true, 
      color: colors.primary, 
      textColor: 'white' 
    },
  };

  const onDayPress = (day: any) => {
    if (!dateFrom) {
      setDateFrom(day.dateString);
    } else if (!dateTo) {
      setDateTo(day.dateString); 
      setShowCalendar(false);
    } else {
      setDateFrom(day.dateString); 
      setDateTo('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking Summary</Text>

      <TouchableOpacity 
        style={styles.dateField} 
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.dateLabel}>Check-in</Text>
        <Text style={styles.dateValue}>{dateFrom }</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.dateField} 
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.dateLabel}>Check-out</Text>
        <Text style={styles.dateValue}>{dateTo}</Text>
      </TouchableOpacity>

      <View style={styles.guestsField}>
        <Text style={styles.guestsLabel}>Guests</Text>
        <Picker 
          selectedValue={guests} 
          onValueChange={setGuests} 
          style={styles.picker}
        >
          {[1,2,3,4].map(n => (
            <Picker.Item key={n} label={`${n} guest${n>1?'s':''}`} value={n} />
          ))}
        </Picker>
      </View>

      {selectedRoom && (
        <View style={styles.priceCard}>
          <Text style={styles.priceText}>${selectedRoom.price} × {nights} nights</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
      )}

      <PrimaryButton
        title={"Book Now"}
        onPress={onBookingPress}
        disabled={isDisabled || !selectedRoom}
        color="blue"
      />

      {showCalendar && (
        <View style={styles.calendarWrapper}>
          <Calendar
            markedDates={markedDates}
            onDayPress={onDayPress}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: 'white',
              todayTextColor: "red",
              arrowColor: colors.black,
            }}
          />
          <TouchableOpacity 
            style={styles.closeBtn}
            onPress={() => setShowCalendar(false)}
          >
            <Text style={styles.closeText}>Close Calendar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: wp(4),
    margin: wp(3),
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: wp(4),
  },
  dateField: {
    backgroundColor: '#f8f9fa',
    padding: wp(4),
    borderRadius: 12,
    marginBottom: wp(2),
  },
  dateLabel: {
    fontSize: wp(3.5),
    color: '#777',
    marginBottom: wp(1),
  },
  dateValue: {
    fontSize: wp(4.5),
    fontWeight: '600',
  },
  guestsField: {
    marginVertical: wp(3),
  },
  guestsLabel: {
    fontSize: wp(4),
    fontWeight: '600',
    marginBottom: wp(2),
  },
  picker: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    height: 50,
  },
  priceCard: {
    backgroundColor: '#e3f2fd',
    padding: wp(4),
    borderRadius: 12,
    marginVertical: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: wp(4),
    color: '#1976d2',
  },
  totalPrice: {
    fontSize: wp(5.5),
    fontWeight: 'bold',
    color: "#0d70d3",
  },
  calendarWrapper: {
    marginTop: wp(3),
    backgroundColor: 'white',
    borderRadius: 12,
    padding: wp(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
  },
  closeBtn: {
    backgroundColor: colors.primary,
    padding: wp(3),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: wp(2),
  },
  closeText: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: '600',
  },
});

export default BookingSummary;