import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import { Card } from "@/components/TankControlCard";
import ITankData from "@/types/ITankData";
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TankControl() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<ITankData[]>([]);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((e) => {
    return (
      e.tipoDeposito.toLowerCase().includes(search.toLowerCase()) ||
      e.numeroDeposito.toLowerCase().includes(search.toLowerCase())
    );
  });

  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getDepositos();
      return;
    }, []),
  );

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
      // console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

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
            <Button
              placeholder="Filtrar"
              onPress={() => setDrawerVisible(true)}
              buttonClassname="bg-blue-500 ml-2"
            />
          </View>
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
          <FilterDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function FilterDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: any;
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View className="bg-white p-4 rounded-t-lg">
          <Text className="text-xl font-bold mb-4">Filtros</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
