import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { logoutUser } from "../../src/services/authService";
import { Colours } from "@/constants/theme";

export default function AccountScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          router.replace("/login"); // points to your login page
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>Manage your session</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colours.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    color: Colours.light.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colours.light.text,
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: Colours.light.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    color: Colours.light.background,
  },
});