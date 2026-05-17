import { View, Text, Pressable, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useHotel } from "@/contexts/HotelContext";
import { Room } from "@/types/room";

type RoomSelectionProps = {
  rooms: Room[];
};

const RoomSelection= ({ rooms }: RoomSelectionProps) => {
  const { selectedRoom, setSelectedRoom } = useHotel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Room</Text>
      {rooms?.map((room) => (
          <Pressable
            key={room.id}
            style={[
              styles.roomCard,
              selectedRoom?.id === room.id && styles.selectedRoomCard,
            ]}
            onPress={() => setSelectedRoom(room)}
          >
            <View style={styles.roomHeader}>
              <Text style={styles.roomTitle}>{room?.name}</Text>
              {selectedRoom?.id === room.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </View>

            <View style={styles.roomSpecs}>
              <View style={styles.specRow}>
                <Ionicons name="bed-outline" size={16} color="#666" />
                <Text style={styles.specText}>{room?.beds}</Text>
              </View>
              <View style={styles.specRow}>
                <Ionicons name="resize" size={16} color="#666" />
                <Text style={styles.specText}>{room.roomSize} m^2</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {room.features?.map((feature, id) => (
                <View key={id} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.roomPrice}>${room?.price}</Text>
          </Pressable>
        ))
      }
    </View>
  );
};

export default RoomSelection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: wp(4),
    paddingHorizontal: wp(4),
    color: colors.black,
    alignSelf: 'center',
  },
  emptyStateText: {
    paddingHorizontal: wp(4),
    paddingBottom: wp(4),
    color: '#666',
    fontSize: wp(3.8),
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: wp(4),
    marginBottom: wp(3),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  selectedRoomCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  roomTitle: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  roomSpecs: {
    marginBottom: wp(2),
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(1),
  },
  specText: {
    marginLeft: wp(2),
    fontSize: wp(3.5),
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: wp(3),
  },
  featureTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: wp(3),
    paddingVertical: wp(0.8),
    borderRadius: 12,
    marginRight: wp(2),
    marginBottom: wp(1),
  },
  featureText: {
    fontSize: wp(3.2),
    color: "#666",
    fontWeight: '500',
  },
  roomPrice: {
    fontSize: wp(5.5),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'right',
  },
});

