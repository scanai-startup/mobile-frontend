import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import ITankData from "@/types/ITankData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SelectTargetTank() {
  const [tanksData, setTanksData] = useState<ITankData[]>([]);
  const [selectedTank, setSelectedTank] = useState(0);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const { fkMostro, fkPeDeCuba, vol } = useLocalSearchParams();

  async function getTanksDataFromLocal() {
    try {
      const data = await AsyncStorage.getItem("tanksData");
      data && setTanksData(JSON.parse(data));
    } catch (err) {
      console.error("Erro ao recuperar dados do armazenamento local: ", err);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getTanksDataFromLocal();
      return;
    }, [])
  );
  return (
    <>
      <SafeAreaView>
        <View className="px-7 flex-1 mt-6">
          <View>
            <Text className="text-2xl text-black font-bold">
              Selecionar o tanque final.
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o tanque final para o vinho.
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
            data={tanksData.filter((t) => t.conteudo === null)}
            keyExtractor={(item) => item.idDeposito.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <SelectTankCard
                  title={item.deposito}
                  setIsSelected={() => {
                    setSelectedTank(item.idDeposito);
                    setIsNextButtonEnabled(true);
                  }}
                  isSelected={selectedTank === item.idDeposito && true}
                />
              );
            }}
          />
        </View>
        <FormFooter
          nextHref={selectedTank ? "/(tabs)/tankControl" : "/"}
          isReturnButtonEnabled={true}
          isNextButtonEnabled={isNextButtonEnabled}
          isLastPage={true}
          handleDataSubmit={() => {
            console.log(
              "fkMostro: " +
                fkMostro +
                " fkPeDeCuba: " +
                fkPeDeCuba +
                " volume: " +
                vol +
                " id deposito alvo: " +
                selectedTank
            );
            router.dismissTo("/(tabs)");
          }}
        />
      </SafeAreaView>
    </>
  );
}
