import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  last?: boolean;
};

export default function MenuItem({ icon, title, onPress, last }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: '#e5e7eb',
      }}
    >
      <View style={{ marginRight: 14 }}>{icon}</View>
      <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: '#1f2937' }}>
        {title}
      </Text>
      <Feather name="chevron-right" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}