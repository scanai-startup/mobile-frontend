import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import { useToast } from "@/hooks/useToast";
import { useShipmentStore } from "@/store/NewShipmentContext";

import { Stack, usePathname, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

export default function GrapeReceptionLayout() {
  const router = useRouter();
  const { shipmentData } = useShipmentStore();
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState(false);

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
        router.dismissTo("/(tabs)/shipment"); // navigate back to the shipments list
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

  useEffect(() => {
    const page1Valid = Boolean(
      shipmentData.datachegada &&
        shipmentData.numerotalao &&
        shipmentData.casta &&
        shipmentData.numerolote &&
        shipmentData.qttcaixa &&
        shipmentData.peso,
    );

    const page2Valid = Boolean(
      shipmentData.sanidade && shipmentData.so2 && shipmentData.tipodevinho,
    );

    // Validate based on current page
    setIsFormValid(currRoute === "/" ? page1Valid : page1Valid && page2Valid);
  }, [shipmentData, currRoute]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AppHeader
          showReturnButton={currRoute === "/" ? true : false}
          variant="secondary"
          mainText="Recepção de Uvas"
          returnHref={router.back}
        />
        <Stack screenOptions={{ headerShown: false }} />
        <FormFooter
          nextHref={nextHref}
          isReturnButtonEnabled={currRoute === "/" ? false : true}
          isNextButtonEnabled={isFormValid}
          isLastPage={nextHref === "/(tabs)/" && true}
          handleDataSubmit={() => {
            handleDataSubmit();
            toast({
              heading: "Sucesso!",
              message: "Nova remessa cadastrada com sucesso.",
            });
          }}
        />
      </SafeAreaView>
    </>
  );
}
