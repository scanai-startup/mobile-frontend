import apiInstance from "@/api/apiInstance";
import SafeAreaView from "@/components/SafeAreaView";
import { useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ITankData {
  conteudo: string;
  idConteudo: number;
  densidade: number;
  temperatura: number;
  pressao: number;
  idDeposito: number;
  deposito: string;
}

export default function SelectMostroView() {
  const [data, setData] = useState<ITankData[]>([]);
  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getDepositos();
      return;
    }, [])
  );

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
      console.log(response.data);
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
                <Card
                  depositId={item.idDeposito}
                  title={item.deposito}
                  isAvailable={"Edge"}
                  content={item.conteudo}
                  contentId={item.idConteudo}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                />
              ) : (
                <Card
                  depositId={item.idDeposito}
                  title={item.deposito}
                  isAvailable={"Edge"}
                  content={item.conteudo}
                  contentId={item.idConteudo}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

interface CardProps {
  depositId: number;
  title: string;
  isAvailable: boolean | string;
  density?: number;
  temperature?: number;
  pressure?: number | null;
  content?: string;
  contentId?: number;
}

function Card({
  title,
  isAvailable,
  density = 0,
  temperature = 0,
  pressure = 0,
  depositId,
  content = "",
  contentId = 0,
}: CardProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View style={{ marginBottom: 16, width: "100%" }}>
      <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
        <View className="flex-row p-4 justify-between items-center">
          <Text className="text-2xl font-bold">{title}</Text>
          <TouchableOpacity
            onPress={() => setIsSelected(!isSelected)}
            className={
              "border rounded-md px-2 py-1 border-blue-500" +
              (isSelected ? " bg-blue-500" : "")
            }
          >
            <Text className={isSelected ? "text-white" : "text-blue-500"}>
              {isSelected ? "Selecionado" : "Selecionar"}
            </Text>
          </TouchableOpacity>
        </View>
        {isAvailable === "Edge" && temperature ? (
          <>
            <View className="w-full h-[1px] bg-neutral-250"></View>
            <View className="p-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-light">Densidade:</Text>
                <View className="flex-row justify-center items-end">
                  <Text className="text-2xl font-semibold">{density} </Text>
                  <Text className="text-base font-normal text-neutral-400">
                    kg/m³
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xl font-light">Temperatura:</Text>
                <View className="flex-row justify-center items-end">
                  <Text className="text-2xl font-semibold">{temperature} </Text>
                  <Text className="text-base font-normal text-neutral-400">
                    °C
                  </Text>
                </View>
              </View>
              {pressure && (
                <View className="flex-row justify-between">
                  <Text className="text-xl font-light">Pressão:</Text>
                  <View className="flex-row justify-center items-end">
                    <Text className="text-2xl font-semibold">{pressure} </Text>
                    <Text className="text-base font-normal text-neutral-400">
                      Pa
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
}
