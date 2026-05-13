import { colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const EmailAuthIntro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your email address</Text>
     
    </View>
  );
};

export default EmailAuthIntro;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp("5%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: colors.black,
    marginBottom: hp("2%"),
  },
 
});
