import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import { Href, Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

export default function GrapeReceptionLayout() {
  const [nextHref, setNextHref] = useState("");
  const currRoute = usePathname();
  const routes = [
    {
      route: "/",
      nextHref: "/(grapeReception)/grapeReceptionP2",
    },
    {
      route: "/grapeReceptionP2",
      nextHref: "/(tabs)/",
    },
  ];
  useEffect(() => {
    const r = routes.find((r) => r.route === currRoute);
    r ? setNextHref(r.nextHref) : null;
  }, [currRoute]);
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AppHeader
          showReturnButton={currRoute === "/" ? true : false}
          variant="secondary"
          mainText="Recepção de Uvas"
          returnHref="/(tabs)"
        />
        <Stack screenOptions={{ headerShown: false }} />
        <FormFooter
          nextHref={nextHref as Href<string>}
          isReturnButtonEnabled={currRoute === "/" ? false : true}
        />
      </SafeAreaView>
    </>
  );
}
