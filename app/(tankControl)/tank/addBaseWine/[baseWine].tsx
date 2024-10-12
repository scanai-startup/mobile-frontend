import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import ShipmentCard from "@/components/ShipmentCard";
import { ShipmentCardType } from "@/types/ShipmentCardType";
import { Href, Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function BaseWine() {
  const { tank } = useLocalSearchParams();

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
  const href: Href = {
    pathname: "/tank/[tank]",
    params: { tank: tank as string },
  };
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText={tank as string}
          showReturnButton
        />
        <View className="flex-1 px-7 pb-4">
          <Text className="text-zinc-950 font-bold text-3xl mb-1">
            Associar Remessas
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ShipmentCard shipment={item} variant="secondary" />
            )}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 10,
            }}
          ></FlatList>
          <View className="mt-4">
            <Link href={href} asChild>
              <DefaultButton title="Concluir" />
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
