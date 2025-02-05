import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function ProcessDepositCard() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/envaseERotulagem")}
      className="bg-white rounded-lg p-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-zinc-800">Processo Ativo</Text>
        <View className="bg-green-100 px-2 py-1 rounded-full">
          <Text className="text-green-800 text-xs font-medium">
            Em andamento
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4">
        <View>
          <Text className="text-zinc-500 text-sm">Produto</Text>
          <Text className="text-base">Vinho Tinto Reserva</Text>
        </View>
        <View>
          <Text className="text-zinc-500 text-sm">Lote</Text>
          <Text className="text-base">#245678</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
