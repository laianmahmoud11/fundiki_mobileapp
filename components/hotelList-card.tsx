import { Alert, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { auth } from "@/services/firebaseconfig";
import { useData } from "@/contexts/DataContext";

const HotelListCard = ({ id, name, country, city, street, price, starRating, image, description, isFavorite, onFavoriteChange }: any) => {
  const { savedHotels, addSavedHotel, removeSavedHotel } = useData();

  const [favorite, SetFavorite] = useState<"heart-outline" | "heart">(isFavorite ? "heart" : "heart-outline");
  const color = favorite === "heart" ? "red" : "#424141";

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
    }, [id, savedHotels])
  );

  const checkFavorite = () => {
    const user = auth.currentUser;

    if (!user || user.isAnonymous) {
      SetFavorite("heart-outline");
      return;
    }

    const isSaved = savedHotels.some((hotel) => hotel.id === id);

    if (isSaved) {
      SetFavorite("heart");
    } else {
      SetFavorite("heart-outline");
    }
  };

  const FavoriteHotels = async () => {
    const user = auth.currentUser;

    if (!user || user.isAnonymous) {
      Alert.alert("Sign in required", "Please sign in first to add this hotel to favorite.");
      return;
    }

    if (favorite === "heart-outline") {
      SetFavorite("heart");
      await addSavedHotel(id);
    } else {
      SetFavorite("heart-outline");
      await removeSavedHotel(id);
    }

    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  const handleOnPress = () => {
    router.push(`/hotel-details/${id}`);
  }

  return (
    <Pressable onPress={handleOnPress}>
    <View style={styles.container} key={id}>
      <Image style={styles.images} source={{ uri: image }} />

      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{name} </Text>
          <Ionicons name={favorite} size={24} style={{ color: color }} onPress={FavoriteHotels} />
        </View>

        <Rating
          type="star"
          ratingCount={5}
          imageSize={12}
          startingValue={starRating}
          readonly
          style={{ alignSelf: "flex-start", marginVertical: 5 }}
        />

        <Text style={{ color: "000000", marginVertical: 5 }}>
          <Ionicons name="location-outline" size={16} color="#FFC107" style={{ marginRight: 4 }} />
          {country}     {city}     {street}
        </Text>

        <Text style={{ color: "000000", marginVertical: 5 }}>
          <Ionicons name="bed-outline" size={16} color="#FFC107" style={{ marginRight: 4 }} />
          {description}
        </Text>

        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    backgroundColor: "#ffff",
    borderRadius: 10,
    marginHorizontal: "2.5%",
    marginVertical: "2%"
  },
  images: {
    flex: 0.75,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5
  },
  name: {
    fontSize: 20,
    color: "#003B95",
    fontWeight: 'bold'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#003B95",
    alignSelf: "flex-end",
    marginBottom: 5
  }
});

export default HotelListCard;