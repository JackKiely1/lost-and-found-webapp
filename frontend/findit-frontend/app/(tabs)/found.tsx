import { useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { getItems } from "../../src/services/itemService";
import { Colours } from "@/constants/theme";
import { useFocusEffect, router } from "expo-router";
import { itemCategories } from "../../constants/categories";

export default function FoundItemsScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

useFocusEffect(
  useCallback(() => {
    fetchItems();
  }, [])
);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

    const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      return (
        item.type === "found" &&
        item.itemName.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedCategory === "All" || item.category === selectedCategory)
      );
    });
  }, [items, searchText, selectedCategory]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Found Items</Text>
      <Text style={styles.subtitle}>Browse items reported as found on campus.</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search found items..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === "All" && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === "All" && styles.filterButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {itemCategories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === cat && styles.filterButtonTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredItems.length === 0 ? (
        <Text style={styles.emptyText}>No found items match your search or filter.</Text>
      ) : (
filteredItems.map((item: any) => (
          <View key={item._id} style={styles.card}>
    {item.imageUrl ? (
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
    ) : null}
            <Text style={styles.itemName}>{item.itemName}</Text>

            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{item.category}</Text>

            <View style ={styles.cardFooter}>
            <View>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{item.location}</Text>
            </View>
                  <TouchableOpacity
        style={styles.detailsButton}
        onPress={() =>
          router.push({
            pathname: "/item/[id]",
            params: {
              id: item._id,
              itemName: item.itemName,
              category: item.category,
              location: item.location,
              description: item.description,
              type: item.type,
              imageUrl: item.imageUrl || "",
              reportedByName: item.reportedBy?.fullName || "",
              reportedByEmail: item.reportedBy?.email || "",
            },
          })
        }
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>

      </View>     

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
  itemImage: {
  width: "100%",
  height: 180,
  borderRadius: 10,
  marginBottom: 12,
},
 searchInput: {
    height: 46,
    backgroundColor: Colours.light.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colours.light.border,
    color: Colours.light.text,
    marginBottom: 12,
  },
  filterRow: {
    paddingBottom: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colours.light.border,
    backgroundColor: Colours.light.lightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colours.light.secondary,
    borderColor: Colours.light.secondary,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colours.light.text,
  },
  filterButtonTextActive: {
    color: Colours.light.background,
  },
  cardFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 12,
},

detailsButton: {
  backgroundColor: Colours.light.secondary,
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 10,
},

detailsButtonText: {
  color: Colours.light.background,
  fontWeight: "700",
  fontSize: 13,
},
});