import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import ShipmentCard from "@/components/ShipmentCard";
import { useShipmentStore } from "@/store/remessasContext";
import { useTokenStore } from "@/features/auth/store/userStore";
import {
  Href,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

export default function BaseWine() {
  const router = useRouter();
  const { tank, depositId, capacity } = useLocalSearchParams();
  const [data, setData] = useState();
  const selectedShipments = useShipmentStore(
    (state) => state.selectedShipments,
  );
  const { clearShipments } = useShipmentStore();
  const { userId } = useTokenStore();

  const [totalVolume, setTotalVolume] = useState(0);
  const [isVolumeInputOpen, setIsVolumeInputOpen] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getRemessas();
      return;
    }, []),
  );

  const getRemessas = async () => {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const response = await apiInstance.get("/uva/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

  const handleSubmit = async () => {
    if (totalVolume > Number(capacity)) {
      alert("ERRO: O volume total excede a capacidade do tanque.");
      return;
    }

    const token = await SecureStore.getItemAsync("user-token");

    const data = {
      remessaUvaIdList: selectedShipments,
      depositoId: depositId,
      funcionarioId: userId,
      volume: totalVolume,
    };

    try {
      const res = await apiInstance.post("/vinculodepositoremessas", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = res.data;
      clearShipments();
      router.navigate({
        pathname: "/tank/[tank]",
        params: {
          tank: tank as string,
          depositId: responseData.depositoId,
          content: "Mostro",
          contentId: responseData.mostroId,
        },
      });
      console.log("SUCESS: ", responseData);
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  const href: Href = {
    pathname: "/tank/[tank]",
    params: { tank: tank as string },
  };

  const toggleVolumeInput = () => {
    if (selectedShipments.length > 0) {
      setIsVolumeInputOpen(!isVolumeInputOpen);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, gap: 20 }}
      edges={["right", "bottom", "left"]}
    >
      <AppHeader
        variant="secondary"
        mainText={tank as string}
        showReturnButton
        returnHref={router.back}
      />

      <View className="flex-1 px-7 pb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-zinc-950 font-bold text-3xl">
            Associar Remessas
          </Text>
          {selectedShipments.length > 0 && (
            <TouchableOpacity onPress={toggleVolumeInput}>
              {isVolumeInputOpen ? (
                <ChevronUp color="black" size={24} />
              ) : (
                <ChevronDown color="black" size={24} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {isVolumeInputOpen && selectedShipments.length > 0 && (
          <View className="px-6 py-4 bg-white rounded-md">
            <Text className="text-2xl text-black font-bold mb-2">
              Volume para {selectedShipments.length} remessas
            </Text>
            <InputBox
              placeholder="200"
              title="Volume Total"
              auxText="L"
              onChangeText={(v) => setTotalVolume(Number(v))}
              keyboardType="number-pad"
            />
          </View>
        )}

        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ShipmentCard shipment={item} variant="secondary" />
          )}
          contentContainerStyle={{
            paddingVertical: 10,
            gap: 10,
          }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-center mb-4">
                Não existe nenhum vinho base cadastrado (remessa).
              </Text>
              <Text className="text-4xl">🍷</Text>
            </View>
          }
        />

        <View className="mt-4">
          <DefaultButton
            disabled={selectedShipments.length == 0}
            title="Concluir"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
