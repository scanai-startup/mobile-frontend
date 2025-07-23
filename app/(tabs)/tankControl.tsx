import AppHeader from "@/components/AppHeader";
import FilterDrawer from "@/components/molecules/FilterDrawer";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import { Card } from "@/components/TankControlCard";
import { getAllDepositsWithInformation } from "@/features/deposito/services/get-all-deposits";
import IDepositDetailedData from "@/features/deposito/types/IDepositDetailedData";
import { useToast } from "@/hooks/useToast";
import { useFocusEffect, useRouter } from "expo-router";

import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TankControl() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<IDepositDetailedData[]>([]);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((e) => {
    return (
      e.tipoDeposito.toLowerCase().includes(search.toLowerCase()) ||
      e.numeroDeposito.toLowerCase().includes(search.toLowerCase())
    );
  });

  async function fetchDeposits() {
    const deposits = await getAllDepositsWithInformation({ toast });
    setData(deposits);
  }

  useFocusEffect(
    useCallback(() => {
      fetchDeposits();
      return;
    }, []),
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppHeader
          showReturnButton
          variant="secondary"
          mainText="Controle de tanques"
          returnHref={"/(tabs)/"}
        />
        <View className="px-7 flex-1">
          <View>
            <Text className="text-4xl text-black font-bold">
              Controle de tanques.
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Lista de todas as informações acessíveis no momento.
            </Text>
          </View>
          <View className="flex flex-row items-center w-full mb-4">
            <View className="flex flex-row items-center bg-[#DEDEDE] py-0 px-3 rounded-lg flex-1">
              <Search size="25px" color="#9A9A9A" />
              <TextInput
                onChangeText={(value) => setSearch(value)}
                className="text-base ml-2 flex-1 py-0 h-14"
                placeholder="Digite o que deseja buscar..."
              />
            </View>
            <TouchableOpacity
              onPress={() => setDrawerVisible(true)}
              style={{
                backgroundColor: "#007BFF",
                paddingVertical: 14,
                paddingHorizontal: 15,
                borderRadius: 5,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "semibold" }}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
          <FilterDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.idDeposito}
            ListEmptyComponent={<EmptyTankList />}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return item.conteudo === "Mostro" || item.conteudo === "Vinho" ? (
                <>
                  {/* Tanque com Mostro/Vinho */}
                  <Card
                    depositId={Number(item.idDeposito)}
                    title={identificacaoDeposito}
                    isAvailable={false}
                    content={item.conteudo}
                    contentId={item.idConteudo}
                    density={item.densidade}
                    temperature={item.temperatura}
                    pressure={item.pressao ? item.pressao : null}
                    capacity={item.capacidadeDeposito}
                    volume={item.volumeConteudo}
                  />
                </>
              ) : item.conteudo == "Pé de Cuba" ? (
                <>
                  {/* Tanque com pé de cuba */}
                  <Card
                    depositId={Number(item.idDeposito)}
                    title={identificacaoDeposito}
                    isAvailable={false}
                    content={item.conteudo}
                    contentId={item.idConteudo}
                    capacity={item.capacidadeDeposito}
                    volume={item.volumeConteudo}
                  />
                </>
              ) : (
                <>
                  {/* Conteúdo Vazio */}
                  <Card
                    depositId={Number(item.idDeposito)}
                    title={identificacaoDeposito}
                    isAvailable={true}
                    capacity={item.capacidadeDeposito}
                  />
                </>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function EmptyTankList() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-500 text-center mb-4">
        Não há nenhum tanque cadastrado ainda.
      </Text>
    </View>
  );
}
