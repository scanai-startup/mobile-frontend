import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import ShipmentCard from "@/components/ShipmentCard";
import {
  Href,
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import apiInstance from "@/api/apiInstance";
import { useShipmentStore } from "@/context/remessasContext";
import { useTokenStore } from "@/context/userData";

//TODO: TERMINAR A PARTE DE ASSOCIAÇÃO DA REMESSA COM O DEPOSITO QUANDO FOR
//DEDICIDO O QUE É PRA FAZER

export default function BaseWine() {
  const router = useRouter();
  const { tank } = useLocalSearchParams();
  const [data, setData] = useState();
  const selectedShipments = useShipmentStore(
    (state) => state.selectedShipments
  );
  const { userId } = useTokenStore();

  console.log("TANQUEEEE", tank);

  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getRemessas();
      return;
    }, [])
  );

  const getRemessas = async () => {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const response = await apiInstance.get("/uva/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const response = await apiInstance.get("/vinculodepositoremessas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          remessaUvaIdList: selectedShipments,
          //TODO: NEED TO WAIT THE IMPLEMENTATION GET THE DEPOSIT ID WHEN
          //API CALL IS NEEDED
          depositoId: 0,
          funcionarioId: userId,
        },
      });

      console.log("Remessas associadas", selectedShipments);
      console.log("response", response.data);
    } catch (error) {
      console.error("Erro ao associar remessas:", error);
    }
  };

  //getRemessas();

  // const data: ShipmentCardType[] = [
  //   {
  //     number: 101,
  //     ticket: 1,
  //     id: 12345678,
  //     date: "21/10/2022",
  //     casta: "Airen",
  //     type: "Vinho branco",
  //   },
  //   {
  //     number: 102,
  //     ticket: 2,
  //     id: 87654321,
  //     date: "22/10/2022",
  //     casta: "Merlot",
  //     type: "Vinho tinto",
  //   },
  // ];

  const href: Href = {
    pathname: "/tank/[tank]",
    params: { tank: tank as string },
  };
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText={tank as string}
          showReturnButton
          returnHref={router.back}
        />
        <View className="flex-1 px-7 pb-4">
          <Text className="text-zinc-950 font-bold text-3xl mb-1">
            Associar Remessas
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ShipmentCard shipment={item} variant="secondary" />
            )}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 10,
            }}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500 text-center mb-4">
                  Não existe nenhum vinho base cadastrado (remessa).
                </Text>
                <Text className="text-4xl">🍷</Text>
              </View>
            }
          ></FlatList>
          <View className="mt-4">
            <Link href={href} asChild>
              <DefaultButton title="Concluir" onPress={handleSubmit} />
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
