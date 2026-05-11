import { gethotels } from '@/services/firebasehotelSource';
import { useQuery } from '@tanstack/react-query';


export const useHotels = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: gethotels,
    })
}