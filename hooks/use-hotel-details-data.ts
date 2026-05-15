import { useState } from 'react';
import { router } from 'expo-router';
import { useHotel } from '@/contexts/HotelContext';

export const useHotelDetailsData = () => {
  const { selectedRoom } = useHotel();
  const [roomsCount, setRoomsCount] = useState(1);
  const [guests, setGuests] = useState(2);
  const [dateFrom, setDateFrom] = useState('2026-05-20');
  const [dateTo, setDateTo] = useState('2026-05-23');

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const totalPrice = selectedRoom 
    ? selectedRoom.price * roomsCount * nights 
    : 0;

  const handleNext = () => {
    router.push('/');
  };

  return {
    selectedRoom,
    roomsCount,
    setRoomsCount,
    guests,
    setGuests,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    nights,
    totalPrice,
    handleNext,
  };
};