import ActiveBookings from '@/components/ActiveBookings';
import BrandLogo from '@/components/common/brandLogo';
import SmallNaviBar from '@/components/common/smallNaviBar';
import EmptyState from '@/components/EmptyState';
import PastBookings from '@/components/PastBooking';
import Tabs from '@/components/Tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNav from '@/components/common/BottomNav';
import { getCurrentUser } from '@/services/AutheService';
import {
  cancelBooking,
  completeBooking,
  getActiveBookings,
  getPastBookings
} from '@/services/mybookingService';
import { Booking } from '@/types/booking';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeScreen();
  }, []);

  async function initializeScreen() {
    try {
      setLoading(true);

      const user = await getCurrentUser();

      if (!user) {
        setCurrentUserId(null);
        setActiveBookings([]);
        setPastBookings([]);
        return;
      }

      setCurrentUserId(user.id);
      await loadBookings(user.id);
    } catch (error) {
      console.log('Failed to initialize screen:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadBookings(userId: string) {
    try {
      const activeData = await getActiveBookings(userId);
      const pastData = await getPastBookings(userId);

      setActiveBookings(activeData);
      setPastBookings(pastData);
    } catch (error) {
      console.log('Failed to load bookings:', error);
      setActiveBookings([]);
      setPastBookings([]);
    }
  }

  async function handleCancelBooking(bookingId: string) {
    try {
      await cancelBooking(bookingId);

      if (currentUserId) {
        await loadBookings(currentUserId);
      }
    } catch (error) {
      console.log('Failed to cancel booking:', error);
      Alert.alert('Error', 'Could not cancel the booking.');
    }
  }

  async function handleCompleteBooking(bookingId: string) {
    try {
      await completeBooking(bookingId);

      if (currentUserId) {
        await loadBookings(currentUserId);
      }
    } catch (error) {
      console.log('Failed to complete booking:', error);
      Alert.alert('Error', 'Could not complete the booking.');
    }
  }

  function handleSignIn() {
    router.push('/auth/signInOptionsScreen');
  }

  function handleAddBooking() {
    router.push('/(tabs)/(home)/hotelList');
  }

  function renderLoggedOutState() {
    return (
      <EmptyState
        title={activeTab === 'active' ? 'No active bookings' : 'No past bookings'}
        subtitle="Please sign in first to view and manage your bookings."
        buttonText="Sign in"
        onPressButton={handleSignIn}
      />
    );
  }

  function renderContent() {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#1f4ba5"
          style={styles.loader}
        />
      );
    }

    if (!currentUserId) {
      return renderLoggedOutState();
    }

    if (activeTab === 'active') {
      if (activeBookings.length === 0) {
        return (
          <EmptyState
            title="No active bookings"
            subtitle="You do not have any active bookings yet."
            buttonText="Add booking"
            onPressButton={handleAddBooking}
          />
        );
      }

      return (
        <ActiveBookings
          bookings={activeBookings}
          onCancelBooking={handleCancelBooking}
          onCompleteBooking={handleCompleteBooking}
        />
      );
    }

    if (pastBookings.length === 0) {
      return (
        <EmptyState
          title="No past bookings"
          subtitle="Completed or cancelled bookings will appear here."
          hideButton
        />
      );
    }

    return <PastBookings bookings={pastBookings} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SmallNaviBar>
        <BrandLogo />
      </SmallNaviBar>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {renderContent()}

      <BottomNav
        navItems={['Home', 'Favorite', 'MyBooking', 'Profile']}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  loader: {
    marginTop: 40,
  },
});