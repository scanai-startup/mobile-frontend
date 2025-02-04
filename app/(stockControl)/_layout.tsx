import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { Stack } from "expo-router";
import React from "react";

export default function NewStockLayout() {
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AppHeader
          //   showReturnButton={currRoute === "/" ? true : false}
          variant="secondary"
          mainText="Criar novo vinho"
          returnHref="/(tabs)/"
        />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </>
  );
}
