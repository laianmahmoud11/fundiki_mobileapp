
import { Booking } from "@/types/bookings";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseconfig";

export const addBooking = async (payload: Booking) => {
    const doc = await addDoc(collection(db, "bookings"), payload)
    return doc.id
}