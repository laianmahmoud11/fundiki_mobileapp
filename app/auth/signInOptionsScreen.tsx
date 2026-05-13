import ContinueWith from "@/components/ui/auth/continueWith";
import Footer from "@/components/ui/auth/footer";
import SignInText from "@/components/ui/auth/SignInText";
import { colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
const SignInOptions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SignInText />
        <ContinueWith />
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "center",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: colors.black,
  },
});

export default SignInOptions;
