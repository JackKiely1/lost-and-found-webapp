import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Colours } from "@/constants/theme";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FindIT</Text>
      <Text style={styles.subtitle}>Quick actions</Text>

      <Link href="/(tabs)/report-lost" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Report Lost Item</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/report-found" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Report Found Item</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/lost" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Browse Lost Items</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/found" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Browse Found Items</Text>
        </TouchableOpacity>
      </Link>
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
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    color: Colours.light.primary,
  },

  subtitle: {
    fontSize: 14,
    color: Colours.light.text,
    marginBottom: 18,
  },

  button: {
    height: 50,
    backgroundColor: Colours.light.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    fontWeight: "700",
    color: Colours.light.background,
  },

  secondaryButton: {
    height: 46,
    backgroundColor: Colours.light.lightGray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colours.light.border,
  },

  secondaryText: {
    fontWeight: "600",
    color: Colours.light.primary,
  },
});