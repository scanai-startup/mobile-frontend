import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

export default function NewWineLayout() {
  const [nextHref, setNextHref] = useState<string>("");
  const [isLastPage, setIsLastPage] = useState(false);
  const currRoute = usePathname();
  const routes = [
    {
      route: "/",
      nextHref: "/(newWine)/selectPeDeCuba",
      last: false,
    },
    {
      route: "/(newWine)/selectPeDeCuba",
      nextHref: "/(newWine)/",
      last: false,
    },
  ];

  useEffect(() => {
    const r = routes.find((r) => r.route === currRoute);
    r ? setNextHref(r.nextHref) : null;
    r?.last ? setIsLastPage(true) : null;
  }, [currRoute]);

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
        {/* <FormFooter
          nextHref={nextHref}
          isReturnButtonEnabled={currRoute === "/" ? false : true}
          // handleDataSubmit={}
          isLastPage={isLastPage}
        /> */}
      </SafeAreaView>
    </>
  );
}
