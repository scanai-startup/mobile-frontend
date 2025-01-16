import apiInstance from "@/api/apiInstance";
import SafeAreaView from "@/components/SafeAreaView";
import TankCard from "@/components/TankCard";
import ITankData from "@/types/ITankData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SelectMostroView() {
  const [data, setData] = useState<ITankData[]>([]);
  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getDepositos();
      return;
    }, [])
  );

  const syncTanksToLocalStorage = async (data: any) => {
    try {
      const json = JSON.stringify(data);
      await AsyncStorage.setItem("tanksData", json);
    } catch (err) {
      console.log("Erro ao converter para json: ", err);
    }
  };

  const getDepositos = async () => {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const response = await apiInstance.get(
        "/deposito/getAllDepositosWithInformations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.filter((t: ITankData) => t.conteudo === "Mostro"));
      syncTanksToLocalStorage(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };
  return (
    <>
      <SafeAreaView>
        <View className="px-7 flex-1 mt-6">
          <View>
            <Text className="text-2xl text-black font-bold">
              Selecionar mostro
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o mostro que deseja utilizar na criação do vinho.
            </Text>
          </View>
          <View className="flex flex-row items-center w-full mb-4">
            <View className="flex flex-row items-center bg-[#DEDEDE] py-2 px-3 rounded-lg flex-1">
              <Search color="#9A9A9A" />
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="Digite o número do tanque"
              />
            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.deposito}
            renderItem={({ item }) => {
              return item.temperatura ? (
                <TankCard
                  title={item.deposito}
                  isAvailable={"Edge"}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                />
              ) : (
                <TankCard title={item.deposito} isAvailable={"Edge"} />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
