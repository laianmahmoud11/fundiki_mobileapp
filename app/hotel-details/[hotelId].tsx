import {View, Text, Image, StyleSheet, ScrollView, Pressable} from "react-native";
import {useEffect, useState} from "react";
import { useLocalSearchParams, router} from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getHotelById } from "@/services/hotelService";
import SmallNaviBar from "@/components/common/smallNaviBar";
import BrandLogo from "@/components/common/brandLogo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

const HotelDetails = () => {
    const {hotelId} = useLocalSearchParams();

    const{ data, isLoading, error } = useQuery({
        queryKey: ["hotelDetails", hotelId],
        queryFn: () => getHotelById(hotelId),
    });

    const fetchData = async () => {
       const response = await getHotelById(hotelId);
       return response.data;
}
    useEffect(()=>{
        fetchData();
    }, []);

    if (isLoading) 
        return (
            <View style={{marginTop: hp(40)}}>
                <Text >Loading...</Text>
            </View>
        );
    if (error)
        return (
            <View style={{marginTop: hp(40)}}>
                <Text >Error fetching hotel details</Text>
            </View>                
        )

    const handleOnPress = () => {
        router.back();
      };

    return(
        <View>
            <SmallNaviBar>
        <BrandLogo />
        <Pressable onPress={handleOnPress}>
          <Ionicons name="close" style={styles.icon} />
        </Pressable>
      </SmallNaviBar>

      
        </View>
    )
}