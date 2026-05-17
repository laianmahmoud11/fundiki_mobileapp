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
import { auth } from "@/services/firebaseconfig";

export default function FavoriteScreen() {
  const { savedHotels, isLoading, addSavedHotel, removeSavedHotel } = useData();
  const [isOffline, setIsOffline] = useState(false);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [offlineFavorites, setOfflineFavorites] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const database = await SQLite.openDatabaseAsync("hotels.db");
      const existingColumns = await database.getAllAsync<any>("PRAGMA table_info(favorites);");
      const existingColumnNames = existingColumns.map((column) => column.name);

      if (existingColumns.length > 0 && !existingColumnNames.includes("userId")) {
        await database.execAsync("DROP TABLE IF EXISTS favorites;");
      }

      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS favorites (
          id TEXT NOT NULL,
          userId TEXT NOT NULL,
          name TEXT,
          city TEXT,
          country TEXT,
          street TEXT,
          description TEXT,
          image TEXT,
          price REAL,
          rating REAL,
          PRIMARY KEY (id, userId)
        );`
      );
      const columns = await database.getAllAsync<any>("PRAGMA table_info(favorites);");
      const columnNames = columns.map((column) => column.name);
      const missingColumns = [
        ["userId", "TEXT"],
        ["city", "TEXT"],
        ["country", "TEXT"],
        ["street", "TEXT"],
        ["description", "TEXT"],
        ["image", "TEXT"],
        ["price", "REAL"],
        ["rating", "REAL"],
      ].filter(([name]) => !columnNames.includes(name));

      for (const [name, type] of missingColumns) {
        await database.execAsync(`ALTER TABLE favorites ADD COLUMN ${name} ${type};`);
      }
      if (!cancelled) setDb(database);
    })();
    return () => { cancelled = true; };
  }, []);

  const loadOffline = useCallback(async () => {
    if (!db) return;
    try {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        setOfflineFavorites([]);
        return;
      }

      const rows = await db.getAllAsync<any>(
        "SELECT * FROM favorites WHERE userId = ? ORDER BY rowid DESC;",
        [userId]
      );
      setOfflineFavorites(rows);
    } catch (err) {
      console.error("Load offline failed:", err);
    }
  }, [db]);

  useEffect(() => { void loadOffline(); }, [loadOffline]);

  useEffect(() => {
    if (!db || isOffline) return;

    (async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          setOfflineFavorites([]);
          return;
        }

        await db.runAsync("DELETE FROM favorites WHERE userId = ?;", [userId]);

        for (const hotel of savedHotels) {
          await db.runAsync(
            `INSERT OR REPLACE INTO favorites (id, userId, name, city, country, street, description, image, price, rating) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
              hotel.id,
              userId,
              hotel.name,
              hotel.city,
              hotel.country,
              hotel.street ?? "",
              hotel.description ?? "",
              hotel.image ?? "",
              hotel.price ?? hotel.pricePerNight ?? 0,
              hotel.rating ?? hotel.starRating ?? 0,
            ]
          );
        }
        await loadOffline();
      } catch (err) {
        console.error("Sync saved hotels to local DB failed:", err);
      }
    })();
  }, [db, isOffline, savedHotels, loadOffline]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected ?? false;
      setIsOffline(!isConnected);

      if (!isConnected) {
        void loadOffline();
      }
    });
    return () => unsubscribe();
  }, [loadOffline]); 

  const handleToggle = async (hotel: any) => {
    const isAlreadySaved = offlineFavorites.some((h: any) => h.id === hotel.id);
    try {
      const userId = auth.currentUser?.uid;

      if (!userId) return;

      if (isAlreadySaved) {
        await db?.runAsync("DELETE FROM favorites WHERE id = ? AND userId = ?;", [hotel.id, userId]);
        if (!isOffline) await removeSavedHotel(hotel.id);
      } else {
        await db?.runAsync(
          `INSERT OR REPLACE INTO favorites (id, userId, name, city, country, street, description, image, price, rating) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [hotel.id, userId, hotel.name, hotel.city, hotel.country, hotel.street, hotel.description, hotel.image, hotel.price ?? hotel.pricePerNight ?? 0, hotel.rating ?? hotel.starRating ?? 0]
        );
        if (!isOffline) await addSavedHotel(hotel.id);
      }
      await loadOffline();
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const displayHotels = isOffline ? offlineFavorites : savedHotels;
  const loading = isLoading && !isOffline;

return (
    <SafeAreaView style={styles.container}>
      <SmallNaviBar><BrandLogo /></SmallNaviBar>
      <View style={styles.content}>
        <Text style={styles.title}>Favorite Hotels</Text>
        {loading ? (
          <View style={styles.messageBox}><Text style={styles.message}>Loading...</Text></View>
        ) : displayHotels.length === 0 ? (
          <View style={styles.messageBox}>
            <Text style={styles.message}>{isOffline ? "No offline data found" : "No favorite hotels yet"}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {displayHotels.map((hotel: any) => (
              <HotelListCard
                key={hotel.id}
                {...hotel}
                price={hotel.price ?? hotel.pricePerNight ?? 0}
                starRating={hotel.rating ?? hotel.starRating}
                isFavorite={true}
                onFavoriteChange={loadOffline}
              />
            ))}
          </ScrollView>
        )}
      </View>
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
