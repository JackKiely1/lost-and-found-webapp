import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../../src/services/authService";
import { Colours } from "@/constants/theme";

export default function AccountScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

    useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

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
      <Text style={styles.subtitle}>Manage your FindIT account and session.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.fullName || "Not available"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "Not available"}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>
          {user?.role === "admin" ? "Admin" : "User"}
        </Text>
      </View>

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
   card: {
    backgroundColor: Colours.light.lightGray,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colours.light.border,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colours.light.secondary,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: Colours.light.text,
    marginTop: 2,
  },
});