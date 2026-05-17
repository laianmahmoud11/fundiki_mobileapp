import * as React from 'react';

import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import PaymentWay from './paymentWay';
import { SafeAreaView } from 'react-native-safe-area-context';
type FormData = {
  cardNumber: string;
  expiry: string;
  name: string;
  cvv: string;
};
const InformationCard = ({setPaymentWay,setpaymentStatus,paymentStatus}:any) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', marginLeft:20, padding: 40, marginRight:40, marginHorizontal: 20}



 const { control, handleSubmit } = useForm<FormData>({ mode: "all" });

const onSubmit = async (data: FormData) => {
 
        try {
             await setpaymentStatus("paid");
           hideModal();
          
        } catch (error) {
        console.log("error");
        }
      
     
    };
  return (
    <PaperProvider>
        <SafeAreaView style={styles.informationCard}>

      <Portal >
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Controller

                control={control}
              name={"cardNumber"}
                rules={{
                    required: "Card number is required",
                    minLength: {
                        value: 12,
                        message: "Card number is too short",
                    },
                }}
                render={({  field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                       placeholder="Card Number"
                     style={styles.input}
                      value={value}
                    onChangeText={onChange}
                                   />
                                    {error?.message &&
                            <Text style={{ color: "red" }}>{error.message}</Text>
                        }
                    </View>
                )}
            ></Controller>


             <Controller

                control={control}
              name={"expiry"}
                rules={{
                    required: "Expiry is required",
                   
                }}
                render={({  field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                       placeholder="Expiry"
                     style={styles.input}
                      value={value}
                    onChangeText={onChange}
                                   />
                                     {error?.message &&
                            <Text style={{ color: "red" }}>{error.message}</Text>
                        }
                    </View>
                )}
            ></Controller>
          <Controller

                control={control}
              name={"name"}
                rules={{
                    required: "Name is required",
                   
                }}
                render={({  field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                       placeholder="Name"
                     style={styles.input}
                      value={value}
                    onChangeText={onChange}
                                   />
                                     {error?.message &&
                            <Text style={{ color: "red" }}>{error.message}</Text>
                        }
                    </View>
                )}
            ></Controller>
            <Controller

                control={control}
              name={"cvv"}
                rules={{
                    required: "CVV is required",
                    maxLength: {
                                 value: 3,
                            message: "CVV must be 3 digits",
                            },
                }}
                render={({  field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                       placeholder="CVV"
                     style={styles.input}
                      value={value}
                    onChangeText={onChange}
                                   />
                                     {error?.message &&
                            <Text style={{ color: "red" }}>{error.message}</Text>
                        }
                    </View>
                )}
            ></Controller>
        
         <Button style={{marginTop:10} }mode="contained"  onPress={
           handleSubmit(onSubmit)}>
   confirmation
  </Button>
         
        </Modal>
      </Portal>
    <View style={{backgroundColor:"#003B95"}}>
   <PaymentWay showModal={showModal} setPaymentWay={setPaymentWay} paymentStatus={paymentStatus} setpaymentStatus={setpaymentStatus}/>
   </View>
       </SafeAreaView>

    </PaperProvider>
  ); 
};
const styles = StyleSheet.create({
    informationCard:{
     marginVertical:50,
     padding:20
    },
 input:{
    marginTop:10
 }
 
});

export default InformationCard;


 