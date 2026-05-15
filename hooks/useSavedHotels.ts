import { useState, useEffect, useCallback } from 'react';
import { getSavedHotels, saveHotel, unsaveHotel, isHotelSaved } from '@/services/profileService';
import { SavedHotel } from '@/types/profile';
import { Alert } from 'react-native';

export function useSavedHotels() {
  const [hotels, setHotels] = useState<SavedHotel[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHotels = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSavedHotels();
      setHotels(data);
    } catch (error) {
      console.error('Failed to load saved hotels:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  const toggleSave = useCallback(async (hotelId: string) => {
    try {
      const isSaved = await isHotelSaved(hotelId);
      
      if (isSaved) {
        await unsaveHotel(hotelId);
        Alert.alert('Removed', 'Hotel removed from favorites');
      } else {
        await saveHotel(hotelId);
        Alert.alert('Saved', 'Hotel saved to favorites');
      }
      
      await loadHotels();
    } catch (error) {
      console.error('Failed to toggle save:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  }, [loadHotels]);

  return {
    hotels,
    loading,
    refetch: loadHotels,
    toggleSave,
  };
}