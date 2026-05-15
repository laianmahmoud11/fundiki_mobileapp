import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { updateUserProfile } from '@/services/profileService';
import { ProfileUser, ProfileFormType, ProfileFormData } from '@/types/profile';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
};

function Input({ label, value, onChangeText, multiline, keyboardType }: InputProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: '#666', fontSize: 13, fontWeight: '600', marginBottom: 6 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#aaa"
        multiline={multiline}
        keyboardType={keyboardType || 'default'}
        style={{
          backgroundColor: '#fafafa',
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 8,
          height: multiline ? 88 : 48,
          paddingHorizontal: 14,
          paddingTop: multiline ? 12 : 0,
          color: '#1f2937',
          fontSize: 15,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );
}

type Props = {
  type: ProfileFormType;
  profile: ProfileUser;
  setProfile: (p: ProfileUser) => void;
  onClose: () => void;
};

export default function ProfileForm({ type, profile, setProfile, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    preferredCity: profile.preferredCity || '',
    roomType: profile.roomType || '',
    bedType: profile.bedType || '',
    paymentMethod: profile.paymentMethod || '',
    specialRequests: profile.specialRequests || '',
  });

  function change<K extends keyof ProfileFormData>(key: K, val: ProfileFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function save() {
    setLoading(true);
    try {
      let payload: Partial<ProfileUser> = {};

      if (type === 'personal') {
        payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        };
      } else if (type === 'hotel') {
        payload = {
          preferredCity: form.preferredCity,
          roomType: form.roomType,
          bedType: form.bedType,
          paymentMethod: form.paymentMethod,
          specialRequests: form.specialRequests,
        };
      } else {
        payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          preferredCity: form.preferredCity,
          roomType: form.roomType,
          bedType: form.bedType,
          paymentMethod: form.paymentMethod,
          specialRequests: form.specialRequests,
          completedProfile: true,
        };
      }

      const updated = await updateUserProfile(payload);

      if (updated) {
        setProfile(updated);
      } else {
        setProfile({ ...profile, ...payload });
      }

      Alert.alert('Saved', 'Your information has been updated.');
      onClose();
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const titles: Record<ProfileFormType, string> = {
    personal: 'Personal details',
    hotel: 'Hotel preferences',
    complete: 'Complete your profile',
  };

  const subtitles: Record<ProfileFormType, string> = {
    personal: 'Review and update your account information.',
    hotel: 'Update your hotel booking preferences.',
    complete: 'Fill in your details for easier hotel booking.',
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        marginHorizontal: 24,
        marginTop: 24,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
      }}
    >
      <Text style={{ fontSize: 19, fontWeight: '800', color: '#1f2937', marginBottom: 4 }}>
        {titles[type]}
      </Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 18 }}>{subtitles[type]}</Text>

      {(type === 'personal' || type === 'complete') && (
        <>
          <Input
            label="First Name"
            value={form.firstName}
            onChangeText={(v) => change('firstName', v)}
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChangeText={(v) => change('lastName', v)}
          />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(v) => change('email', v)}
            keyboardType="email-address"
          />
          <Input
            label="Phone Number"
            value={form.phone}
            onChangeText={(v) => change('phone', v)}
            keyboardType="phone-pad"
          />
        </>
      )}

      {(type === 'hotel' || type === 'complete') && (
        <>
          <Input
            label="Preferred City"
            value={form.preferredCity}
            onChangeText={(v) => change('preferredCity', v)}
          />
          <Input
            label="Room Type (Single / Double / Suite)"
            value={form.roomType}
            onChangeText={(v) => change('roomType', v)}
          />
          <Input
            label="Bed Type (Single / Double / King)"
            value={form.bedType}
            onChangeText={(v) => change('bedType', v)}
          />
          <Input
            label="Payment Method"
            value={form.paymentMethod}
            onChangeText={(v) => change('paymentMethod', v)}
          />
          <Input
            label="Special Requests"
            value={form.specialRequests}
            onChangeText={(v) => change('specialRequests', v)}
            multiline
          />
        </>
      )}

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
        <TouchableOpacity
          onPress={save}
          disabled={loading}
          style={{
            backgroundColor: '#006CE4',
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 28,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '700' }}>Save</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          style={{
            borderWidth: 1.5,
            borderColor: '#e5e7eb',
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#1f2937', fontSize: 15, fontWeight: '600' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}