import { useQuery } from '@tanstack/react-query';
import { getHotelById } from '@/services/firebasehotelSource';
import { useLocalSearchParams } from 'expo-router';

export const useHotelDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return useQuery({
    queryKey: ['hotelDetails', id],
    queryFn: () => getHotelById(id),
  });
};