import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

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
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 6, color: "#333" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 18 },
  button: {
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { fontWeight: "700", color: "#333" },
  secondaryButton: {
    height: 46,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  secondaryText: { fontWeight: "600", color: "#333" },
});