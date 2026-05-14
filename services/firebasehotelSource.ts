

import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";

import { Hotel } from "@/types/hotel";


export const gethotels = async () => {
    const snapshot = await getDocs(collection(db, "hotels"))

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
}


export const createhotels = async (hotel: Hotel) => {
    const doc = await addDoc(collection(db, "hotels"), hotel)
    return doc.id
}

export const getHotelById = async (id: string) => {
 const docRef = doc(db, "hotels", id);
  const docSnap = await getDoc(docRef);

   return {
      ...(docSnap.data() as Hotel),
      id: docSnap.id,
    } as Hotel;
}
