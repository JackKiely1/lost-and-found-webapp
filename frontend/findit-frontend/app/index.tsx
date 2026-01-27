import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back.</Text>
      <Text style={styles.subtitle}>Log in to continue to FindIT.</Text>

      <View style={styles.input} />
      <View style={styles.input} />

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>Don't have an account?</Text>
      <Link href="/register" style={styles.link}>
        Register Here
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
});
