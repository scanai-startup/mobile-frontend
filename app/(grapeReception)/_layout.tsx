import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import { useShipmentStore } from "@/context/NewShipmentContext";

import { Stack, usePathname, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

export default function GrapeReceptionLayout() {
  const router = useRouter();
  const { shipmentData } = useShipmentStore();

  async function handleDataSubmit() {
    const token = await SecureStore.getItemAsync("user-token");

    apiInstance
      .post("/uva/register", shipmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.request);
        router.navigate("/(tabs)/shipment"); // navigate back to the shipments list
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
          returnHref="/(tabs)/shipment"
        />
        <Stack screenOptions={{ headerShown: false }} />
        <FormFooter
          nextHref={nextHref}
          isReturnButtonEnabled={currRoute === "/" ? false : true}
          handleDataSubmit={handleDataSubmit}
        />
      </SafeAreaView>
    </>
  );
}
