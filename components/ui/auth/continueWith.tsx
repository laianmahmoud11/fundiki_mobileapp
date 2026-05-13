import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PrimaryButton from "@/components/common/primaryButton";

const ContinueWith = () => {
  return (
    <View style={styles.container}>
      <Link href="/auth/emailEntryScreen" asChild>
        <PrimaryButton title="Continue with email" color="blue" />
      </Link>
    </View>
  );
};

export default ContinueWith;

const styles = StyleSheet.create({
  container: {
    gap: wp("3.5%"),
    justifyContent: "center",
    padding: wp("7%"),
  },
});
