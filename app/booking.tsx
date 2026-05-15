import InformationCard from "@/components/informationCard";
import { useHotel } from "@/contexts/HotelContext";
import { addBooking } from "@/services/firebasebookingService";
import StorageService from "@/services/StorageService";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Booking () { 
const {selectedRoom, setSelectedRoom} = useHotel();
    
const[paymentWay,setPaymentWay]=useState("");
const[paymentStatus,setpaymentStatus]=useState("");

const handleSave=async ()=>{
  const user = await StorageService.getUser();
    if(paymentWay==="arrival"||paymentWay==="VISA"){
  await addBooking({...selectedRoom,paymentWay,paymentStatus,  userId: user?.uid});
     alert("Booking saved successfully");
    }
}
 return (
    <ScrollView style={styles.container}>
      
       <Image style={styles.image}  source={ {uri: selectedRoom?.image}} />
       <View style={styles.CardRoom}>
        <Text style={styles.title}>hotel Name : {selectedRoom?.hotelName}</Text>
            <Text style={styles.text}>Guests : {selectedRoom?.guests}</Text>
          <Text  style={styles.text}>RoomType : {selectedRoom?.roomType}</Text>
              <Text  style={styles.text}>Nights : {selectedRoom?.nights}</Text>
                <Text  style={styles.text}>Check-in : {selectedRoom?.checkIn}</Text>
                  <Text  style={styles.text}>Check-out : {selectedRoom?.checkOut}</Text>
                  <View style={styles.line}>
                   <Text  style={styles.price}>Total-price : {selectedRoom?.totalPrice }</Text>
                   </View>
  </View>

   <View style={styles.Payment}>
      <InformationCard setPaymentWay={setPaymentWay} setpaymentStatus={setpaymentStatus}paymentStatus={paymentStatus}/>
     
   </View>
  <Button
  style={{alignSelf:"center",marginVertical:10, width:"90%" ,borderRadius:10,backgroundColor:"#003B95"}}
  mode="contained"
  onPress={() => handleSave()}
>
  Booking
</Button>
   </ScrollView>
  );

}

const styles = StyleSheet.create({
  container:{
    flex:1,
      
        backgroundColor:"#f8f8f8",
  },
    image:{
    height: 200,
width: '100%',
         borderTopLeftRadius:2,
          borderTopRightRadius:2
    },
    CardRoom:{
       marginTop: -20,
          borderColor: "#E9E9E9",
        backgroundColor: "#ffff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    

     
    },
    title:{
        fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
      color:"#003B95",
   
    },
      text: {
    fontSize: 13,
    marginBottom: 6,
        fontWeight: "bold",

  },
   price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#003B95",
  },
  line:{
    borderTopWidth: 1,
    borderBottomColor: "#003B95",
     marginVertical: 10,
  },
  Payment:{
  margin: 20,
          borderColor: "#E9E9E9",
        backgroundColor: "#ffff",
   
    padding: 16,
    borderRadius: 16,
    
  }
});
