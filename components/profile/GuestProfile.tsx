import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import SectionCard from './SectionCard';
import MenuItem from './MenuItem';

function requireSignIn(featureName: string, onSignIn: () => void) {
  Alert.alert('Sign in required', `Sign in to access ${featureName}.`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Sign in', onPress: onSignIn },
  ]);
}

export function handleContact() {
  Alert.alert('Contact Customer Service', 'How would you like to reach us?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Email us', onPress: () => Linking.openURL('mailto:support@fundiki.com') },
    { text: 'Call us', onPress: () => Linking.openURL('tel:+970507570203') },
  ]);
}

export function handleSafety() {
  Alert.alert(
    'Safety Resource Centre',
    'Our safety guidelines help ensure every stay is secure and comfortable.\n\nFor urgent safety concerns, contact us immediately.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Contact Safety Team',
        onPress: () => Linking.openURL('mailto:safety@fundiki.com'),
      },
    ]
  );
}

export function handleDispute() {
  Alert.alert(
    'Dispute Resolution',
    'If you have an issue with a booking or property, our team is here to help resolve it fairly.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open a Dispute', onPress: () => Linking.openURL('mailto:disputes@fundiki.com') },
    ]
  );
}

type Props = {
  onSignIn: () => void;
};

export default function GuestProfile({ onSignIn }: Props) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#003B95',
          paddingTop: 60,
          paddingHorizontal: 22,
          paddingBottom: 28,
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '800',
            marginBottom: 72,
          }}
        >
          Fundi<Text style={{ color: '#FFA500' }}>ki</Text>
        </Text>

        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 14,
            padding: 22,
            minHeight: 220,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text style={{ fontSize: 21, fontWeight: '800', color: '#111' }}>
            Sign in, save money
          </Text>
          <Text style={{ fontSize: 15, color: '#444', marginTop: 8, lineHeight: 22 }}>
            Sign in to save 10% on selected hotel stays and manage your bookings easily.
          </Text>
          <TouchableOpacity
            onPress={onSignIn}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#006CE4',
              height: 52,
              borderRadius: 8,
              marginTop: 62,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '700' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 26,
          marginBottom: 12,
          fontSize: 17,
          fontWeight: '800',
          color: '#1f2937',
        }}
      >
        Account options
      </Text>
      <SectionCard>
        <MenuItem
          icon={<Feather name="credit-card" size={24} color="#1f2937" />}
          title="Rewards & Wallet"
          onPress={() => requireSignIn('Rewards & Wallet', onSignIn)}
        />
        <MenuItem
          icon={<Feather name="settings" size={24} color="#1f2937" />}
          title="Device preferences"
          onPress={() => requireSignIn('Device preferences', onSignIn)}
          last
        />
      </SectionCard>

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 26,
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
          onPress={handleContact}
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

      <Text
        style={{
          marginHorizontal: 24,
          marginTop: 26,
          marginBottom: 12,
          fontSize: 17,
          fontWeight: '800',
          color: '#1f2937',
        }}
      >
        Travel activity
      </Text>
      <SectionCard>
        <MenuItem
          icon={<Ionicons name="globe-outline" size={24} color="#1f2937" />}
          title="Recently viewed hotels"
          onPress={() => requireSignIn('Recently viewed hotels', onSignIn)}
          last
        />
      </SectionCard>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}