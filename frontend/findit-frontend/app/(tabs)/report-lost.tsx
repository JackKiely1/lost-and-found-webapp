import { useMemo, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_BASE_URL } from "../../src/config/api";
import { Colours } from "@/constants/theme";
import { itemCategories } from "../../constants/categories"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReportLostItem() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(itemCategories[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);

  const canSubmit = useMemo(() => {
    return (
      itemName.trim().length > 0 &&
      category.trim().length > 0 &&
      location.trim().length > 0 &&
      description.trim().length > 0
    );
  }, [itemName, category, location, description]);

  const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert("Permission required", "You need to allow access to photos.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.7,
  });

  if (!result.canceled) {
    setImage(result.assets[0]);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("type", "lost");
    formData.append("itemName", itemName.trim());
    formData.append("category", category.trim());
    formData.append("location", location.trim());
    formData.append("description", description.trim());

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);
    }

    const token = await AsyncStorage.getItem("token");
    
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: {
      Authorization: token || "",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Upload failed");
    }

    Alert.alert("Success", "Lost item report submitted successfully.");

    setItemName("");
    setCategory("");
    setLocation("");
    setDescription("");
    setImage(null);
  } catch (error: any) {
    Alert.alert("Submission Failed", error.message || "Something went wrong");
  }
};

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
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
      <View style={styles.categoryGrid}>
        {itemCategories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>

      {image && (
        <View>
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
          <TouchableOpacity style={styles.removeButton} onPress={() => setImage(null)}>
            <Text style={styles.removeText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.buttonDisabled]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Lost Item</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colours.light.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: Colours.light.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colours.light.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    color: Colours.light.primary,
  },
  input: {
    height: 46,
    backgroundColor: Colours.light.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colours.light.border,
    color: Colours.light.text,
  },
  textArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  uploadButton: {
    height: 46,
    backgroundColor: Colours.light.accent,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  uploadText: {
    fontWeight: "600",
    color: Colours.light.primary,
  },
  submitButton: {
    height: 50,
    backgroundColor: Colours.light.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  submitText: {
    fontWeight: "700",
    color: Colours.light.background,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  previewImage: {
  width: "100%",
  height: 180,
  borderRadius: 10,
  marginTop: 10,
},
removeButton: {
  marginTop: 8,
  alignItems: "center",
  padding: 8,
},
removeText: {
  color: "red",
  fontWeight: "600",
  fontSize: 13,
},
categoryGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 4,
},
 categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colours.light.border,
    backgroundColor: Colours.light.lightGray,
  },
  categoryButtonActive: {
    backgroundColor: Colours.light.secondary,
    borderColor: Colours.light.secondary,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colours.light.text,
  },
  categoryButtonTextActive: {
    color: Colours.light.background,
  },
});