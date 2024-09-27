import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { CirclePlus } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface ShipmentCards {
  number: number;
  ticket: number;
  id: number;
  date: string;
  casta: string;
  type: string;
}

export default function Shipment() {
  const data: ShipmentCards[] = [
    {
      number: 101,
      ticket: 1,
      id: 12345678,
      date: "21/10/2022",
      casta: "Airen",
      type: "Vinho branco",
    },
    {
      number: 102,
      ticket: 2,
      id: 87654321,
      date: "22/10/2022",
      casta: "Merlot",
      type: "Vinho tinto",
    },
    {
      number: 103,
      ticket: 3,
      id: 98765432,
      date: "23/10/2022",
      casta: "Chardonnay",
      type: "Vinho branco",
    },
    {
      number: 104,
      ticket: 4,
      id: 56789012,
      date: "24/10/2022",
      casta: "Cabernet Sauvignon",
      type: "Vinho tinto",
    },
    {
      number: 105,
      ticket: 5,
      id: 34567890,
      date: "25/10/2022",
      casta: "Pinot Noir",
      type: "Vinho tinto",
    },
    {
      number: 106,
      ticket: 6,
      id: 90123456,
      date: "26/10/2022",
      casta: "Sauvignon Blanc",
      type: "Vinho branco",
    },
  ];
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText="Gestão de remessas"
          showReturnButton
        />
        <View className="px-7">
          <TouchableOpacity className="flex flex-row justify-center items-center bg-blue-500 rounded-xl py-3 gap-2">
            <CirclePlus size="24px" color="white" />
            <Text className="text-white font-semibold">
              ADICIONAR NOVA REMESSA
            </Text>
          </TouchableOpacity>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl border border-neutral-250">
                <View className="flex-row justify-between items-center p-5">
                  <View className="flex-row gap-1 items-center">
                    <Text
                      className="text-2xl font-semibold"
                      style={{ color: "#171717" }}
                    >
                      {item.number}
                    </Text>
                    <Text className="text-base text-neutral-400">
                      {item.ticket}° Talão
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-blue-500">Detalhes</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1 border-b border-neutral-250"></View>
                <View className="flex-col p-5">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-neutral-900">
                      Identificador
                    </Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                      {item.id}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-neutral-900">
                      Data recebido
                    </Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                      {item.date}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-neutral-900">Casta</Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                      {item.casta}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-neutral-900">Tipo</Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 140,
              gap: 10,
            }}
          ></FlatList>
        </View>
      </SafeAreaView>
    </>
  );
}
