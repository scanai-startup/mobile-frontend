import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import ShipmentCard from "@/components/ShipmentCard";
import { ShipmentCardType } from "@/types/ShipmentCardType";
import { Link } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function Shipment() {
  const data: ShipmentCardType[] = [
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
            renderItem={({ item }) => <ShipmentCard shipment={item} />}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 160,
              gap: 10,
            }}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500 text-center mb-4">
                  Não há remessas cadastradas ainda
                </Text>
                <Text className="text-4xl">🚗</Text>
              </View>
            }
          ></FlatList>
        </View>
      </SafeAreaView>
    </>
  );
}
