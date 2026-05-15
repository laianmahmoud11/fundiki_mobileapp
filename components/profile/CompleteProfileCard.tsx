import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export default function CompleteProfileCard({ onPress }: Props) {
  return (
    <View
      style={{
        backgroundColor: '#EFF6FF',
        marginHorizontal: 24,
        marginVertical: 16,
        padding: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        }}
      >
        <Feather name="user-check" size={28} color="#006CE4" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#006CE4', marginBottom: 4 }}>
          Complete your profile
        </Text>
        <Text style={{ fontSize: 13, color: '#1e40af', lineHeight: 18 }}>
          Add details for faster bookings and personalized recommendations
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#006CE4',
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '700' }}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
}