import {View, Text, Pressable, StyleSheet} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useHotel } from "@/contexts/HotelContext";
import { Room } from "@/types/room";

type RoomSelection = {
    rooms: Room[];
}

const RoomSelection = ({rooms}: RoomSelection) => {
    const {selectedRoom, setSelectedRoom} = useHotel();

    return(
        <View style={styles.container}>
            <Text>Select a Room</Text>
            {rooms.map((room) => (
                <Pressable
                    key={room.id}
                    onPress={() => setSelectedRoom(room)}
                >
                <View>
                    <Text>{room?.name}</Text>
                    <Text>{room?.beds}</Text>
                    <Text>{room?.roomSize} m^2</Text>

                    <View>
                        {room.features.map((feature, key) => (
                            <View key={key}>
                            <Text >{feature}</Text>
                            </View>
                        ))}
                    </View>

                    <Text>{room?.price}</Text>
                </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})