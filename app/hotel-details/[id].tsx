import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import SmallNaviBar from "@/components/common/smallNaviBar";
import BrandLogo from "@/components/common/brandLogo";
import { Ionicons } from "@expo/vector-icons";
import { useHotelDetails } from "@/hooks/use-hotel-details";
import { useLocalSearchParams, router} from 'expo-router';
import { useQueryClient } from "@tanstack/react-query";
import HotelInfoCard from "@/components/ui/hotel-details/HotelInfoCard";
import { colors } from "@/constants/theme";
import RoomSelection from "@/components/ui/hotel-details/RoomSelection";
import HotelDetailsSummary from "@/components/ui/hotel-details/HotelDetailsSummary";
import { Hotel } from "@/types/hotel";
import { useEffect, useState } from "react";
import { useHotel } from "@/contexts/HotelContext";

const HotelDetails = () => {

  const { data: hotel, isLoading, error } = useHotelDetails();
  const { selectedRoom ,setSelectedRoom} = useHotel();
  const queryClient = useQueryClient();


  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [nights, setNights] = useState(3);
 const [guests, setGuests] = useState(2);

  const handleOnPress = () => {
    router.back();
  };

   useEffect(() => {
    if (dateFrom && dateTo) {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      const diff = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      setNights(Math.max(1, diff));
    }
  }, [dateFrom, dateTo]);

  const handleBooking = () => {

   setSelectedRoom( queryClient.setQueryData(['booking'], {
      hotelId: hotel?.id,
      hotelName: hotel?.name,
      roomId: selectedRoom?.id,
      roomType: selectedRoom?.name,
      roomPrice: selectedRoom?.price,
      image:hotel?.image,
      dateFrom,
      dateTo,
      nights,
      guests,
      totalPrice: selectedRoom?.price ? selectedRoom.price * nights : 0,
    }));
    
    router.push('/hotel-details/booking');
  }
  if (isLoading) {
    return (
      <View style={styles.centeredState}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View style={styles.centeredState}>
        <Text>{error?.message ?? "Hotel not found."}</Text>
      </View>
    );
  }

  console.log("HotelDetails render hotel=", hotel); 

  return (
    <ScrollView style={styles.container}>
      <SmallNaviBar>    
        <BrandLogo />
        <Pressable onPress={handleOnPress}>
          <Ionicons name="arrow-back" style={styles.icon} />
        </Pressable>
      </SmallNaviBar>
      <HotelInfoCard hotel={hotel as Hotel} />

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{hotel?.description}</Text>
      </View>

      <RoomSelection rooms={hotel?.rooms || []} />
      <HotelDetailsSummary    hotelName={hotel.name}
        onBookingPress={handleBooking}
        isDisabled={!selectedRoom}
        dateFrom={dateFrom}
        dateTo={dateTo}
        nights={nights}
        guests={guests}
        setGuests={setGuests}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
         
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centeredState: {
    marginTop: hp("50%"),
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: colors.white,
  },
  descriptionContainer: {
    padding: wp(4),
    marginHorizontal: wp(4),
    borderRadius: 12,
    marginVertical: wp(2),
  },
  description: {
    fontSize: wp(3.8),
    color: "black",
    lineHeight: wp(5),
  },
});

export default HotelDetails;