import BrandLogo from "@/components/common/brandLogo";
import SmallNaviBar from "@/components/common/smallNaviBar";
import HotelListCard from "@/components/hotelList-card";
import { useData } from "@/contexts/DataContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import NetInfo from "@react-native-community/netinfo";

export default function FavoriteScreen() {
   const [savedHotels, setSavedHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [offlineFavorites, setOfflineFavorites] = useState<any[]>([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const database = await SQLite.openDatabaseAsync("hotels.db");
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS favorites (
          id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, price REAL, rating REAL
        );`
      );
      if (!cancelled) setDb(database);
    })();
    return () => { cancelled = true; };
  }, []);

  const loadOffline = useCallback(async () => {
    if (!db) return;
    const rows = await db.getAllAsync<any>("SELECT * FROM favorites ORDER BY id DESC;");
    setOfflineFavorites(rows.map((r) => r.text));
  }, [db]);

    const loadFavorites = async (database?: SQLite.SQLiteDatabase) => {
    const dbInstance = database || db;
    if (!dbInstance) return;

    setIsLoading(true);

    const rows = await dbInstance.getAllAsync(
      "SELECT * FROM favorites ORDER BY rowid DESC;"
    );

    setSavedHotels(rows);
    setIsLoading(false);
  };
const refreshData = async () => {
    await loadFavorites();
  };
  return (
    <View style={styles.container}>

      <SmallNaviBar>
        <BrandLogo />
      </SmallNaviBar>

      <View style={styles.content}>
        <Text style={styles.title}>Favorite Hotels</Text>

        {isLoading && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>Loading...</Text>
          </View>
        )}

        {!isLoading && savedHotels.length === 0 && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>No favorite hotels yet.</Text>
          </View>
        )}
      </View>

{savedHotels.length > 0 && (
        <ScrollView contentContainerStyle={styles.list}>
          {savedHotels.map((hotel) => (
            <HotelListCard
              key={hotel.id}
              {...hotel}
              price={hotel.pricePerNight}
              starRating={hotel.rating}
              isFavorite
              onFavoriteChange={refreshData}
            />
          ))}
        </ScrollView>
      )}

    </View>
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