
import { Booking } from "@/types/bookings";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseconfig";

export const addBooking = async (payload: Booking & { userId?: string }) => {
    const safePayload = {
        ...payload,
        userId: (payload as any).userId ?? '',
    };

    const doc = await addDoc(collection(db, "bookings"), safePayload);
    return doc.id;
};