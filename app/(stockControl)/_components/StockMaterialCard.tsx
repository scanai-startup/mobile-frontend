import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IStockMaterialCardProps {
  title: string;
  amount: number;
  lastSupplier: string;
  lastBatch: string;
  lastLoss: number;
  handleAddButton: () => void;
}

export default function StockMaterialCard({
  title,
  amount,
  lastSupplier,
  lastBatch,
  lastLoss,
  handleAddButton,
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
          <TouchableOpacity onPress={handleAddButton}>
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
