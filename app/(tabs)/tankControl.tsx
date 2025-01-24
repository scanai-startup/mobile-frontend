import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { Card } from "@/components/TankControlCard";
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
  const [data, setData] = useState<any[]>([]);
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
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppHeader
          showReturnButton
          variant="secondary"
          mainText="Controle de tanques"
          returnHref={router.back}
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
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.idDeposito}
            renderItem={({ item }) => {
              let identificacaoDeposito = `${item.tipoDeposito} ${item.numeroDeposito}`;
              return item.conteudo == "Mostro" ? (
                <>
                  {/* Tanque com Mostro/Vinho */}
                  <Card
                    depositId={item.idDeposito}
                    title={identificacaoDeposito}
                    isAvailable={false}
                    content={item.conteudo}
                    contentId={item.idConteudo}
                    density={item.densidade}
                    temperature={item.temperatura}
                    pressure={item.pressao ? item.pressao : null}
                  />
                </>
              ) : item.conteudo == "Pé de Cuba" ? (
                <>
                  {/* Tanque com pé de cuba */}
                  <Card
                    depositId={item.idDeposito}
                    title={identificacaoDeposito}
                    isAvailable={false}
                    content={item.conteudo}
                    contentId={item.idConteudo}
                  />
                </>
              ) : (
                <>
                  {/* Conteúdo Vazio */}
                  <Card
                    depositId={item.idDeposito}
                    title={identificacaoDeposito}
                    isAvailable={true}
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
