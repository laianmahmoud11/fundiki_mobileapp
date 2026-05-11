import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Booking, CreateBookingPayload } from '../../types/booking';
import { db } from '../firebaseconfig';

function mapBooking(docSnap: any): Booking {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    userId: data.userId ?? '',
    hotelId: data.hotelId ?? '',
    hotelName: data.hotelName ?? '',
    city: data.city ?? '',
    image: data.image ?? '',
    dateFrom: data.dateFrom ?? '',
    dateTo: data.dateTo ?? '',
    rooms: data.rooms ?? 1,
    guests: data.guests ?? 1,
    status: data.status ?? 'pending',
  };
}

export async function getUserBookingsFromFirebase(userId: string): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const bookingsQuery = query(bookingsRef, where('userId', '==', userId));
  const snapshot = await getDocs(bookingsQuery);

  return snapshot.docs.map(mapBooking);
}

export async function createBookingInFirebase(payload: CreateBookingPayload): Promise<Booking> {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...payload,
    status: 'pending',
  });

  const createdSnapshot = await getDoc(doc(db, 'bookings', docRef.id));

  return mapBooking(createdSnapshot);
}

export async function cancelBookingInFirebase(bookingId: string): Promise<Booking | null> {
  const bookingRef = doc(db, 'bookings', bookingId);

  await updateDoc(bookingRef, {
    status: 'cancelled',
  });

  const updatedSnapshot = await getDoc(bookingRef);

  if (!updatedSnapshot.exists()) {
    return null;
  }

  return mapBooking(updatedSnapshot);
}

export async function completeBookingInFirebase(bookingId: string): Promise<Booking | null> {
  const bookingRef = doc(db, 'bookings', bookingId);

  await updateDoc(bookingRef, {
    status: 'completed',
  });

  const updatedSnapshot = await getDoc(bookingRef);

  if (!updatedSnapshot.exists()) {
    return null;
  }

  return mapBooking(updatedSnapshot);
}