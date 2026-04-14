import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getItems } from "../../src/services/itemService";
import { Colours } from "@/constants/theme";

export default function FoundItemsScreen() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      const foundItems = data.filter((item: any) => item.type === "found");
      setItems(foundItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Found Items</Text>
      <Text style={styles.subtitle}>Browse items reported as found on campus.</Text>

      {items.length === 0 ? (
        <Text style={styles.emptyText}>No found items reported yet.</Text>
      ) : (
        items.map((item: any) => (
          <View key={item._id} style={styles.card}>
            <Text style={styles.itemName}>{item.itemName}</Text>

            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{item.category}</Text>

            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{item.location}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{item.description}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colours.light.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colours.light.text,
    marginBottom: 18,
  },
  emptyText: {
    fontSize: 15,
    color: Colours.light.surface,
    textAlign: "center",
    marginTop: 30,
  },
  card: {
    backgroundColor: Colours.light.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colours.light.border,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colours.light.primary,
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colours.light.secondary,
    marginTop: 6,
  },
  value: {
    fontSize: 15,
    color: Colours.light.text,
    marginTop: 2,
  },
});