//import { getHotel } from "@/api/hotelService";
import Message from "@/components/Banner";
import FilterBar from "@/components/filterBar";
import HotelListCard from "@/components/hotelList-card";
import TopBarNavigation from "@/components/Topbar";
import InputSearch from "@/components/ui/inputSearch";
import { gethotels } from "@/services/firebasehotelSource";
import { useQuery } from "@tanstack/react-query";
import * as React from 'react';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
export default function HotelList () { 

  const { data=[], isLoading, error } = useQuery({
        queryKey: ["hotelList"],
        queryFn: gethotels,
        
    })


 const [search, setSearch] = useState("");
     const [newData, setNewData] = useState<any[]>([]);
 
        const [price, setPrice] = useState(null);
        const [rating, setRating] = useState(null);
 

    const handleSearch=(text:any)=>{

    setSearch(text);

    }
     const FilterPrice=(number:any)=>{

        setPrice (number);

 }
 const  FilterRating =(number:any)=>{

        setRating (number);

 }

  useEffect(() => {
setNewData(data?.filter((hotels: any) =>{
        const filterSearch= (  search === "" ||hotels.country?.toLowerCase().includes(search.toLowerCase())||  hotels.city?.toLowerCase().includes(search.toLowerCase())||hotels.name?.toLowerCase().includes(search.toLowerCase()));  
          const filterprice=  (price===null ||hotels.price <= price  );
          const filterrating=(rating===null ||hotels.starRating >= rating &&(rating+1)>hotels.starRating   );
         
          return filterprice &&filterSearch&&filterrating
  }));
}, [search, price, rating, data]);
  
  
   const  sortNameAToZ =()=>{
       const   array= newData.slice();
     const   sortAToZ  =   array?.sort((a:any,b:any)=>{

     return a.name.localeCompare(b.name);

   })
   
    setNewData(sortAToZ);
  }

     const  sortNameZToA =()=>{
       const   array= newData.slice();
     const   sortZToA  =   array?.sort((a:any,b:any)=>{

     return b.name.localeCompare(a.name);

   })
   
    setNewData(sortZToA);
  }


 const  sortRating =()=>{
       const   array= newData.slice();
     const   sortHotelsRating  =   array?.sort((a:any,b:any)=>{

     return b.starRating-a.starRating;

   })
   
    setNewData(sortHotelsRating);
  }


    if(isLoading) return(

         <View style={{flex:1,alignItems:"center", justifyContent:"center",}}>
           <ActivityIndicator animating={true} color={MD2Colors.red800} />
            <Text>Loading...</Text>
        </View>
    )
      if(error) return (
        <View style={{ marginTop: 20}}>
            <Text>Error fetching data</Text>
        </View>
    )

  console.log(data);
 
   

    
   

    
 return (
     
    <SafeAreaView  style={styles.container}>
       <TopBarNavigation />
     <ScrollView>
        <View style={{marginTop:10}}>
        <InputSearch  placeholder={"search" } value={search}  onChangeText={handleSearch}   autoFocus={true} />
       
            <FilterBar FilterPrice={FilterPrice}  FilterRating={FilterRating} sortNameAToZ={sortNameAToZ} sortNameZToA={sortNameZToA} sortRating={sortRating}/>
      </View>
      <Message 
       image={require('@/assets/images/iconBanner.png')}
     Text={"Commission paid on bookings and other factors may affect property rankings. Learn about these ranking parameteters and how to select and modify them. "} 
       
       />
    
      

        <View >
        

        { newData?.map((hotel:any)=>(
        <HotelListCard  key={hotel.id}  {...hotel} />
       
        ))}


        
      </View>
     </ScrollView>
</SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container:{
  flex:1,
  backgroundColor:"#f8f8f8",
paddingHorizontal:10,
paddingVertical:10

  },
 

});
