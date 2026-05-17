import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '@/constants/theme';
import PrimaryButton from '@/components/common/primaryButton';
import { useHotel } from '@/contexts/HotelContext';
import StorageService from '@/services/StorageService';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useProfile } from '@/hooks/useProfile';
import { ProfileUser } from '@/types/profile';
import DropDownPicker from 'react-native-dropdown-picker';

export const isProfileComplete = (profile: ProfileUser | null) => {
  return !!(profile?.firstName && profile?.lastName);
};

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
  const { profile } = useProfile();
  const [showCalendar, setShowCalendar] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [guestItems, setGuestItems] = useState([
    { label: '1 guest', value: 1 },
    { label: '2 guests', value: 2 },
    { label: '3 guests', value: 3 },
    { label: '4 guests', value: 4 },
  ]);

  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const markedDates = {
    [dateFrom]: {
      startingDay: true,
      color: colors.primary,
      textColor: 'white',
    },
    [dateTo]: {
      endingDay: true,
      color: colors.primary,
      textColor: 'white',
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
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Booking Summary</Text>

      <TouchableOpacity
        style={styles.dateField}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.dateLabel}>Check-in</Text>
        <Text style={styles.dateValue}>{dateFrom}</Text>
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

        <DropDownPicker
          open={guestOpen}
          value={guests}
          items={guestItems}
          setOpen={setGuestOpen}
          setValue={(callback: any) => {
            const value = callback(guests);
            setGuests(value);
          }}
          setItems={setGuestItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW"
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>

      {selectedRoom && (
        <View style={styles.priceCard}>
          <Text style={styles.priceText}>
            ${selectedRoom.price} × {nights} nights
          </Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
      )}

      <PrimaryButton
        title="Book Now"
        onPress={async () => {
          const user = await StorageService.getUser();

          if (!user) {
            router.push('/auth/signInOptionsScreen');
            return;
          }

          if (!isProfileComplete(profile)) {
            router.push('/profile');
            return;
          }

          onBookingPress();
        }}
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
              todayTextColor: 'red',
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
    backgroundColor: 'white',
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
    zIndex: 3000,
  },
  guestsLabel: {
    fontSize: wp(4),
    fontWeight: '600',
    marginBottom: wp(2),
  },
  dropdown: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderColor: '#e5e7eb',
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
    color: '#0d70d3',
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