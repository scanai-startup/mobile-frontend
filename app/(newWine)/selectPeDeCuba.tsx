import SafeAreaView from "@/components/SafeAreaView";
import TankCard from "@/components/TankCard";
import ITankData from "@/types/ITankData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SelectPeDeCuba() {
  const [tanksData, setTanksData] = useState<ITankData[]>([]);
  async function getTanksDataFromLocal() {
    try {
      const data = await AsyncStorage.getItem("tanksData");
      data && setTanksData(JSON.parse(data));
    } catch (err) {
      console.error("Erro ao recuperar dados do armazenamento local: ", err);
    }
  }
  useEffect(() => {
    getTanksDataFromLocal();
  }, []);

  return (
    <>
      <SafeAreaView>
        <View className="px-7 flex-1 mt-6">
          <View>
            <Text className="text-2xl text-black font-bold">
              Selecionar pé de cuba
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o pé de cuba que deseja utilizar na criação do vinho.
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
            // data={tanksData.filter((t) => t.conteudo === "Pé de Cuba")} //! uncomment when fixing the deposito+peDeCuba sync
            data={tanksData}
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
