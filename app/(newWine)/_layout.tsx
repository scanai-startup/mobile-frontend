import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import { Stack, usePathname } from "expo-router";
import React, { useState } from "react";

export default function NewWineLayout() {
  const [nextHref, setNextHref] = useState("");
  const currRoute = usePathname();
  // const routes = [{array de rotas}];

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AppHeader
          showReturnButton={currRoute === "/" ? true : false}
          variant="secondary"
          mainText="Criar novo vinho"
          returnHref="/(tabs)/"
        />
        <Stack screenOptions={{ headerShown: false }} />
        <FormFooter
          nextHref={nextHref}
          isReturnButtonEnabled={currRoute === "/" ? false : true}
          // handleDataSubmit={handleDataSubmit}
        />
      </SafeAreaView>
    </>
  );
}
