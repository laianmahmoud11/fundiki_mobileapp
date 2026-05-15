import React, { useState, useCallback, useMemo } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ProfileUser, ProfileFormType } from '@/types/profile';
import SectionCard from './SectionCard';
import MenuItem from './MenuItem';
import CompleteProfileCard from './CompleteProfileCard';
import ProfileForm from './ProfileForm';
import HotelsList from './HotelsList';
import { handleContact, handleSafety, handleDispute } from './GuestProfile';
import { useData } from '@/contexts/DataContext';

type Props = {
  profile: ProfileUser;
  setProfile: (p: ProfileUser) => void;
  uploadImage: (uri: string) => Promise<string>;
  uploading: boolean;
  onSignOut: () => void;
};

type ViewMode = 
  | 'profile' 
  | 'saved-hotels' 
  | 'active-bookings' 
  | 'past-bookings'
  | 'wallet'
  | 'contact';

export default function LoggedInProfile({ profile, setProfile, uploadImage, uploading, onSignOut }: Props) {
  const [formType, setFormType] = useState<ProfileFormType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('profile');

  const { savedHotels, activeBookings, pastBookings } = useData();

  const handleImagePress = useCallback(async () => {
    Alert.alert(
      'Profile Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            
            if (!permission.granted) {
              Alert.alert('Permission required', 'Please allow camera access.');
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              try {
                await uploadImage(result.assets[0].uri);
              } catch (error) {
                console.error('Upload error:', error);
              }
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
              Alert.alert('Permission required', 'Please allow access to your photos.');
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
              try {
                await uploadImage(result.assets[0].uri);
              } catch (error) {
                console.error('Upload error:', error);
              }
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }, [uploadImage]);

  const handleSignOutPress = useCallback(() => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: onSignOut },
    ]);
  }, [onSignOut]);

  const avatarSource = useMemo(() => {
    if (profile.image) {
      return { uri: profile.image };
    }
    const displayName = profile.firstName || profile.name || 'User';
    return {
      uri: `https://ui-avatars.com/api/?name=${displayName}&background=2563EB&color=fff`,
    };
  }, [profile.image, profile.firstName, profile.name]);

  const displayName = useMemo(() => {
    if (profile.firstName && profile.lastName) {
      return `${profile.firstName} ${profile.lastName}`;
    }
    if (profile.firstName) {
      return profile.firstName;
    }
    if (profile.name) {
      return profile.name;
    }
    return 'User';
  }, [profile.firstName, profile.lastName, profile.name]);

  if (viewMode === 'wallet') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View
          style={{
            backgroundColor: '#003B95',
            paddingTop: 60,
            paddingHorizontal: 18,
            paddingBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setViewMode('profile')} style={{ padding: 6 }}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>
            Rewards & Wallet
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="wallet-outline" size={32} color="#006CE4" />
              <Text style={{ fontSize: 22, fontWeight: '800', color: '#1f2937', marginLeft: 12 }}>
                Credits
              </Text>
            </View>
            <Text style={{ fontSize: 42, fontWeight: '800', color: '#006CE4' }}>
              €{profile.credits ?? 0}
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
              Available to use on your next booking
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: 24,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialIcons name="stars" size={32} color="#F59E0B" />
              <Text style={{ fontSize: 22, fontWeight: '800', color: '#1f2937', marginLeft: 12 }}>
                Reward Points
              </Text>
            </View>
            <Text style={{ fontSize: 42, fontWeight: '800', color: '#F59E0B' }}>
              {profile.rewardPoints ?? 0}
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
              {(profile.rewardPoints ?? 0) === 0
                ? 'Start booking to earn rewards!'
                : 'Keep booking to earn more!'}
            </Text>
          </View>

          {(profile.credits ?? 0) === 0 && (profile.rewardPoints ?? 0) === 0 && (
            <View
              style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: '#EFF6FF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#BFDBFE',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#006CE4', marginBottom: 6 }}>
                💡 How to earn
              </Text>
              <Text style={{ fontSize: 14, color: '#1f2937', lineHeight: 20 }}>
                • Book hotels to earn reward points{'\n'}
                • Complete stays to get credits{'\n'}
                • Refer friends for bonus rewards
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  if (viewMode === 'contact') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View
          style={{
            backgroundColor: '#003B95',
            paddingTop: 60,
            paddingHorizontal: 18,
            paddingBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setViewMode('profile')} style={{ padding: 6 }}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>
            Contact Customer Service
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <TouchableOpacity
            onPress={handleContact}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#EFF6FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Feather name="mail" size={22} color="#006CE4" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                  Email Us
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                  support@fundiki.com
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContact}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#DCFCE7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Feather name="phone" size={22} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                  Call Us
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                  +1 (555) 123-4567
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContact}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 20,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#FEF3C7',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Feather name="message-circle" size={22} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                  Live Chat
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
                  Available 24/7
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (viewMode === 'saved-hotels') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View
          style={{
            backgroundColor: '#003B95',
            paddingTop: 60,
            paddingHorizontal: 18,
            paddingBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setViewMode('profile')} style={{ padding: 6 }}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>
            Saved Hotels ({savedHotels.length})
          </Text>
        </View>
        <HotelsList 
          title="" 
          hotels={savedHotels} 
          emptyMessage="No saved hotels yet" 
          onBack={() => setViewMode('profile')} 
        />
      </View>
    );
  }

  if (viewMode === 'active-bookings') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View
          style={{
            backgroundColor: '#003B95',
            paddingTop: 60,
            paddingHorizontal: 18,
            paddingBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setViewMode('profile')} style={{ padding: 6 }}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>
            Active Bookings ({activeBookings.length})
          </Text>
        </View>

        {activeBookings.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#E0E7FF',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 36 }}>📅</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 6 }}>
              No active bookings
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
              Your upcoming stays will appear here
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 18 }}>
            {activeBookings.map((booking) => (
              <View
                key={booking.id}
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
                <Image source={{ uri: booking.image }} style={{ width: '100%', height: 150 }} />
                <View style={{ padding: 15 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>
                    {booking.hotelName}
                  </Text>
                  {booking.city && (
                    <Text style={{ color: '#6b7280', marginTop: 4, fontSize: 14 }}>
                      {booking.city}
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
                        CHECK-IN
                      </Text>
                      <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
                        {booking.checkIn}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
                        CHECK-OUT
                      </Text>
                      <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
                        {booking.checkOut}
                      </Text>
                    </View>
                  </View>
                  {booking.totalPrice && (
                    <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '700', color: '#1f2937' }}>
                      {booking.totalPrice}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  if (viewMode === 'past-bookings') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View
          style={{
            backgroundColor: '#003B95',
            paddingTop: 60,
            paddingHorizontal: 18,
            paddingBottom: 22,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setViewMode('profile')} style={{ padding: 6 }}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '800', marginLeft: 10 }}>
            Past Bookings ({pastBookings.length})
          </Text>
        </View>

        {pastBookings.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#E0E7FF',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 36 }}>🕒</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 6 }}>
              No past bookings
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
              Your booking history will appear here
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 18 }}>
            {pastBookings.map((booking) => (
              <View
                key={booking.id}
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
                <Image source={{ uri: booking.image }} style={{ width: '100%', height: 150 }} />
                <View style={{ padding: 15 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>
                    {booking.hotelName}
                  </Text>
                  {booking.city && (
                    <Text style={{ color: '#6b7280', marginTop: 4, fontSize: 14 }}>
                      {booking.city}
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
                        CHECK-IN
                      </Text>
                      <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
                        {booking.checkIn}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 11, color: '#6b7280', fontWeight: '600' }}>
                        CHECK-OUT
                      </Text>
                      <Text style={{ fontSize: 13, color: '#1f2937', fontWeight: '600' }}>
                        {booking.checkOut}
                      </Text>
                    </View>
                  </View>
                  {booking.totalPrice && (
                    <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '700', color: '#1f2937' }}>
                      {booking.totalPrice}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#003B95',
          paddingTop: 72,
          paddingHorizontal: 20,
          paddingBottom: 28,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 76 }}>
          <TouchableOpacity
            onPress={handleImagePress}
            disabled={uploading}
            style={{ position: 'relative', marginRight: 14 }}
          >
            <Image source={avatarSource} style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2.5, borderColor: '#FFA500' }} />
            {uploading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 30,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator color="#ffffff" />
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#006CE4',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#003B95',
              }}
            >
              <Feather name="camera" size={14} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: '800' }}>
            Hi,{'\n'}
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{displayName}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setViewMode('wallet')}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 10,
            minHeight: 68,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#1f2937', fontSize: 16 }}>
            {(profile.credits ?? 0) > 0 ? 'You have credits!' : 'No Credits or vouchers yet'}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#1f2937', fontSize: 17, fontWeight: '700', marginRight: 8 }}>
              € {profile.credits ?? 0}
            </Text>
            <Feather name="chevron-right" size={22} color="#999" />
          </View>
        </TouchableOpacity>
      </View>

      {!profile.completedProfile && (
        <CompleteProfileCard onPress={() => setFormType('complete')} />
      )}

      {formType !== null && (
        <ProfileForm
          type={formType}
          profile={profile}
          setProfile={setProfile}
          onClose={() => setFormType(null)}
        />
      )}

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 24,
          marginBottom: 12,
          fontSize: 17,
          fontWeight: '800',
          color: '#1f2937',
        }}
      >
        Payment information
      </Text>
      <SectionCard>
        <MenuItem
          icon={<Feather name="credit-card" size={24} color="#1f2937" />}
          title="Rewards & Wallet"
          onPress={() => setViewMode('wallet')}
        />
        <MenuItem
          icon={<Ionicons name="card-outline" size={25} color="#1f2937" />}
          title="Payment methods"
          onPress={() =>
            Alert.alert('Payment Methods', profile.paymentMethod || 'No payment method saved yet.')
          }
          last
        />
      </SectionCard>

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 24,
          marginBottom: 12,
          fontSize: 17,
          fontWeight: '800',
          color: '#1f2937',
        }}
      >
        Manage account
      </Text>
      <SectionCard>
        <MenuItem
          icon={<Ionicons name="person-outline" size={25} color="#1f2937" />}
          title="Personal details"
          onPress={() => setFormType('personal')}
        />
        <MenuItem
          icon={<Ionicons name="bed-outline" size={25} color="#1f2937" />}
          title="Hotel preferences"
          onPress={() => setFormType('hotel')}
        />
        <MenuItem
          icon={<Feather name="heart" size={24} color="#1f2937" />}
          title={`Saved hotels (${savedHotels.length})`}
          onPress={() => setViewMode('saved-hotels')}
        />
        <MenuItem
          icon={<Ionicons name="briefcase-outline" size={25} color="#1f2937" />}
          title={`Active bookings (${activeBookings.length})`}
          onPress={() => setViewMode('active-bookings')}
        />
        <MenuItem
          icon={<Ionicons name="time-outline" size={25} color="#1f2937" />}
          title={`Past bookings (${pastBookings.length})`}
          onPress={() => setViewMode('past-bookings')}
          last
        />
      </SectionCard>

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 24,
          marginBottom: 12,
          fontSize: 17,
          fontWeight: '800',
          color: '#1f2937',
        }}
      >
        Help and support
      </Text>
      <SectionCard>
        <MenuItem
          icon={<Feather name="help-circle" size={24} color="#1f2937" />}
          title="Contact Customer service"
          onPress={() => setViewMode('contact')}
        />
        <MenuItem
          icon={<Feather name="life-buoy" size={24} color="#1f2937" />}
          title="Safety resource centre"
          onPress={handleSafety}
        />
        <MenuItem
          icon={<FontAwesome5 name="handshake" size={21} color="#1f2937" />}
          title="Dispute resolution"
          onPress={handleDispute}
          last
        />
      </SectionCard>

      <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
        <TouchableOpacity
          onPress={handleSignOutPress}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#FEE2E2',
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#DC2626', fontSize: 16, fontWeight: '700' }}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}