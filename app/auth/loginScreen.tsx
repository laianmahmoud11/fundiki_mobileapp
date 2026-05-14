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

const LoginScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <EmailAuthIntro />
          <EmailAddress mode="login" />
          
          <Pressable style={styles.signupLinkContainer}>
            <Text style={styles.signupLinkText}>
              Don't have an account?{' '}
              <Link href={"./auth/signupScreen" }style={styles.signupLink}>
                Sign up
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
  signupLinkContainer: {
    alignItems: 'center',
    marginTop: wp('5%'),
  },
  signupLinkText: {
    fontSize: wp('3.8%'),
    color: colors.black,
    textAlign: 'center',
  },
  signupLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;