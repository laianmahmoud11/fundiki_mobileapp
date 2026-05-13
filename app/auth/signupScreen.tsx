import EmailAddress from "@/components/ui/auth/emailAddress";
import EmailAuthIntro from "@/components/ui/auth/emailAuthText";
import { colors } from "@/constants/theme";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <EmailAuthIntro />
          <EmailAddress
            mode="signup"
          />
          
          <Pressable style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>
              Already have an account?{' '}
              <Link href="./loginScreen" style={styles.loginLink}>
                Login
              </Link>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp("1.5%"),
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: wp("6%"),
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: wp('5%'),
  },
  loginLinkText: {
    fontSize: wp('3.8%'),
    color: colors.black,
    textAlign: 'center',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SignupScreen;