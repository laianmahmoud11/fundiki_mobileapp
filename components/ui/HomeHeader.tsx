import { Text, View } from 'react-native';

export default function HomeHeader() {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#0D3B95',
        paddingBottom: 22,
        paddingHorizontal: 20,
        paddingTop: 24,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontFamily: 'Poppins_700Bold',
          fontSize: 28,
          letterSpacing: 0.3,
          marginTop: 4,
        }}
      >
        Fundi
        <Text style={{ color: '#FFC107' }}>k</Text>
        i
      </Text>

      <View
        style={{
          alignItems: 'center',
          borderColor: '#FFFFFF',
          borderRadius: 999,
          borderWidth: 1,
          flexDirection: 'row',
          marginTop: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            height: 12,
            marginRight: 8,
            width: 12,
          }}
        />
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Poppins_500Medium',
            fontSize: 14,
          }}
        >
          Stays
        </Text>
      </View>
    </View>
  );
}
