import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, StyleSheet, Image, View } from "react-native";
import { Colours } from "@/constants/theme";

export default function ItemDetailScreen() {
  const params = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{params.itemName}</Text>

      {params.imageUrl ? (
        <Image source={{ uri: String(params.imageUrl) }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No image available</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{params.category}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{params.location}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{params.description}</Text>
        
      </View>
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
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  noImage: {
    height: 180,
    borderRadius: 12,
    backgroundColor: Colours.light.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colours.light.border,
  },
  noImageText: {
    color: Colours.light.text,
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colours.light.lightGray,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colours.light.border,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colours.light.secondary,
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: Colours.light.text,
    marginTop: 2,
  },
});