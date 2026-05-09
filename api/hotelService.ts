 import ApiBase from '@/api/ApiBase';

 
 export const getHotel=async()=>{
 const response = await ApiBase.get('/api/v1/hotelList');
    return response.data;
 }

export const getHotelById = async (id: any) => {
    return await ApiBase.get(`/api/v1/products/${id}`);
}
