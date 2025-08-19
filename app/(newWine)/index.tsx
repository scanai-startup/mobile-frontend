import { Button } from "@/components/atoms/Button";
import CenteredModal from "@/components/CenteredModal";
import FormFooter from "@/components/FormFooter";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import { useFetchDepositos } from "@/hooks/useFetchDepositos";
import { useNewWineTankSelect } from "@/hooks/useNewWineTankSelect";
import { Search } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function SelectMostroView() {
  const { data, loading } = useFetchDepositos();
  const {
    handleSelectTank,
    onDialogClose,
    handleContinueButton,
    selectedTank,
    isDialogOpen,
    isNextButtonEnabled,
    volume,
    setVolume,
    setIsDialogOpen,
    lostVolume,
    setLostVolume,
    isDialogConfirmButtonEnabled,
  } = useNewWineTankSelect();

  return (
    <>
      <SafeAreaView>
        <CenteredModal
          isDialogOpen={isDialogOpen}
          handleDialogClose={() => onDialogClose()}
        >
          <View className="px-6 py-10 bg-white rounded-xl">
            <Text className="text-2xl text-black font-bold">
              Tanque selecionado: {selectedTank?.tankType}{" "}
              {selectedTank?.deposit}
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
                title="Volume a ser retirado"
                auxText="L"
                onChangeText={(v) => setVolume(v)}
                keyboardType="number-pad"
                value={volume}
              />
              <InputBox
                placeholder="20"
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
              Selecionar mostro
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o mostro que deseja utilizar na criação do vinho.
            </Text>
          </View>
          <InputBox
            icon={Search}
            placeholder="Pesquise pelo tanque"
            className="mb-4"
          />
          <FlatList
            data={data.filter((t) => t.conteudo === "Mostro")}
            keyExtractor={(item) => item.idDeposito.toString()}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return item.temperatura ? (
                <SelectTankCard
                  title={identificacaoDeposito}
                  density={item.densidade}
                  temperature={item.temperatura}
                  pressure={item.pressao ? item.pressao : null}
                  setIsSelected={() =>
                    handleSelectTank({
                      id: Number(item.idDeposito),
                      deposit: item.numeroDeposito,
                      tankType: item.tipoDeposito,
                      fkMostro: item.idConteudo,
                      currentVolume: item.volumeConteudo,
                      volume: 0,
                      lostVolume: 0,
                    })
                  }
                  isSelected={
                    selectedTank?.deposit === item.numeroDeposito && true
                  }
                  volume={item.volumeConteudo}
                  capacity={item.capacidadeDeposito}
                />
              ) : (
                <SelectTankCard
                  title={identificacaoDeposito}
                  setIsSelected={() => {
                    if (selectedTank?.id === Number(item.idDeposito)) {
                      setIsDialogOpen(true);
                      return;
                    }
                    handleSelectTank({
                      id: Number(item.idDeposito),
                      deposit: item.numeroDeposito,
                      tankType: item.tipoDeposito,
                      fkMostro: item.idConteudo,
                      currentVolume: item.volumeConteudo,
                      volume: 0,
                      lostVolume: 0,
                    });
                  }}
                  isSelected={
                    selectedTank?.deposit === item.numeroDeposito && true
                  }
                  volume={item.volumeConteudo}
                  capacity={item.capacidadeDeposito}
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
                    mostroVolPerdido: selectedTank.lostVolume,
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
