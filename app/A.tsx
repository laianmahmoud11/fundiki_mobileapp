import { useHotel } from "@/contexts/HotelContext";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function A() {
  const { setSelectedRoom } = useHotel();

  const testBooking = () => {
    setSelectedRoom({
      hotelName: "Test Hotel",
    image: "https://picsum.photos/400",
      roomType: "Deluxe Room",
      guests: 2,
      nights: 3,
      checkIn: "2026-05-15",
      checkOut: "2026-05-18",
      totalPrice: 120 * 3 +" "+ "USD",
    });
 router.push("/booking");
    
  };

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Mock Hotel Page
      </Text>

      <Button title="Test Booking Data" onPress={testBooking} />

    </View>
  );
}