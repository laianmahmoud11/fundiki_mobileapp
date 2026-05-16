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
    checkIn: data.checkIn ?? '',
    checkOut: data.checkOut ?? '',
    nights: data.nights ?? 0,
    rooms: data.rooms ?? 1,
    guests: data.guests ?? 1,
    roomType: data.roomType ?? '',
    status: data.status ?? 'pending',
    paymentStatus: data.paymentStatus ?? '',
    paymentWay: data.paymentWay ?? '',
    totalPrice: data.totalPrice ?? '',
    createdAt: data.createdAt ?? '',
  };
}

export async function getUserBookingsFromFirebase(userId: string): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const bookingsQuery = query(bookingsRef, where('userId', '==', userId));
  const snapshot = await getDocs(bookingsQuery);
  
  return snapshot.docs.map(mapBooking);
}

export async function createBookingInFirebase(payload: CreateBookingPayload): Promise<string> {
  const docRef = await addDoc(collection(db, 'bookings'), {
    userId: payload.userId ?? '',
    hotelId: payload.hotelId ?? '',
    hotelName: payload.hotelName ?? '',
    city: payload.city ?? '',
    image: payload.image ?? '',
    checkIn: payload.checkIn ?? '',
    checkOut: payload.checkOut ?? '',
    nights: payload.nights ?? 0,
    rooms: payload.rooms ?? 1,
    guests: payload.guests ?? 1,
    roomType: payload.roomType ?? '',
    status: payload.status ?? 'pending',
    paymentStatus: payload.paymentStatus ?? '',
    paymentWay: payload.paymentWay ?? '',
    totalPrice: payload.totalPrice ?? '',
    createdAt: new Date().toISOString(),
  });
  
  return docRef.id;
}

export async function updateBookingInFirebase(bookingId: string, updates: Partial<Booking>): Promise<void> {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, updates);
}

export async function getBookingByIdFromFirebase(bookingId: string): Promise<Booking | null> {
  const bookingRef = doc(db, 'bookings', bookingId);
  const bookingSnap = await getDoc(bookingRef);
  
  if (!bookingSnap.exists()) {
    return null;
  }
  
  return mapBooking(bookingSnap);
}