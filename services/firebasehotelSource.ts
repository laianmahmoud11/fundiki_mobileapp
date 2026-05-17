import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebaseconfig";
import { Hotel } from "@/types/hotel";
import { Room } from "@/types/room";

export const gethotels = async (): Promise<Hotel[]> => {
  const snapshot = await getDocs(collection(db, "hotels"));

  return snapshot.docs.map((hotelDoc) => {
    const hotelData = hotelDoc.data() as Omit<Hotel, "id" | "rooms">;

    return {
      id: hotelDoc.id,
      ...hotelData,
      rooms: [],
    };
  });
};

export const createhotels = async (
  hotel: Omit<Hotel, "id" | "rooms"> & { rooms?: Room[] }
) => {
  const docRef = await addDoc(collection(db, "hotels"), hotel);

  return docRef.id;
};

export const getHotelById = async (id: string) => {
  const hotelRef = doc(db, "hotels", id);
  const hotelSnap = await getDoc(hotelRef);

  if (!hotelSnap.exists()) {
    throw new Error("Hotel not found");
  }


  const roomsSnap = await getDocs(collection(hotelRef, "rooms"));

  const rooms: Room[] = roomsSnap.docs.map((roomDoc) => ({
    id: roomDoc.id,
    ...(roomDoc.data() as Omit<Room, "id">),
  }));

  // eslint-disable-next-line no-console
  console.log("Fetched rooms from Firestore:", rooms);

  return {
    id: hotelSnap.id,
    ...(hotelSnap.data() as Omit<Hotel, "id" | "rooms">),
    rooms,
  };
};
