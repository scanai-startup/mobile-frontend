import AppHeader from "@/components/AppHeader";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaView from "@/components/SafeAreaView";

interface Item {
  id: number | string;
  lote: string;
  produto: string;
  data: string;
  volume: string;
  deposito: string;
  status: "andamento" | "concluido";
}

const data: Item[] = [
  {
    id: 1,
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
    status: "andamento",
  },
  {
    id: 2,
    lote: "24226F33",
    produto: "Vinho Branco",
    data: "20/01/25",
    volume: "2000 L",
    deposito: "103",
    status: "andamento",
  },
  {
    id: 3,
    lote: "67116B28",
    produto: "Cabernet Suave",
    data: "22/12/24",
    volume: "2000 L",
    deposito: "104",
    status: "concluido",
  },
  {
    id: 4,
    lote: "123456",
    produto: "Cabernet Suave",
    data: "22/12/24",
    volume: "2000 L",
    deposito: "104",
    status: "concluido",
  },
];

export default function EnvaseERotulagem() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.lote.toLowerCase().includes(search.toLowerCase()) ||
      item.produto.toLowerCase().includes(search.toLowerCase()) ||
      item.deposito.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <AppHeader
        variant="secondary"
        mainText="Envase e Rotulagem"
        showReturnButton
        returnHref={router.back}
      />

      {/* Lista de Processos */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProcessoCard {...item} />}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View>
            <Text className="text-lg font-bold text-gray-700 mb-4">
              Processos Ativos ({filteredData.length})
            </Text>

            {/* Barra de Pesquisa */}
            <View className="mb-4">
              <View className="flex flex-row items-center bg-[#DEDEDE] py-2 px-3 rounded-lg">
                <Search size="25px" color="#9A9A9A" />
                <TextInput
                  onChangeText={(value) => setSearch(value)}
                  className="text-lg ml-2 flex-1 py-0 h-12"
                  placeholder="Buscar por lote, produto ou depósito..."
                />
              </View>
            </View>
          </View>
        }
      />

      {/* Botão Flutuante */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-500 flex-row items-center px-6 py-4 rounded-full shadow-lg"
        onPress={() => router.push("/envaseERotulagem/newFilLab/")}
      >
        <AntDesign name="pluscircle" size={24} color="white" />
        <Text className="text-white font-semibold ml-2">Novo Processo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ProcessoCard(item: Item) {
  const statusColors = {
    andamento: { bg: "bg-green-100", text: "text-green-800" },
    concluido: { bg: "bg-gray-200", text: "text-gray-600" },
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-gray-800 mr-2">
            Lote {item.lote}
          </Text>
          <View
            className={`${statusColors[item.status].bg} px-2 py-1 rounded-full`}
          >
            <Text
              className={`${statusColors[item.status].text} text-xs font-medium`}
            >
              {item.status === "andamento" ? "Em andamento" : "Concluído"}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View className="h-px bg-gray-200 my-2" />
      <View className="space-y-2">
        <InfoRow label="Produto" value={item.produto} />
        <InfoRow label="Data" value={item.data} />
        <InfoRow label="Volume" value={item.volume} />
        <InfoRow label="Depósito" value={item.deposito} />
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-500">{label}</Text>
      <Text className="font-medium text-gray-700">{value}</Text>
    </View>
  );
}
