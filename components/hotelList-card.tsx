import { Alert,Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Rating } from 'react-native-ratings';


import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import {addFavoriteHotel,getFavoriteHotels,isUserLoggedIn,removeFavoriteHotel,} from "@/services/favoriteService";

const HotelListCard = ({id,name, country,city,street, price,starRating, image,description,isFavorite,onFavoriteChange}: any) => {


const[favorite,SetFavorite]= useState<"heart-outline"|"heart">(isFavorite ? "heart" : "heart-outline");
const color = favorite === "heart" ? "red" : "#424141";

useFocusEffect(
  useCallback(() => {
    checkFavorite();
  }, [id])
);

const checkFavorite = async () => {
  if (!isUserLoggedIn()) {
    SetFavorite("heart-outline");
    return;
  }

  const favoriteIds = await getFavoriteHotels();

  if (favoriteIds.includes(id)) {
    SetFavorite("heart");
  } else {
    SetFavorite("heart-outline");
  }
};

const FavoriteHotels = async ()=>{
if(!isUserLoggedIn()){
  Alert.alert("Sign in required", "Please sign in first to add this hotel to favorite.");
  return;
}

if(favorite==="heart-outline"){
  SetFavorite("heart");
  await addFavoriteHotel(id);
}
else{
    SetFavorite("heart-outline");
      await removeFavoriteHotel(id);

}
if(onFavoriteChange){
  onFavoriteChange();
}
}
    return (
        <View style={styles.container} key={id}>
            
                <Image  style={styles.images} source={ {uri: image}} />

            <View style={styles.info}>
               <View style={styles.header}>
                <Text style={styles.name}>{name} </Text> 
                      <Ionicons name= {favorite} size={24}  style={{ color:color} }  onPress={FavoriteHotels}/>
                </View>

           <Rating
             type="star"
              ratingCount={5} 
              imageSize={12} 
               startingValue={starRating} 
               readonly style={{alignSelf: "flex-start" , marginVertical:5}}   />
               
                
                     <Text style={{color:"000000", marginVertical:5}}>
                         <Ionicons name="location-outline" size={16} color="#FFC107" style={{marginRight: 4}} />
                        {country}     {city}     {street}
                        </Text> 
                     
                      
                   
                  
                        <Text style={{color: "000000", marginVertical:5}}>
                             <Ionicons name="bed-outline" size={16} color="#FFC107" style={{marginRight:4}} />
                            {description}</Text>
       
                 <Text style={styles.price}>${price}</Text>
            </View>
            </View>
      
    )
}

const styles = StyleSheet.create({
    
container:{
   
   
 flexDirection:"row",
   flex: 1,
  borderWidth:1,
        borderColor: "#E9E9E9",
        backgroundColor: "#ffff",
        borderRadius: 10,
  marginHorizontal:"2.5%",
  marginVertical:"2%"
   
},
images:{
    flex: 0.75,
   borderRadius:5,
   borderColor:"black",
    borderWidth:1,
  
},
info:{
   flex: 1, 
    justifyContent: "space-between" ,
 padding:20,
 
},

header:{
flexDirection:"row", 
justifyContent: "space-between",
 marginVertical:5
},
name:{
  fontSize:20,
   color:"#003B95",
   fontWeight: 'bold'
},
price:{
 fontSize:20 ,
 fontWeight: 'bold',
  color:"#003B95" , 
  alignSelf:"flex-end" ,
  marginBottom:5
}
});

export default HotelListCard;
