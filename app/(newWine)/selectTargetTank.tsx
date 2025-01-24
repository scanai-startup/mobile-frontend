import apiInstance from "@/api/apiInstance";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import { useTokenStore } from "@/store/userData";
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
  const { userId } = useTokenStore();

  async function getTanksDataFromLocal() {
    try {
      const data = await AsyncStorage.getItem("tanksData");
      data && setTanksData(JSON.parse(data));
    } catch (err) {
      console.error("Erro ao recuperar dados do armazenamento local: ", err);
    }
  }

  //TODO!: POR UM INPUT PARA SELECIONAR A DATA, NAO SEI SABE O DIA
  //QUE O DADO ESTA SENDO REGISTRADO
  // <DateInput
  //             questionTitle="Data"
  //             selectedDate={date}
  //             setSelectedDate={(date) => setDate(date)}
  // />

  async function vincularDepositoVinho() {
    try {
      const payload = {
        depositoId: selectedTank,
        dataFimFermentacao: new Date().toISOString(),
        pedecubaId: Number(fkPeDeCuba),
        //TODO: ADICIONAR ROTULO
        rotuloId: 1,
        mostroIds: [Number(fkMostro)],
        funcionarioId: userId,
      };

      await apiInstance.post("/vinculodepositovinho", payload);
      console.log("Depósito vinculado com sucesso!");
    } catch (error) {
      console.log({
        depositoId: selectedTank,
        dataFimFermentacao: new Date().toISOString(),
        pedecubaId: Number(fkPeDeCuba),
        //TODO: ADICIONAR ROTULO
        rotuloId: 1,
        mostroIds: [Number(fkMostro)],
        funcionarioId: userId,
      });
      console.error("Erro ao vincular depósito:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTanksDataFromLocal();
      return;
    }, []),
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
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return (
                <SelectTankCard
                  title={identificacaoDeposito}
                  setIsSelected={() => {
                    setSelectedTank(item.idDeposito);
                    setIsNextButtonEnabled(true);
                  }}
                  isSelected={selectedTank === item.idDeposito && true}
                />
              );
            }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center">
                <Text className="text-xl text-gray-500">
                  Nenhum tanque disponível.
                </Text>
              </View>
            )}
          />
        </View>
        <FormFooter
          nextHref={selectedTank ? "/(tabs)/tankControl" : "/"}
          isReturnButtonEnabled={true}
          isNextButtonEnabled={isNextButtonEnabled}
          isLastPage={true}
          handleDataSubmit={async () => {
            if (selectedTank) {
              await vincularDepositoVinho();
              router.dismissTo("/(tabs)");
            }
          }}
        />
      </SafeAreaView>
    </>
  );
}
