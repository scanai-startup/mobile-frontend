import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import SafeAreaView from "@/components/SafeAreaView";
import ShipmentCard from "@/components/ShipmentCard";
import StatusBar from "@/components/StatusBar";
import IShipmentCard from "@/types/IShipmentCard";
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CirclePlus } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Shipment() {
  const [shipments, setShipments] = useState<IShipmentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //TODO: ERRO HANDLING
  const [error, setError] = useState<string | null>(null);

  async function getAllShipments() {
    setIsLoading(true);
    setError(null);
    const token = await SecureStore.getItemAsync("user-token");
    apiInstance
      .get("/uva/getAll", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((r) => {
        setShipments(r.data);
      })
      .catch((e) => {
        console.error(e);
        setError("Não foi possível carregar as remessas. Tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getAllShipments();
      return;
    }, []),
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText="Gestão de remessas"
          showReturnButton
        />
        <View className="px-7">
          <Button
            placeholder="Adicionar nova remessa"
            onPress={() =>
              router.push(
                "/(grapeReception)?nextHref=(grapeReception)/grapeReceptionP2&prevHref=/",
              )
            }
            icon={<CirclePlus color="white" />}
            buttonClassname="bg-blue-500"
            placeholderClassname="text-xl"
          />
          <FlatList
            data={shipments}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ShipmentCard shipment={item} />}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 160,
              gap: 10,
            }}
            ListEmptyComponent={() => {
              return isLoading ? <IsLoadingShipment /> : <EmptyShipment />;
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function EmptyShipment() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-500 text-center mb-4">
        Não há remessas cadastradas ainda
      </Text>
      <Text className="text-4xl">🚗</Text>
    </View>
  );
}

function IsLoadingShipment() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator />
      <Text className="text-xl">Carregando... Por favor aguarde</Text>
    </View>
  );
}
