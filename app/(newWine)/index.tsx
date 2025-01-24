import apiInstance from "@/api/apiInstance";
import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import FormFooter from "@/components/FormFooter";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import ITankData from "@/types/ITankData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

interface ISelectedTank {
  deposit: string;
  fkMostro: number;
  volume: number;
}

export default function SelectMostroView() {
  const [data, setData] = useState<ITankData[]>([]);
  const [selectedTank, setSelectedTank] = useState<ISelectedTank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [volume, setVolume] = useState("");

  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getDepositos();
      return;
    }, []),
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
        },
      );
      setData(response.data.filter((t: ITankData) => t.conteudo === "Mostro"));
      syncTanksToLocalStorage(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };
  const handleSelectTank = (tank: ISelectedTank) => {
    setSelectedTank(tank);
    setIsDialogOpen(true);
  };
  function onDialogClose() {
    setVolume("");
    setIsDialogOpen(false);
    setSelectedTank(null);
    setIsNextButtonEnabled(false);
  }
  function handleContinueButton() {
    selectedTank &&
      setSelectedTank({ ...selectedTank, volume: Number(volume) });
    setVolume("");
    setIsNextButtonEnabled(true);
    setIsDialogOpen(false);
  }
  return (
    <>
      <SafeAreaView>
        <CenteredModal
          isDialogOpen={isDialogOpen}
          handleDialogClose={() => onDialogClose()}
        >
          <View className="px-6 py-10 bg-white rounded-xl">
            <Text className="text-2xl text-black font-bold">
              Tanque selecionado: {selectedTank?.deposit}
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o volume do mostro que será utilizado para o vinho.
            </Text>
            <InputBox
              placeholder="200"
              title="Volume"
              auxText="L"
              onChangeText={(v) => setVolume(v)}
              keyboardType="number-pad"
            />
            <DefaultButton
              title="Continuar"
              className="mt-4"
              onPress={() => handleContinueButton()}
              disabled={volume ? false : true}
            />
          </View>
        </CenteredModal>
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
            keyExtractor={(item) => item.tipoDeposito}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return item.conteudo == "Mostro" ? (
                <SelectTankCard
                  title={identificacaoDeposito}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                  setIsSelected={() =>
                    handleSelectTank({
                      deposit: identificacaoDeposito,
                      fkMostro: item.idConteudo,
                      volume: 0,
                    })
                  }
                  isSelected={
                    selectedTank?.deposit === identificacaoDeposito && true
                  }
                />
              ) : (
                <SelectTankCard
                  title={identificacaoDeposito}
                  setIsSelected={() =>
                    handleSelectTank({
                      deposit: identificacaoDeposito,
                      fkMostro: item.idConteudo,
                      volume: 0,
                    })
                  }
                  isSelected={
                    selectedTank?.deposit === identificacaoDeposito && true
                  }
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
          nextHref={
            selectedTank
              ? {
                  pathname: "/(newWine)/selectPeDeCuba",
                  params: {
                    fkMostro: selectedTank.fkMostro,
                    mostroVol: selectedTank.volume,
                  },
                }
              : "/"
          }
          isReturnButtonEnabled={false}
          isNextButtonEnabled={isNextButtonEnabled}
          isLastPage={false}
        />
      </SafeAreaView>
    </>
  );
}
