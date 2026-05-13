import { colors } from "@/constants/theme";
import { useEmailAuth } from "@/hooks/use-auth-email";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PrimaryButton from "@/components/common/primaryButton";

type FormData = {
  email: string;
  password: string;
};

interface EmailAddress {
  mode: 'login' | 'signup';
}
const EmailAddress = ({ mode }: EmailAddress) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: { email: "", password: "" },
  });
  const { mutate, isPending } = useEmailAuth(mode);

  const onSubmit = (data: FormData) => {
   mutate(data, );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "invalid email address",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              onChangeText={onChange}
              value={value || ""}
              placeholder="Enter your email address"
              keyboardType="email-address"
              editable={!isPending}
            />
            {error?.message && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              onChangeText={onChange}
              value={value || ""}
              placeholder="Enter your password"
              secureTextEntry
              editable={!isPending}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />
      <PrimaryButton
        title="Continue"
        color="blue"
        loading={isPending}
        disabled={isPending}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: wp("1.5%"),
  },
  inputContainer: {
    marginBottom: wp("3%"),
  },
  label: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: colors.black,
    marginBottom: wp("2.5%"),
  },
  input: {
    fontSize: wp("4%"),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: wp("2.5%"),
    padding: wp("4.5%"),
    backgroundColor: colors.white,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: wp("3.2%"),
    marginTop: wp("1%"),
  },
});

export default EmailAddress;
