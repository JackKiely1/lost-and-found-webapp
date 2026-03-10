import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { createItem } from "../../src/services/itemService";

export default function ReportLostItem() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => {
    return (
      itemName.trim().length > 0 &&
      category.trim().length > 0 &&
      location.trim().length > 0 &&
      description.trim().length > 0
    );
  }, [itemName, category, location, description]);

  const handleSubmit = async () => {
  try {
    await createItem({
      type: "lost",
      itemName: itemName.trim(),
      category: category.trim(),
      location: location.trim(),
      description: description.trim(),
      imageUrl: "",
    });

    Alert.alert("Success", "Lost item report submitted successfully.");

    // Clear the form after success
    setItemName("");
    setCategory("");
    setLocation("");
    setDescription("");
  } catch (error: any) {
    Alert.alert("Submission Failed", error.message || "Something went wrong");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Lost Item</Text>
      <Text style={styles.subtitle}>Fill in the details below to report an item you have lost</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Item name (e.g. Black Backpack)"
        placeholderTextColor="#888"
        value={itemName}
        onChangeText={setItemName}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Select a category (e.g. Phone, Wallet)"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Where was the item last seen?"
        placeholderTextColor="#888"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add a short description of the item."
        placeholderTextColor="#888"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => Alert.alert("UI only", "Image upload will be added later.")}>
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.buttonDisabled]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Lost Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 46,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  textArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  uploadButton: {
    height: 46,
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  uploadText: {
    fontWeight: "600",
    color: "#333",
  },
  submitButton: {
    height: 50,
    backgroundColor: "#777",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  submitText: {
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});