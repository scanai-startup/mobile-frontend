import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useTokenStore } from "@/store/userData";
import { Eye, EyeOff } from "lucide-react-native";
import { TransferControls } from "./_components/TransferControls";
import { CardTrasfega } from "./_components/CardTrasfega";
import { Deposito } from "@/types/IDeposito";
import { validateTransfer } from "@/utils/validateTransfer";
import { useDepositos } from "@/hooks/useDepositos";
import { useTankSelection } from "@/hooks/useTankSelection";
import React from "react";

export default function RealizarTrasfega() {
  const [volumeTrasfega, setVolumeTrasfega] = useState("");
  const [volumeChegada, setVolumeChegada] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showOriginInfo, setShowOriginInfo] = useState(true);

  const { tank, volume, contentId, capacity } = useLocalSearchParams();
  const { userId } = useTokenStore();
  const router = useRouter();

  const { data, loading } = useDepositos();
  const { selectedTank, handleSelectTank } = useTankSelection(data);

  const toggleOriginInfo = () => setShowOriginInfo(!showOriginInfo);

  const handleTransfer = async () => {
    try {
      setSubmitting(true);
      const token = await SecureStore.getItemAsync("user-token");

      const validationError = validateTransfer(
        Number(volumeTrasfega),
        Number(volumeChegada),
        selectedTank,
      );

      if (validationError) {
        Toast.show({
          type: "error",
          text1: validationError,
        });
        setSubmitting(false);
        return;
      }

      await apiInstance.post(
        "/depositomostro/register",
        {
          fkmostro: contentId,
          fkdeposito: selectedTank?.idDeposito,
          datainicio: new Date().toISOString().split("T")[0],
          fkfuncionario: userId,
          volumetrasfega: Number(volumeTrasfega),
          volumechegada: Number(volumeChegada),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Toast.show({
        type: "success",
        text1: "Trasfega realizada com sucesso!",
      });
      router.back();
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro na trasfega" });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item?.tipoDeposito &&
          item.conteudo !== "Pé de Cuba" &&
          `${item.tipoDeposito} ${item.numeroDeposito}` !== tank,
      ),
    [data, tank],
  );

  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Realizar Trasfega"
        returnHref={router.back}
      />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text className="text-4xl text-black mt-4 font-bold">
          Trasfega de Tanques
        </Text>
        <Text className="text-xl mt-2 mb-4">
          Selecione o tanque de destino para receber o conteúdo
        </Text>

        <View className="bg-blue-50 p-3 rounded-lg">
          <TouchableOpacity
            onPress={toggleOriginInfo}
            className="flex-row justify-between items-center"
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-blue-800">
                Origem: {tank}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-blue-600">
                {showOriginInfo ? "Visível" : "Oculto"}
              </Text>
              {showOriginInfo ? (
                <Eye size={20} color="#1e3a8a" />
              ) : (
                <EyeOff size={20} color="#1e3a8a" />
              )}
            </View>
          </TouchableOpacity>

          {showOriginInfo && (
            <>
              <View className="flex-row justify-between mt-2">
                <Text className="text-sm text-blue-700">Volume: {volume}L</Text>
                <Text className="text-sm text-blue-700">
                  Capacidade: {capacity}L
                </Text>
              </View>
              <View className="h-1 bg-blue-200 rounded-full mt-1">
                <View
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${(Number(volume) / Number(capacity)) * 100}%`,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }: { item: Deposito }) => {
          return (
            <CardTrasfega
              depositId={item.idDeposito}
              title={`${item.tipoDeposito} ${item.numeroDeposito}`}
              isAvailable={item.volumeConteudo < item.capacidadeDeposito}
              content={item.conteudo}
              capacity={item.capacidadeDeposito}
              volume={item.volumeConteudo}
              isSelected={selectedTank?.idDeposito === item.idDeposito}
              onSelect={handleSelectTank}
            />
          );
        }}
        keyExtractor={(item) => item.idDeposito.toString()}
        className="flex-1"
        style={{
          paddingHorizontal: 20,
        }}
      />

      {selectedTank && (
        <View className="p-5 bg-white border-t border-gray-200 gap-2">
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className="flex-row justify-between items-center"
          >
            <View>
              <Text className="text-lg font-bold text-black">
                Tanque Destino: {selectedTank.tipoDeposito}{" "}
                {selectedTank.numeroDeposito}
              </Text>
              <Text className="text-sm text-gray-600">
                Espaço disponível:{" "}
                {selectedTank.capacidadeDeposito - selectedTank.volumeConteudo}L
              </Text>
            </View>
            <Text className="text-2xl">{expanded ? "▼" : "▲"}</Text>
          </TouchableOpacity>

          {expanded && (
            <TransferControls
              submitting={submitting}
              setVolumeChegada={setVolumeChegada}
              setVolumeTrasfega={setVolumeTrasfega}
              volumeChegada={volumeChegada}
              volumeTrasfega={volumeTrasfega}
              onTransfer={handleTransfer}
              selectedTank={selectedTank}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
