import { colors } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing in or creating an account, you agree with our{" "}
          <Text style={styles.linkText}>Terms & conditions</Text> and{" "}
          <Text style={styles.linkText}>Privacy statement</Text>
        </Text>
      </View>

      <View style={styles.copyrightContainer}>
        <AntDesign name="copyright" size={12} color={colors.black} />
        <Text style={styles.copyrightText}>
          <Text>{currentYear}</Text>
          <Text style={styles.copyrightBrand}> Fundiqi</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("3%"),
    paddingHorizontal: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  termsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  termsText: {
    fontSize: wp("3.2%"),
    color: colors.black,
    textAlign: "center",
    lineHeight: hp("2.5%"),
  },
  linkText: {
    fontSize: wp("3.2%"),
    color: colors.tertiary,
    textDecorationLine: "none",
    fontWeight: "500",
  },
  copyrightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
  },
  copyrightText: {
    fontSize: wp("3%"),
    color: colors.black,
    textAlign: "center",
  },

  copyrightBrand: {
    fontWeight: "600",
    color: colors.black,
  },
});

export default Footer;
