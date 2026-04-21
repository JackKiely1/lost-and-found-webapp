import { API_BASE_URL } from "../config/api";

type ItemData = {
  type: "lost" | "found";
  itemName: string;
  category: string;
  location: string;
  description: string;
  imageUrl?: string;
};

export async function createItem(itemData: ItemData) {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Item submission failed");
  }

  return data;
}

export async function getItems() {
  const response = await fetch(`${API_BASE_URL}/items`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return data.items;
}