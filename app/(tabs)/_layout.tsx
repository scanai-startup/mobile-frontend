import { Tabs } from "expo-router";
import { Cylinder, House } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const iconProps = {
    size: "28px",
  };
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#171717", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <House size={iconProps.size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tankControl"
        options={{
          title: "Tanques",
          tabBarIcon: ({ color }) => (
            <Cylinder size={iconProps.size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
