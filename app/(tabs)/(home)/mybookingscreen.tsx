import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import SmallNaviBar from '@/components/common/smallNaviBar';
import Tabs from '@/components/Tabs';
import { auth } from '@/services/firebaseconfig';
import { useData } from '@/contexts/DataContext';
import { Ionicons } from '@expo/vector-icons';
import { cancelBooking, completeBooking } from '@/services/mybookingService';
export default function MyBookings() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [user, setUser] = useState(auth.currentUser);
  const [authChecked, setAuthChecked] = useState(!!auth.currentUser);
  
  const { activeBookings, pastBookings, isLoading, refreshData } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  function handleSignIn() {
    router.push('/auth/signInOptionsScreen');
  }

  function handleBookNow() {
    router.push('/(tabs)/(home)/hotelList');
  }

  async function handleCancelBooking(bookingId: string) {
    try {
      await cancelBooking(bookingId);
      await refreshData();
    } catch (error) {
      console.log('Failed to cancel booking:', error);
      Alert.alert('Error', 'Could not cancel the booking.');
    }
  }

  async function handleCompleteBooking(bookingId: string) {
    try {
      await completeBooking(bookingId);
      await refreshData();
    } catch (error) {
      console.log('Failed to complete booking:', error);
      Alert.alert('Error', 'Could not complete the booking.');
    }
  }

  const renderCard = (item: any) => (
    <View
      key={item.id}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 150 }} />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>
          {item.hotelName}
        </Text>
        {item.city && (
          <Text style={{ color: '#6b7280', marginTop: 4, fontSize: 14 }}>
            {item.city}
          </Text>
        )}
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
              CHECK-IN
            </Text>
            <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
              {item.checkIn}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
              CHECK-OUT
            </Text>
            <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
              {item.checkOut}
            </Text>
          </View>
        </View>
        {item.nights > 0 && (
          <Text style={{ marginTop: 8, fontSize: 13, color: '#374151' }}>
            {item.nights} Night{item.nights > 1 ? 's' : ''}
          </Text>
        )}
        <Text style={{ marginTop: 6, fontSize: 14, color: '#374151' }}>
          {item.guests} Guest{item.guests > 1 ? 's' : ''} {item.rooms > 0 ? `• ${item.rooms} Room${item.rooms > 1 ? 's' : ''}` : ''}
        </Text>
        {item.roomType && (
          <Text style={{ marginTop: 4, fontSize: 13, color: '#6b7280' }}>
            {item.roomType}
          </Text>
        )}
        {item.totalPrice && (
          <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
            {item.totalPrice}
          </Text>
        )}
        <View
          style={{
            marginTop: 12,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            alignSelf: 'flex-start',
            backgroundColor:
              item.status === 'confirmed' ? '#DCFCE7' :
              item.status === 'pending' ? '#FEF3C7' :
              item.status === 'active' ? '#DBEAFE' :
              item.status === 'completed' ? '#E0E7FF' : '#FEE2E2',
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color:
                item.status === 'confirmed' ? '#166534' :
                item.status === 'pending' ? '#92400E' :
                item.status === 'active' ? '#1E40AF' :
                item.status === 'completed' ? '#3730A3' : '#991B1B',
            }}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
        {activeTab === 'active' && (
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity
              onPress={() => handleCompleteBooking(item.id)}
              style={{
                backgroundColor: '#1f4ba5',
                borderRadius: 8,
                alignItems: 'center',
                paddingVertical: 11,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>
                Complete Stay
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleCancelBooking(item.id)}
              style={{
                backgroundColor: '#d32f2f',
                borderRadius: 8,
                alignItems: 'center',
                paddingVertical: 11,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>
                Cancel Booking
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const shouldShowLoading = useMemo(() => {
    return !authChecked || (user && isLoading);
  }, [authChecked, user, isLoading]);

  if (shouldShowLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <SmallNaviBar>
          <></>
        </SmallNaviBar>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1f4ba5" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <SmallNaviBar>
        <></>
      </SmallNaviBar>

      {!user ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#1f2937', marginBottom: 8 }}>
            No bookings yet
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 15, textAlign: 'center', marginBottom: 24 }}>
            Sign in to see your bookings
          </Text>
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              backgroundColor: '#1f4ba5',
              paddingHorizontal: 32,
              paddingVertical: 14,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <ScrollView style={{ padding: 18 }} showsVerticalScrollIndicator={false}>
            {activeTab === 'active' ? (
              activeBookings.length ? (
                activeBookings.map(renderCard)
              ) : (
                <View style={{ alignItems: 'center', paddingVertical: 60 }}>
                  <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                   <Ionicons name="calendar-outline" size={36} color="#1f4ba5" />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 6 }}>
                    No active bookings
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 20, paddingHorizontal: 30 }}>
                    You don't have any upcoming stays!
                  </Text>
                  <TouchableOpacity
                    onPress={handleBookNow}
                    style={{
                      backgroundColor: '#1f4ba5',
                      paddingHorizontal: 32,
                      paddingVertical: 12,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : pastBookings.length ? (
              pastBookings.map(renderCard)
            ) : (
              <View style={{ alignItems: 'center', paddingVertical: 60 }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Ionicons name="calendar-outline" size={36} color="#1f4ba5" />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 6 }}>
                  No past bookings
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', paddingHorizontal: 30 }}>
                  Your history will appear here.
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
