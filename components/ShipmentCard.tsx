import { ShipmentCardType } from "@/types/ShipmentCardType";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ShipmentCardP {
  shipment: ShipmentCardType;
  variant?: string;
}

export default function ShipmentCard({
  shipment,
  variant = "primary",
}: ShipmentCardP) {
  const [selectedCard, setSelectedCard] = useState(false);
  return (
    <View className="bg-white rounded-xl border border-neutral-250">
      <View className="flex-row justify-between items-center p-5">
        <View className="flex-row gap-1 items-center">
          <Text className="text-2xl font-semibold" style={{ color: "#171717" }}>
            {shipment.number}
          </Text>
          <Text className="text-base text-neutral-400">
            {shipment.ticket}° Talão
          </Text>
        </View>
        {variant === "primary" ? (
          <TouchableOpacity>
            <Text className="text-blue-500">Detalhes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setSelectedCard(!selectedCard)}
            className={
              "border rounded-md px-2 py-1 border-blue-500" +
              (selectedCard ? " bg-blue-500" : "")
            }
          >
            <Text className={selectedCard ? "text-white" : "text-blue-500"}>
              {selectedCard ? "Selecionado" : "Selecionar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 border-b border-neutral-250"></View>
      <View className="flex-col p-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-neutral-900">Identificador</Text>
          <Text className="text-xl font-semibold text-neutral-900">
            {shipment.id}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-neutral-900">Data recebido</Text>
          <Text className="text-xl font-semibold text-neutral-900">
            {shipment.date}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-neutral-900">Casta</Text>
          <Text className="text-xl font-semibold text-neutral-900">
            {shipment.casta}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-neutral-900">Tipo</Text>
          <Text className="text-xl font-semibold text-neutral-900">
            {shipment.type}
          </Text>
        </View>
      </View>
    </View>
  );
}
