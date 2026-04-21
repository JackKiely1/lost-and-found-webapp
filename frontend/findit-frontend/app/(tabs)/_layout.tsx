import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
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
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lost"
        options={{
          title: "Lost",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="found"
        options={{
          title: "Found",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="checkmark.circle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report-lost"
        options={{
          title: "Report Lost",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report-found"
        options={{
          title: "Report Found",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
  name="account"
  options={{
    title: "Account",
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="person.fill" color={color} />
    ),
  }}
/>
    </Tabs>
      
  );
}