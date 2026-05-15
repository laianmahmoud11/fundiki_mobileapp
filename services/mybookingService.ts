import { Booking, BookingStatus, CreateBookingPayload } from '../types/booking';
import {
  getUserBookingsFromFirebase,
  createBookingInFirebase,
  updateBookingInFirebase,
  getBookingByIdFromFirebase
} from './firebase/firebasemyBookingSource';

export async function getUserBookings(userId: string): Promise<Booking[]> {
  return getUserBookingsFromFirebase(userId);
}

export async function getActiveBookings(userId: string): Promise<Booking[]> {
  const bookings = await getUserBookings(userId);

  return bookings.filter(
    (booking) => booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'active'
  );
}

export async function getPastBookings(userId: string): Promise<Booking[]> {
  const bookings = await getUserBookings(userId);

  return bookings.filter(
    (booking) => booking.status === 'completed' || booking.status === 'cancelled'
  );
}

export async function createBooking(payload: CreateBookingPayload): Promise<string> {
  return createBookingInFirebase(payload);
}

export async function cancelBooking(bookingId: string): Promise<Booking | null> {
  await updateBookingInFirebase(bookingId, { status: 'cancelled' });
  return getBookingByIdFromFirebase(bookingId);
}

export async function completeBooking(bookingId: string): Promise<Booking | null> {
  await updateBookingInFirebase(bookingId, { status: 'completed' });
  return getBookingByIdFromFirebase(bookingId);
}

export function getBookingStatusLabel(status: BookingStatus) {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'active':
      return 'Active';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}

export function getBookingStatusColor(status: BookingStatus) {
  switch (status) {
    case 'pending':
      return '#d97706';
    case 'confirmed':
      return '#059669';
    case 'active':
      return '#1f4ba5';
    case 'completed':
      return '#16a34a';
    case 'cancelled':
      return '#dc2626';
    default:
      return '#6b7280';
  }
}