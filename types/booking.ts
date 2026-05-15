export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  userId: string;
  hotelId?: string;
  hotelName: string;
  city?: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights?: number;
  rooms?: number;
  guests: number;
  roomType?: string;
  status: BookingStatus;
  paymentStatus?: string;
  paymentWay?: string;
  totalPrice?: string;
  createdAt?: string;
}

export interface CreateBookingPayload {
  userId: string;
  hotelId?: string;
  hotelName: string;
  city?: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights?: number;
  rooms?: number;
  guests: number;
  roomType?: string;
  status?: BookingStatus;
  paymentStatus?: string;
  paymentWay?: string;
  totalPrice?: string;
}