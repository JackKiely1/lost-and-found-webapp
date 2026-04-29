import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, StyleSheet, Image, View, TouchableOpacity, Linking, Alert } from "react-native";
import { Colours } from "@/constants/theme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API_BASE_URL } from "../../src/config/api";

export default function ItemDetailScreen() {
  const params = useLocalSearchParams();
  // Stores the currently logged-in user, loaded from AsyncStorage
  const [currentUser, setCurrentUser] = useState<any>(null);

  const itemId = params.id as string;
  const reportedByName = params.reportedByName as string;
  const reportedByEmail = params.reportedByEmail as string;
  const reportedById = params.reportedById as string;

  // Load the logged-in user
useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

const currentUserId = currentUser?._id || currentUser?.id;

// Only the reporter who submitted the item, or an admin, can mark it as claimed
const canMarkClaimed =
currentUserId === reportedById || currentUser?.role === "admin";

// Opens the default mail client pre-filled with the reporter's address and item subject
const handleContactReporter = () => {
  if (!reportedByEmail) return;

  Linking.openURL(
    `mailto:${reportedByEmail}?subject=FindIT Item Enquiry - ${params.itemName}`
  );
};

// Confirms intended action, then sends a PATCH request to mark the item as claimed
const handleMarkClaimed = async () => {
    Alert.alert(
      "Mark as Claimed",
      "Are you sure this item has been claimed? It will no longer appear publicly.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark Claimed",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              const response = await fetch(
                `${API_BASE_URL}/items/${itemId}/claim`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: token || "",
                  },
                }
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.msg || "Failed to mark item as claimed.");
              }

              Alert.alert("Updated", "Item marked as claimed.", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]);
            } catch (error: any) {
              Alert.alert("Error", error.message || "Something went wrong.");
            }
          },
        },
      ]
    );
  };

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

        {reportedByEmail ? (
        <TouchableOpacity style={styles.contactButton} onPress={handleContactReporter}>
        <Text style={styles.contactButtonText}>Contact Reporter</Text>
         </TouchableOpacity>
        ) : null}


        {/* Show claim button only to the reporter or an admin */}
        {canMarkClaimed && (
          <TouchableOpacity style={styles.claimButton} onPress={handleMarkClaimed}>
            <Text style={styles.claimButtonText}>Mark as Claimed</Text>
          </TouchableOpacity>
        )}
        
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
  contactButton: {
  height: 48,
  backgroundColor: Colours.light.secondary,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 16,
},
contactButtonText: {
  color: Colours.light.background,
  fontWeight: "700",
},
  claimButton: {
    height: 48,
    backgroundColor: Colours.light.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  claimButtonText: {
    color: Colours.light.background,
    fontWeight: "700",
  },
});