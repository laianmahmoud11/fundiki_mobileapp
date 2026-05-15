import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function SectionCard({ children }: Props) {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        marginHorizontal: 24,
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  );
}