import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useTokenStore } from "@/store/userData";
import { InputBox } from "@/components/Input";
import { CheckIcon } from "lucide-react-native";

//TODO: PARA TANQUES QUE NAO POSSUEM VOLUME
// MUDAR NOME VOLUME MAXIMO SAIDA, N TA LEGAL.

interface Deposito {
  idDeposito: number;
  tipoDeposito: string;
  numeroDeposito: string;
  volumeConteudo: number;
  capacidadeDeposito: number;
  conteudo: string;
  idConteudo: number;
}

export default function RealizarTrasfega() {
  const [selectedTank, setSelectedTank] = useState<any | null>(null);
  const [data, setData] = useState<Deposito[]>([]);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [volumeTrasfega, setVolumeTrasfega] = useState("");
  const [volumeChegada, setVolumeChegada] = useState("");
  const [expanded, setExpanded] = useState(true);
  const { tank, volume, contentId } = useLocalSearchParams();
  const { userId } = useTokenStore();

  useEffect(() => {
    getDepositos();
  }, []);

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

      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

  const handleSelectTank = (id: number) => {
    if (selectedTank?.idDeposito === id) {
      setSelectedTank(null);
    } else {
      const tank = data.find((t: Deposito) => t.idDeposito === id);
      if (tank) {
        setSelectedTank({
          idDeposito: tank.idDeposito,
          tipoDeposito: tank.tipoDeposito,
          numeroDeposito: tank.numeroDeposito,
          volumeConteudo: tank.volumeConteudo,
          capacidadeDeposito: tank.capacidadeDeposito,
          idConteudo: tank.idConteudo,
        });
        setVolumeTrasfega("");
        setVolumeChegada("");
      }
    }
  };

  const handleTransfer = async () => {
    try {
      setSubmitting(true);
      const token = await SecureStore.getItemAsync("user-token");

      console.log("TANQUE SELECIONADO: ", selectedTank);

      //Caso eu envie mais mostro do que o tanque cabe efetivamente
      if (
        Number(volumeTrasfega) >
        Number(selectedTank.capacidadeDeposito) -
          Number(selectedTank.volumeConteudo)
      ) {
        Toast.show({
          type: "error",
          text1: "O tanque atualmente não cabe essa capacidade",
        });
        return;
      }

      //Caso não seja preenchido nenhum dos tanques
      if (!volumeTrasfega || !volumeChegada) {
        Toast.show({ type: "error", text1: "Preencha todos os campos" });
        return;
      }

      //Caso queira mandar mais conteudo do que a capacidade do tanque
      if (Number(volumeTrasfega) > selectedTank.capacidadeDeposito) {
        Toast.show({
          type: "error",
          text1: "Volume enviado é maior do que a capacidade do Tanque.",
        });
        return;
      }

      //Caso esteja saindo mais conteúdo do que chegando
      if (Number(volumeTrasfega) < Number(volumeChegada)) {
        Toast.show({
          type: "error",
          text1: "Enviou mais mostro do que chegou. (Situação impossível)",
        });
        return;
      }

      console.log({
        fkmostro: contentId,
        fkdeposito: selectedTank?.idDeposito,
        datainicio: new Date().toISOString().split("T")[0],
        fkfuncionario: userId,
        volumetrasfega: Number(volumeTrasfega),
        volumechegada: Number(volumeChegada),
      });

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
          Selecione o tanque de origem para realizar a trasfega.
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }: { item: Deposito }) => {
          let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;

          if (!item || !item.tipoDeposito) return null;

          //Caso seja ele mesmo
          if (tank == identificacaoDeposito) return null;

          if (item.conteudo == "Pé de Cuba") return null;

          return (
            <Card
              depositId={item.idDeposito}
              title={identificacaoDeposito}
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
            <Text className="text-lg font-bold">
              Tanque {selectedTank.tipoDeposito} {selectedTank.numeroDeposito}
            </Text>
            <Text className="text-2xl">{expanded ? "▼" : "▲"}</Text>
          </TouchableOpacity>

          {expanded && (
            <View className="gap-1">
              <View className="flex-row gap-2">
                <Text className="text-blue-700">Volume (saída): {volume}L</Text>
                <Text className="text-red-500">
                  Volume (chegada):{" "}
                  {selectedTank.volumeConteudo
                    ? selectedTank.volumeConteudo
                    : "0"}
                  L
                </Text>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <InputBox
                    title="Volume a trasfegar"
                    keyboardType="number-pad"
                    onChangeText={(v) =>
                      v === "" || setVolumeTrasfega(v.replace(/[^0-9]/g, ""))
                    }
                    maxLength={5}
                  />
                </View>

                <View className="flex-1">
                  <InputBox
                    title="Volume de chegada"
                    keyboardType="number-pad"
                    onChangeText={(v) =>
                      v === "" || setVolumeChegada(v.replace(/[^0-9]/g, ""))
                    }
                    maxLength={5}
                  />
                </View>
              </View>

              <TouchableOpacity
                className="bg-green-600 p-4 rounded-lg items-center"
                onPress={handleTransfer}
                disabled={submitting || !volumeTrasfega || !volumeChegada}
              >
                <Text className="text-white font-bold">
                  {submitting ? "Processando..." : "Confirmar Trasfega"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

interface CardProps {
  depositId: number;
  title: string;
  isAvailable: boolean;
  density?: number;
  temperature?: number;
  pressure?: number | null;
  content?: string;
  contentId?: number;
  capacity: number;
  volume?: number;
  onSelect?: (depositId: number) => void;
  isSelected?: boolean;
}

export function Card({
  title = "ERROR",
  isAvailable,
  density = 0,
  temperature = 0,
  pressure = 0,
  depositId,
  content = "",
  contentId = 0,
  capacity,
  volume = 0,
  onSelect,
  isSelected = false,
}: CardProps) {
  const handlePress = () => {
    if (onSelect) onSelect(depositId);
  };

  const renderStatus = () => {
    const statusStyles =
      isAvailable == true
        ? { bg: "bg-green-200", text: "text-green-800", label: "Disponível" }
        : { bg: "bg-red-200", text: "text-red-800", label: "Ocupado" };

    return (
      <View className={`${statusStyles.bg} px-2 py-1 rounded-full`}>
        <Text className={`text-md ${statusStyles.text}`}>
          {statusStyles.label}
        </Text>
      </View>
    );
  };

  const renderError = () =>
    title === "ERROR" && (
      <Text className="text-base max-w-[200px]">
        Por favor contate imediatamente o suporte
      </Text>
    );

  const renderAnalysisDetails = () => {
    return (
      <>
        {renderDetailRow("Densidade:", density, " kg/m³")}
        {renderDetailRow("Temperatura:", temperature, " °C")}
        {pressure && renderDetailRow("Pressão:", pressure, " Pa")}
      </>
    );
  };

  const renderDetails = () => {
    return (
      <>
        <View className="w-full h-[1px] bg-neutral-250" />
        <View className="p-4">
          {renderDetailRow("Volume (em uso):", volume, " L")}
          {renderDetailRow("Capacidade:", capacity, " L")}
          {temperature ? renderAnalysisDetails() : null}
        </View>
      </>
    );
  };

  const renderDetailRow = (label: string, value: number, unit: string) => {
    return (
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-light">{label}</Text>
        <View className="flex-row justify-center items-end">
          <Text className="text-2xl font-semibold">{value}</Text>
          <Text className="text-base font-normal text-neutral-400">{unit}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ marginBottom: 16, width: "100%" }}
    >
      <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
        <View className="flex-row p-4 justify-between items-center">
          {title !== "ERROR" ? (
            <Text className="text-2xl font-bold">{title}</Text>
          ) : (
            renderError()
          )}
          {renderStatus()}
          {isSelected && (
            <TouchableOpacity onPress={handlePress}>
              <View className="bg-blue-500 rounded-full p-1">
                <CheckIcon size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {renderDetails()}
      </View>
    </TouchableOpacity>
  );
}
