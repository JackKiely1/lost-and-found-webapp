import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons"

import { HapticTab } from "@/components/haptic-tab";
import { Colours } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
    </Tabs>
      
  );
}