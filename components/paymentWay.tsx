

import * as React from 'react';
import { RadioButton } from 'react-native-paper';

const PaymentWay = ({showModal,setPaymentWay,paymentStatus,setpaymentStatus}:any) => {
  const [value, setValue] = React.useState ('');

  const handlepayment = (value:any) => {
    if (value === 'VISA') {
    
     showModal();
      if(paymentStatus==="paid"){
      setValue(value)
      }
      setPaymentWay("VISA")
      
    } else {
      
      setValue(value);
      setPaymentWay("arrival")
      setpaymentStatus("notpaid")
    }
  };
  return (
    <RadioButton.Group onValueChange={value => handlepayment(value)} value={value}>
      <RadioButton.Item label="VISA" value="VISA" />
      <RadioButton.Item label="arrival" value="second" />
    </RadioButton.Group>
  );
};

export default PaymentWay;