import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { isBasicEmailFormat, isSetuEmail } from "../src/utils/validators";
import { Link, useRouter } from "expo-router";
import { registerUser } from "../src/services/authService";


export default function Register() {
  const router = useRouter();
    const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailTrimmed = email.trim();

  const isEmailValid = useMemo(() => {
    return isBasicEmailFormat(emailTrimmed) && isSetuEmail(emailTrimmed);
  }, [emailTrimmed]);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const canSubmit =
    fullName.trim().length > 0 &&
    isEmailValid &&
    password.length >= 6 &&
    passwordsMatch;

  const handleRegister = async () => {
    if (!fullName.trim() || !emailTrimmed || !password || !confirmPassword) {
      Alert.alert("Missing details", "Please complete all fields.");
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
    if (password.length < 6) {
      Alert.alert("Password too short", "Password must be at least 6 characters.");
      return;
    }
    if (!passwordsMatch) {
      Alert.alert("Passwords don't match", "Please ensure both passwords match.");
      return;
    }
    try {
  await registerUser({
    fullName: fullName.trim(),
    email: emailTrimmed,
    password,
  });

  Alert.alert("Account created", "Your account was created. Please log in.", [
    { text: "Go to Login", onPress: () => router.replace("/") },
  ]);
} catch (err: any) {
  Alert.alert("Register failed", err.message || "Something went wrong");
}
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account.</Text>
      <Text style={styles.subtitle}>Sign up to start using FindIT.</Text>

            <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />

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
        placeholder="Password (min 6 chars)"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />


       <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!canSubmit}>
       <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>Already have an account?</Text>
      <Link href="/" style={styles.link}>
        Log In
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
