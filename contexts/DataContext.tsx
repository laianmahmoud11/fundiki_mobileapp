import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebaseconfig';
import { getSavedHotels, getMyActiveBookings, getMyPastBookings, saveHotel, unsaveHotel } from '@/services/profileService';
import { SavedHotel } from '@/types/profile';
import { Booking } from '@/types/booking';
import { Alert } from 'react-native';

type DataContextType = {
  savedHotels: SavedHotel[];
  activeBookings: Booking[];
  pastBookings: Booking[];
  refreshData: () => Promise<void>;
  addSavedHotel: (hotelId: string) => Promise<void>;
  removeSavedHotel: (hotelId: string) => Promise<void>;
  isLoading: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [savedHotels, setSavedHotels] = useState<SavedHotel[]>([]);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const loadData = useCallback(async () => {
    const user = auth.currentUser;
    
    if (user) {
      if (loadingRef.current) return;
      
      loadingRef.current = true;
      
      try {
        setIsLoading(true);
        const [hotels, active, past] = await Promise.all([
          getSavedHotels(),
          getMyActiveBookings(),
          getMyPastBookings(),
        ]);
        
        setSavedHotels(hotels);
        setActiveBookings(active);
        setPastBookings(past);
        hasLoadedRef.current = true;
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    } else {
      setSavedHotels([]);
      setActiveBookings([]);
      setPastBookings([]);
      setIsLoading(false);
      loadingRef.current = false;
      hasLoadedRef.current = false;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !hasLoadedRef.current) {
        loadData();
      } else if (!user) {
        setSavedHotels([]);
        setActiveBookings([]);
        setPastBookings([]);
        setIsLoading(false);
        hasLoadedRef.current = false;
      } else if (user && hasLoadedRef.current) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loadData]);

  const addSavedHotel = useCallback(async (hotelId: string) => {
    try {
      await saveHotel(hotelId);
      await loadData();
      Alert.alert('Success', 'Hotel saved!');
    } catch (error) {
      console.error('Error saving hotel:', error);
      Alert.alert('Error', 'Failed to save hotel');
    }
  }, [loadData]);

  const removeSavedHotel = useCallback(async (hotelId: string) => {
    try {
      await unsaveHotel(hotelId);
      await loadData();
      Alert.alert('Success', 'Hotel removed from saved!');
    } catch (error) {
      console.error('Error removing hotel:', error);
      Alert.alert('Error', 'Failed to remove hotel');
    }
  }, [loadData]);

  return (
    <DataContext.Provider
      value={{
        savedHotels,
        activeBookings,
        pastBookings,
        refreshData: loadData,
        addSavedHotel,
        removeSavedHotel,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}