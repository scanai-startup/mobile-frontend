import { Button } from "@/components/atoms/Button";
import CenteredModal from "@/components/CenteredModal";
import FormFooter from "@/components/FormFooter";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import { useGetLocalTanksData } from "@/hooks/useGetLocalTanksData";
import { useNewWineTankSelect } from "@/hooks/useNewWineTankSelect";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Search } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function SelectPeDeCuba() {
  const { fkMostro, mostroVol, mostroVolPerdido } = useLocalSearchParams();
  const { data } = useGetLocalTanksData();
  const {
    selectedTank,
    isDialogOpen,
    volume,
    isNextButtonEnabled,
    setVolume,
    lostVolume,
    setLostVolume,
    handleSelectTank,
    isDialogConfirmButtonEnabled,
    onDialogClose,
    handleContinueButton,
    setIsDialogOpen,
  } = useNewWineTankSelect();

  let filteredData = data.filter((t) => t.conteudo === "Pé de Cuba");

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
            <Text className="text-xl mt-2 mb-2 font-semibold text-red-500">
              Volume no tanque: {selectedTank?.currentVolume} L
            </Text>
            <View className="gap-2">
              <InputBox
                placeholder="200"
                title="Volume"
                auxText="L"
                onChangeText={(v) => setVolume(v)}
                keyboardType="number-pad"
                value={volume}
              />
              <InputBox
                placeholder="10"
                title="Volume perdido"
                auxText="L"
                onChangeText={(v) => setLostVolume(v)}
                keyboardType="number-pad"
                value={lostVolume}
              />
            </View>
            <Button
              placeholder="Continuar"
              buttonClassname="mt-4"
              variant="secondary"
              onPress={() => handleContinueButton()}
              disabled={isDialogConfirmButtonEnabled}
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
          <InputBox
            icon={Search}
            placeholder="Pesquise pelo tanque"
            className="mb-4"
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.idDeposito.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return (
                <SelectTankCard
                  title={identificacaoDeposito}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                  setIsSelected={() => {
                    if (selectedTank?.id === Number(item.idDeposito)) {
                      setIsDialogOpen(true);
                      return;
                    }
                    handleSelectTank({
                      id: Number(item.idDeposito),
                      deposit: identificacaoDeposito,
                      tankType: item.tipoDeposito,
                      fkPeDeCuba: item.idConteudo,
                      volume: 0,
                      currentVolume: item.volumeConteudo,
                      lostVolume: 0,
                    });
                  }}
                  volume={item.volumeConteudo}
                  capacity={item.capacidadeDeposito}
                  isSelected={
                    selectedTank?.deposit === identificacaoDeposito && true
                  }
                />
              );
            }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center">
                <Text className="text-xl text-gray-500">
                  Nenhum Pé de Cuba disponível.
                </Text>
              </View>
            )}
          />
        </View>
        {/* #TODO!: Atualmente so da pra passar um mostro,
                    o software tem que ser capaz de passar uma lista
        */}
        <FormFooter
          nextHref={
            selectedTank
              ? {
                  pathname: "/(newWine)/selectTargetTank",
                  params: {
                    fkMostro: fkMostro,
                    fkPeDeCuba: selectedTank.fkPeDeCuba,
                    mostroVol: mostroVol,
                    mostroVolPerdido: mostroVolPerdido,
                    peDeCubaVol: selectedTank.volume,
                    peDeCubaVolPerdido: lostVolume,
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
