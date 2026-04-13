import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getItems } from "../../src/services/itemService";

export default function LostItemsScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();

      
      const lostItems = data.filter((item: any) => item.type === "found");

      setItems(lostItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Found Items</Text>

      {items.map((item: any) => (
        <View key={item._id} style={styles.card}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text>{item.category}</Text>
          <Text>{item.location}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  card: {
    padding: 12,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: { fontWeight: "700" },
});