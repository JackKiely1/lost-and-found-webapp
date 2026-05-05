import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Image,} from "react-native";
import { API_BASE_URL } from "../../src/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colours } from "@/constants/theme";

export default function AdminScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPending = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/items/admin/pending`, {
        headers: {
          Authorization: token || "",
        },
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        setError("Server returned an invalid response.");
        return;
      }

      if (!res.ok) {
        setError(data.msg || "Failed to load pending items.");
        return;
      }

      setItems(data.items || []);
    } catch (err) {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

useFocusEffect(
  useCallback(() => {
    fetchPending();
  }, [])
);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/items/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ status }),
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        setError("Server returned an invalid response while updating item.");
        return;
      }

      if (!res.ok) {
        setError(data.msg || "Failed to update item.");
        return;
      }

      fetchPending();
    } catch (err) {
      setError("Network error while updating item.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colours.light.primary} />
        <Text style={styles.loadingText}>Loading pending items...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Admin Review</Text>
      <Text style={styles.subtitle}>Review pending lost and found reports before they appear publicly.</Text>

      {error.length > 0 && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {items.length === 0 ? (
        <Text style={styles.empty}>No pending items to review.</Text>
      ) : (
        items.map((item: any) => (
          <View key={item._id} style={styles.card}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            ) : null}

            <Text style={styles.itemName}>{item.itemName}</Text>

            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{item.type}</Text>

            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{item.category}</Text>

            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{item.location}</Text>

            <Text style={styles.label}>Reported By</Text>
            <Text style={styles.value}>
              {item.reportedBy?.fullName || "Unknown user"}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={() => updateStatus(item._id, "approved")}
              >
                <Text style={styles.actionText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => updateStatus(item._id, "rejected")}
              >
                <Text style={styles.actionText}>Reject</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.light.background,
  },
  loadingText: {
    marginTop: 10,
    color: Colours.light.text,
    fontWeight: "600",
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
  errorBox: {
    backgroundColor: "#FFECEC",
    borderWidth: 1,
    borderColor: "#FFB3B3",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    color: "#B00020",
    fontWeight: "600",
  },
  empty: {
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
  itemImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
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
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: Colours.light.secondary,
  },
  rejectButton: {
    backgroundColor: "#B00020",
  },
  actionText: {
    color: Colours.light.background,
    fontWeight: "700",
  },
});