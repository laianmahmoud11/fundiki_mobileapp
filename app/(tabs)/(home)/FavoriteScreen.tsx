import BrandLogo from "@/components/common/brandLogo";
import SmallNaviBar from "@/components/common/smallNaviBar";
import HotelListCard from "@/components/hotelList-card";
import { getFavoriteHotels, isUserLoggedIn } from "@/services/favoriteService";
import { gethotels } from "@/services/firebasehotelSource";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteScreen() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    if (!isUserLoggedIn()) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    setLoggedIn(true);
    const favoriteIds = await getFavoriteHotels();
    const allHotels = await gethotels();
    const data = allHotels.filter((hotel: any) => favoriteIds.includes(hotel.id));
    setHotels(data);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SmallNaviBar>
        <BrandLogo />
      </SmallNaviBar>

      <View style={styles.content}>
        <Text style={styles.title}>Favorite Hotels</Text>

        {loading && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>Loading...</Text>
          </View>
        )}

        {!loading && !loggedIn && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>
              Please sign in first to see your favorite hotels.
            </Text>
          </View>
        )}

        {!loading && loggedIn && hotels.length === 0 && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>No favorite hotels yet.</Text>
          </View>
        )}
      </View>

      {hotels.length > 0 && (
        <ScrollView contentContainerStyle={styles.list}>
          {hotels.map((hotel: any) => (
            <HotelListCard
              key={hotel.id}
              {...hotel}
              isFavorite
              onFavoriteChange={loadFavorites}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    paddingHorizontal: wp("2.5%"),
    paddingTop: hp("1%"),
  },
  title: {
    color: "#003B95",
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    color: "#101010",
    fontSize: wp("4%"),
    fontWeight: "600",
    textAlign: "center",
  },
  messageBox: {
    alignItems: "center",
    minHeight: hp("65%"),
    justifyContent: "center",
  },
  list: {
    paddingBottom: hp("3%"),
  },
});
