import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { Cylinder, House, Truck, Warehouse } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#171717",
          tabBarInactiveTintColor: "#C0C0C0",
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ size, color }) => (
              <House size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="shipment"
          options={{
            title: "Remessas",
            tabBarIcon: ({ size, color }) => (
              <Truck size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tankControl"
          options={{
            title: "Tanques",
            tabBarIcon: ({ size, color }) => (
              <Cylinder size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stock"
          options={{
            title: "Estoque",
            tabBarIcon: ({ size, color }) => (
              <Warehouse size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
