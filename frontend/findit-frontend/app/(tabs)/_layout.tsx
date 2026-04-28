import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons"

import { HapticTab } from "@/components/haptic-tab";
import { Colours } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAdmin(user.role === "admin");
    }
  };

  loadUser();
}, []);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colours.light.primary,
          tabBarInactiveTintColor: Colours.light.icon,
            tabBarStyle: {
            backgroundColor: Colours.light.background,
            borderTopColor: Colours.light.border,
            },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lost"
        options={{
          title: "Lost",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="found"
        options={{
          title: "Found",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="checkmark-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report-lost"
        options={{
          title: "Report Lost",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="add-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report-found"
        options={{
          title: "Report Found",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="add-circle-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
  name="account"
  options={{
    title: "Account",
    tabBarIcon: ({ color }) => (
      <Ionicons size={28} name="person" color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="admin"
  options={{
    title: "Admin",
    href: isAdmin ? "/admin" : null,
    tabBarIcon: ({ color }) => (
      <Ionicons size={28} name="shield-checkmark" color={color} />
    ),
  }}
/>
    </Tabs>
      
  );
}