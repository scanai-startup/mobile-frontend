import apiInstance from "@/api/apiInstance";
import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import FormFooter from "@/components/FormFooter";
import SafeAreaView from "@/components/SafeAreaView";
import SelectTankCard from "@/components/SelectTankCard";
import { useGetLocalTanksData } from "@/hooks/useGetLocalTanksData";
import { useToast } from "@/hooks/useToast";
import { useTokenStore } from "@/store/userData";
import { ILabel } from "@/types/ILabel";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function SelectTargetTank() {
  const [selectedTank, setSelectedTank] = useState<{
    id: number;
    deposit: string;
    type: string;
  } | null>(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [selectedLabel, setSelectedLabel] = useState(0);
  const toast = useToast();
  const {
    fkMostro,
    fkPeDeCuba,
    mostroVol,
    mostroVolPerdido,
    peDeCubaVol,
    peDeCubaVolPerdido,
  } = useLocalSearchParams();
  const { userId } = useTokenStore();
  const { data } = useGetLocalTanksData();

  async function getAllLabels() {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const res = await apiInstance.get("/rotulo/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLabels(res.data);
    } catch (err) {
      console.error("Erro ao buscar rótulos no banco: ", err);
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
    const token = await SecureStore.getItemAsync("user-token");
    try {
      const payload = {
        depositoId: selectedTank!.id,
        dataFimFermentacao: new Date().toISOString(),
        pedecubaId: Number(fkPeDeCuba),
        pedecubaVolumePerda: Number(peDeCubaVolPerdido),
        rotuloId: selectedLabel,
        mostroId: Number(fkMostro),
        volumeMostro: Number(mostroVol),
        volumeMostroPerda: Number(mostroVolPerdido),
        funcionarioId: userId,
      };
      console.log(payload);
      await apiInstance.post("/vinculodepositovinho", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        heading: "Sucesso",
        message: "Novo vinho cadastrado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao vincular depósito:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAllLabels();
      return;
    }, []),
  );

  function handleDialogClose() {
    setIsDialogOpen(false);
    setSelectedTank(null);
    setIsNextButtonEnabled(false);
    setSelectedLabel(0);
  }

  return (
    <>
      <SafeAreaView>
        <CenteredModal
          isDialogOpen={isDialogOpen}
          handleDialogClose={() => handleDialogClose()}
        >
          <View className="px-6 py-10 bg-white rounded-xl">
            <Text className="text-2xl text-black font-bold">
              Tanque selecionado
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Selecione o rótulo do vinho.
            </Text>
            <Dropdown
              style={{
                height: 50,
                borderColor: "gray",
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              data={labels}
              labelField="nome"
              valueField="id"
              onChange={(i) => setSelectedLabel(i.id)}
              placeholder="Selecione um rótulo"
              searchField="nome"
              containerStyle={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              selectedTextStyle={{ fontWeight: "800" }}
              activeColor="#f0f0f0"
              value={selectedLabel === 0 ? 0 : selectedLabel}
            />
            <DefaultButton
              title="Continuar"
              className="mt-4"
              onPress={() => setIsDialogOpen(false)}
              disabled={selectedLabel === 0 ? true : false}
            />
          </View>
        </CenteredModal>
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
            data={data.filter((t) => t.conteudo === null)}
            keyExtractor={(item) => item.idDeposito.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return (
                <SelectTankCard
                  title={identificacaoDeposito}
                  setIsSelected={() => {
                    if (isDialogOpen && selectedLabel) {
                      setIsDialogOpen(true);
                      return;
                    }
                    setSelectedTank((prev) => {
                      if (prev) {
                        prev.id !== Number(item.idDeposito) &&
                          setSelectedLabel(0);
                      }
                      return {
                        id: Number(item.idDeposito),
                        deposit: item.numeroDeposito,
                        type: item.tipoDeposito,
                      };
                    });
                    setIsNextButtonEnabled(true);
                    setIsDialogOpen(true);
                  }}
                  capacity={item.capacidadeDeposito}
                  volume={item.volumeConteudo}
                  isSelected={
                    selectedTank && selectedTank.id === Number(item.idDeposito)
                      ? true
                      : false
                  }
                  hasProblem={
                    item.capacidadeDeposito <
                      Number(mostroVol) + Number(peDeCubaVol) && "noCapacity"
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
