import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { CirclePlus, Search } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function StockItemsList() {
  const boilerplate = [
    {
      title: "rotulo rosé",
      amount: 68360,
      lastSupplier: "Forn. 1",
      lastBatch: "03205991234",
      lastLoss: 185,
    },
    {
      title: "vinho tinto",
      amount: 45230,
      lastSupplier: "Forn. 2",
      lastBatch: "03205991235",
      lastLoss: 120,
    },
    {
      title: "vinho branco",
      amount: 78900,
      lastSupplier: "Forn. 3",
      lastBatch: "03205991236",
      lastLoss: 200,
    },
    {
      title: "espumante",
      amount: 12345,
      lastSupplier: "Forn. 4",
      lastBatch: "03205991237",
      lastLoss: 50,
    },
  ];
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader mainText="Estoque" variant="secondary" showReturnButton />
        <View className="px-7 flex-1 gap-6">
          <DefaultButton
            title="CRIAR NOVO MATERIAL"
            icon={<CirclePlus color="white" />}
            onPress={() => {
              // open dialog
            }}
          />
          <View className="flex flex-row justify-between">
            <View className="flex-1 flex-row items-center bg-[#DEDEDE] rounded-lg h-14 px-3">
              <Search size="25px" color="#9A9A9A" />
              <TextInput
                onChangeText={(value) => {
                  // filter handling
                }}
                className="text-base ml-2"
                placeholder="Digite o que deseja buscar..."
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              className="bg-[#007BFF] justify-center px-4 rounded-md ml-3"
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "semibold" }}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={boilerplate}
            keyExtractor={(i) => i.title}
            renderItem={({ item }) => {
              return <StockMaterialCard {...item} />;
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

interface IStockMaterialCardProps {
  title: string;
  amount: number;
  lastSupplier: string;
  lastBatch: string;
  lastLoss: number;
}

function StockMaterialCard({
  title,
  amount,
  lastSupplier,
  lastBatch,
  lastLoss,
}: IStockMaterialCardProps) {
  function showCardDetail(title: string, data: string | number) {
    return (
      <View className="flex-row flex-1 justify-between">
        <Text className="text-xl font-light">{title}</Text>
        <Text className="text-2xl font-semibold">{data}</Text>
      </View>
    );
  }
  return (
    <View className="bg-white rounded-lg shadow flex-col border border-neutral-250 mb-4">
      <View className="flex-row p-4 justify-between items-center">
        <View className="flex-row flex-1 justify-between items-center">
          <Text className="text-2xl font-semibold">{title.toUpperCase()}</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full h-[1px] bg-neutral-250" />
      <View className="p-4">
        {showCardDetail("Quantidade", amount)}
        {showCardDetail("Últ. fornecedor", lastSupplier)}
        {showCardDetail("Últ. lote", lastBatch)}
        {showCardDetail("Últ. perca", lastLoss * -1)}
      </View>
    </View>
  );
}
