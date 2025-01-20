import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import FormFooter from "@/components/FormFooter";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import { useLocalTanksData } from "@/hooks/useLocalTanksData";
import { useTankSelection } from "@/hooks/useTankSelection";
import ITankData from "@/types/ITankData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SelectPeDeCuba() {
  const { fkMostro, mostroVol } = useLocalSearchParams();
  const { tanksData } = useLocalTanksData();
  const {
    selectedTank,
    isDialogOpen,
    volume,
    isNextButtonEnabled,
    setVolume,
    handleSelectTank,
    onDialogClose,
    handleContinueButton,
  } = useTankSelection();

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
              keyboardType="numeric"
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
            keyExtractor={(item) => item.idDeposito.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return item.temperatura ? (
                <SelectTankCard
                  title={item.deposito}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                  setIsSelected={() =>
                    handleSelectTank({
                      deposit: item.deposito,
                      fkPeDeCuba: item.idConteudo,
                      volume: 0,
                    })
                  }
                  isSelected={selectedTank?.deposit === item.deposito && true}
                />
              ) : null
            }}
          />
        </View>
        <FormFooter
          nextHref={
            selectedTank
              ? {
                  pathname: "/(newWine)/selectTargetTank",
                  params: {
                    fkMostro: fkMostro,
                    fkPeDeCuba: selectedTank.fkPeDeCuba,
                    vol: Number(mostroVol) + selectedTank.volume,
                  },
                }
              : "/"
          }
          isReturnButtonEnabled={true}
          isNextButtonEnabled={isNextButtonEnabled}
          isLastPage={false}
        />
      </SafeAreaView>
    </>
  );
}
