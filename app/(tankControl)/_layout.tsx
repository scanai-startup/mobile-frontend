import StatusBar from "@/components/StatusBar";
import { Stack } from "expo-router";
import React from "react";

export default function TankControlLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
