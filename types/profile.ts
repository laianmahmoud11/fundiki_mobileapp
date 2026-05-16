export type ProfileUser = {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  completedProfile?: boolean;
  preferredCity?: string;
  roomType?: string;
  bedType?: string;
  paymentMethod?: string;
  specialRequests?: string;
  credits?: number;
  rewardPoints?: number;
};

export type SavedHotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  pricePerNight?: number;
  price?: number;
  rating?: number;
  starRating?: number;
  street?: string;
  description?: string;
  savedAt?: string;
};

export type ProfileFormType = 'personal' | 'hotel' | 'complete';

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredCity: string;
  roomType: string;
  bedType: string;
  paymentMethod: string;
  specialRequests: string;
};