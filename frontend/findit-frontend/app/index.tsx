import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { isBasicEmailFormat, isSetuEmail } from "../src/utils/validators"
import { Link, useRouter } from "expo-router";
import { loginUser } from "../src/services/authService";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailTrimmed = email.trim();

  const isEmailValid = useMemo(() => {
    return isBasicEmailFormat(emailTrimmed) && isSetuEmail(emailTrimmed);
  }, [emailTrimmed]);

  const canSubmit =
    emailTrimmed.length > 0 && password.length > 0 && isEmailValid;

  const handleLogin = async () => {
    if (!emailTrimmed || !password) {

      Alert.alert(
        "Missing details",
        "Please enter your SETU email and password."
      );
      return;
    }
    if (!isBasicEmailFormat(emailTrimmed)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (!isSetuEmail(emailTrimmed)) {
      Alert.alert("SETU accounts only", "Please use your @setu.ie email.");
      return;
    }
    try { 
  const data = await loginUser({ email: emailTrimmed, password });

  Alert.alert("Login success", `Welcome ${data.user.fullName}`);

} catch (err: any) {
  Alert.alert("Login failed", err.message || "Something went wrong");
}
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back.</Text>
      <Text style={styles.subtitle}>Log in to continue to FindIT.</Text>

      <TextInput
        style={styles.input}
        placeholder="name@setu.ie"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />


      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

<TouchableOpacity
  style={[styles.button, !canSubmit && styles.buttonDisabled]}
  onPress={handleLogin}
  disabled={!canSubmit}
>
  <Text style={styles.buttonText}>Log in</Text>
</TouchableOpacity>


      <Text style={styles.bottomText}>Don't have an account?</Text>
      <Link href="/register" style={styles.link}>
        Register Here
      </Link>
      <Link href="/report-lost" style={styles.link}>
      Go to Report Lost (test)
     </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#555",
  },
  input: {
    height: 48,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    marginBottom: 16,
  },
  forgot: {
    textAlign: "right",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  button: {
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "600",
  },
  bottomText: {
    textAlign: "center",
    marginBottom: 6,
  },
  link: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
    buttonDisabled: {
    opacity: 0.5,
  },
});
