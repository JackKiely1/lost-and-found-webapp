import { View, Text, StyleSheet } from "react-native";

export default function FoundItemsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Found Items</Text>
      <Text style={styles.subtitle}>This will show a list of reported found items.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#555" },
});