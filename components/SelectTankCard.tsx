import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  title: string;
  density?: number;
  temperature?: number;
  pressure?: number | null;
  isSelected: boolean;
  setIsSelected: () => void;
  volume: number;
  capacity: number;
}

export default function SelectTankCard({
  title,
  density = 0,
  temperature = 0,
  pressure = 0,
  isSelected = false,
  setIsSelected,
  volume,
  capacity,
}: CardProps) {
  return (
    <View style={{ marginBottom: 16, width: "100%" }}>
      <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
        <View className="flex-row p-4 justify-between items-center">
          <Text className="text-2xl font-bold">{title}</Text>
          <TouchableOpacity
            onPress={() => setIsSelected()}
            className={
              "border rounded-md px-2 py-1 border-blue-500" +
              (isSelected ? " bg-blue-500" : "")
            }
            disabled={isSelected}
          >
            <Text className={isSelected ? "text-white" : "text-blue-500"}>
              {isSelected ? "Selecionado" : "Selecionar"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[1px] bg-neutral-250"></View>
        <View className="p-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-light">Volume (em uso):</Text>
            <View className="flex-row justify-center items-end">
              <Text className="text-2xl font-semibold">{volume}</Text>
              <Text className="text-base font-normal text-neutral-400"> L</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-light">Capacidade:</Text>
            <View className="flex-row justify-center items-end">
              <Text className="text-2xl font-semibold">{capacity}</Text>
              <Text className="text-base font-normal text-neutral-400"> L</Text>
            </View>
          </View>
          {temperature ? (
            <>
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-light">Densidade:</Text>
                <View className="flex-row justify-center items-end">
                  <Text className="text-2xl font-semibold">{density} </Text>
                  <Text className="text-base font-normal text-neutral-400">
                    kg/m³
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xl font-light">Temperatura:</Text>
                <View className="flex-row justify-center items-end">
                  <Text className="text-2xl font-semibold">{temperature} </Text>
                  <Text className="text-base font-normal text-neutral-400">
                    °C
                  </Text>
                </View>
              </View>
              {pressure && (
                <View className="flex-row justify-between">
                  <Text className="text-xl font-light">Pressão:</Text>
                  <View className="flex-row justify-center items-end">
                    <Text className="text-2xl font-semibold">{pressure} </Text>
                    <Text className="text-base font-normal text-neutral-400">
                      Pa
                    </Text>
                  </View>
                </View>
              )}
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}
