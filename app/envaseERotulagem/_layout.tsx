import StatusBar from "@/components/StatusBar";
import { Stack } from "expo-router";
import React from "react";

export default function EnvaseERotulagemLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
