import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseconfig";

const getFavoriteKey = () => {
  return auth.currentUser ? "favoriteHotels_" + auth.currentUser.uid : "";
}

async function getFavoriteHotelIds() {
  const favoriteKey = getFavoriteKey();
  const value = favoriteKey ? await AsyncStorage.getItem(favoriteKey) : null;

  return value ? JSON.parse(value) : [];
}

async function saveFavoriteHotelIds(hotelIds: string[]) {
  const favoriteKey = getFavoriteKey();

  return favoriteKey
    ? AsyncStorage.setItem(favoriteKey, JSON.stringify(hotelIds))
    : undefined;
}

export const isUserLoggedIn = () => {
  return auth.currentUser !== null;
}

export const getFavoriteHotels = async () => {
  return await getFavoriteHotelIds();
}

export const addFavoriteHotel = async (hotelId: string) => {
  const hotelIds = await getFavoriteHotelIds();
  const newHotelIds = Array.from(new Set([...hotelIds, hotelId]));

  await saveFavoriteHotelIds(newHotelIds);
}

export const removeFavoriteHotel = async (hotelId: string) => {
  const hotelIds = await getFavoriteHotelIds();
  const newHotelIds = hotelIds.filter((id: string) => id !== hotelId);

  await saveFavoriteHotelIds(newHotelIds);
}
