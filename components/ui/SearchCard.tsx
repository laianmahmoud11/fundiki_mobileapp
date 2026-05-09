import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type SearchCardProps = {
  destination: string;
  onDestinationChange: (text: string) => void;
  onSearch: () => void;
};

export default function SearchCard({
  destination,
  onDestinationChange,
  onSearch,
}: SearchCardProps) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FFC107',
        borderRadius: 999,
        borderWidth: 3,
        marginHorizontal: 16,
        marginTop: 38,
        overflow: 'hidden',
      }}
    >
      <View style={{ alignItems: 'stretch', flexDirection: 'row' }}>
        <View style={{ flex: 1, paddingHorizontal: 18, paddingVertical: 12 }}>
          <Text
            style={{
              color: '#5C6B89',
              fontFamily: 'Poppins_500Medium',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            Destination
          </Text>
          <TextInput
            value={destination}
            onChangeText={onDestinationChange}
            placeholder="Enter city, hotel, or landmark"
            placeholderTextColor="#8a94a6"
            style={{
              color: '#0D3B95',
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
              paddingVertical: 0,
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#0F6CEA',
            borderBottomRightRadius: 999,
            borderTopRightRadius: 999,
            justifyContent: 'center',
            minWidth: 78,
          }}
          activeOpacity={0.9}
          onPress={onSearch}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Poppins_700Bold',
              fontSize: 24,
            }}
          >
            Q
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
