export type BookingStatus = 'active' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  userId: string;
  hotelId: string;
  hotelName: string;
  city: string;
  country?: string;
  image: string;
  dateFrom: string;
  dateTo: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  rooms: number;
  guests: number;
  status: BookingStatus;
};

export type CreateBookingPayload = {
  userId: string;
  hotelId: string;
  hotelName: string;
  city: string;
  image: string;
  dateFrom: string;
  dateTo: string;
  rooms: number;
  guests: number;
};
