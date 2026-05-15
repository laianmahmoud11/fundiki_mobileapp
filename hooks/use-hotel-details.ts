import { useQuery } from '@tanstack/react-query';
import { getHotelById } from '@/services/firebasehotelSource';
import { useLocalSearchParams } from 'expo-router';
import { ensureAuthInitialized } from '@/services/firebaseconfig';
import { Hotel } from '@/types/hotel';

export const useHotelDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  
  
  const hotelId = Array.isArray(id) ? id[0] : id;

  return useQuery<Hotel, Error>({
    queryKey: ["hotel", hotelId],
    queryFn: async () => {
      await ensureAuthInitialized();
      const result = await getHotelById(hotelId!);
      return result;  
    },
    enabled: !!hotelId,
  });
};