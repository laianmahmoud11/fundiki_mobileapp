import { getHotel } from '@/api/hotelService';
import { useQuery } from '@tanstack/react-query';

export function useWeekendDeals() {
  return useQuery({
    queryKey: ['weekend-deals'],
    queryFn: getHotel,
  });
}

export function usePopularHotels() {
  return useQuery({
    queryKey: ['popular-hotels'],
    queryFn: getHotel,
  });
}
