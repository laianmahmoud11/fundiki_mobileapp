import {View, Text, Image, StyleSheet, ScrollView, Pressable} from "react-native";
import {useEffect, useState} from "react";
import { useLocalSearchParams, router} from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import SmallNaviBar from "@/components/common/smallNaviBar";
import BrandLogo from "@/components/common/brandLogo";
import { Ionicons } from "@expo/vector-icons";
import { useHotelDetails } from "@/hooks/use-hotel-details";
import HotelInfoCard from "@/components/ui/hotel-details/HotelInfoCard";
import { Hotel } from "@/types/hotel";
import { colors } from "@/constants/theme";

const HotelDetails = () => {
    const {data: hotel, isLoading, error} = useHotelDetails();

    const handleOnPress = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <View style={{marginTop: hp("50%"), alignItems: "center"}}>
                <Text >Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{marginTop: hp("50%"), alignItems: "center"}}>
                <Text >Error occurred while fetching hotel details.</Text>
            </View>
        );
    };

    return(
        <ScrollView style={styles.container}>
            <SmallNaviBar>
        <BrandLogo />
        <Pressable onPress={handleOnPress}>
          <Ionicons name="arrow-back" style={styles.icon} />
        </Pressable>
      </SmallNaviBar>
            <HotelInfoCard hotel={hotel as Hotel} />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    icon: {fontSize: 24, 
        color:colors.white,
    },
});

export default HotelDetails;