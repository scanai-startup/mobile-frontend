import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { Stack } from "expo-router";
import React from "react";

export default function GrapeReceptionLayout() {
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </>
  );
}
