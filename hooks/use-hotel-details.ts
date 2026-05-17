import { useQuery } from '@tanstack/react-query';
import { getHotelById } from '@/services/firebasehotelSource';
import { useLocalSearchParams } from 'expo-router';
import { Hotel } from '@/types/hotel';

export const useHotelDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  
  
  const hotelId = Array.isArray(id) ? id[0] : id;

  return useQuery<Hotel, Error>({
    queryKey: ["hotel", hotelId],
    queryFn: async () => {
      const result = await getHotelById(hotelId!);
      return result;  
    },
    enabled: !!hotelId,
  });
};