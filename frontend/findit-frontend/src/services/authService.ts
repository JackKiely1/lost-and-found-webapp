import { API_BASE_URL } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- REGISTER USER ---------- */

export async function registerUser(userData: {
  fullName: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Registration failed");
  }

  return data;
}

/* ---------- LOGIN USER ---------- */

export async function loginUser(userData: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Login failed");
  }

  if (data.token) {
  await AsyncStorage.setItem("token", data.token);
  }

  if (data.user) {
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
}

  return data;
}

/* ---------- LOGOUT USER ---------- */

export async function logoutUser() {
  await AsyncStorage.removeItem("token");
}