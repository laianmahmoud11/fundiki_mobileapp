export type Booking = {
  hotelName: string;
  image: string;
  guests: number;
  roomType: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  paymentWay: "VISA" | "arrival";
  paymentStatus: "paid" | "notpaid";
};