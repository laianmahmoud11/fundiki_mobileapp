import { colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SignInText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sign in for easier access to your trip details
      </Text>
    </View>
  );
};

export default SignInText;

const styles = StyleSheet.create({
  container: {
    padding: wp("7%"),
    paddingTop: hp("10%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: colors.black,
    marginBottom: wp("3.5%"),
  },
});
