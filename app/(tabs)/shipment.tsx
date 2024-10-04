import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { Link } from "expo-router";
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
          <Link
            href="/(grapeReception)?nextHref=(grapeReception)/grapeReceptionP2&prevHref=/"
            asChild
          >
            <DefaultButton
              title="ADICIONAR NOVA REMESSA"
              icon={<CirclePlus color="white" />}
            />
          </Link>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ShipmentCard {...item} />}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 160,
              gap: 10,
            }}
          ></FlatList>
        </View>
      </SafeAreaView>
    </>
  );
}
export function ShipmentCard(shipment: ShipmentCards) {
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
        <TouchableOpacity>
          <Text className="text-blue-500">Detalhes</Text>
        </TouchableOpacity>
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
