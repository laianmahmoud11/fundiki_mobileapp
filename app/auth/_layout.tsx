import BrandLogo from "@/components/common/brandLogo";
import SmallNaviBar from "@/components/common/smallNaviBar";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AuthProvider } from "@/contexts/AuthContext";

const AuthLayout = () => {
  const handleOnPress = () => {
    router.push("/(tabs)/(home)/mybookingscreen");
  };

  return (
    <AuthProvider>
    <View style={{ flex: 1 }}>
      <SmallNaviBar>
        <BrandLogo />
        <Pressable onPress={handleOnPress}>
          <Ionicons name="close" style={styles.icon} />
        </Pressable>
      </SmallNaviBar>

      <Stack
        screenOptions={{
          headerShown: false,
          headerTitle: "",
          header: () => null,
        }}
      >
        <Stack.Screen name="signInOptionsScreen" />
        <Stack.Screen name="loginScreen" />
        <Stack.Screen name="signupScreen" />
      </Stack>
    </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: "flex-start",
  },

  icon: {
    color: colors.white,
    fontSize: wp("5%"),
  },
});

export default AuthLayout;
