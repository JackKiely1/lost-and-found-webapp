import { API_BASE_URL } from "../config/api";

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

  return data;
}