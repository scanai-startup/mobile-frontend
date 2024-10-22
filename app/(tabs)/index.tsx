import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import {
  Boxes,
  Cylinder,
  Grape,
  LucideBox,
  Truck,
  Wine,
} from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const activityListItems = [
    {
      name: "Gestão de tanques",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tabs)/tankControl",
    },
    {
      name: "Gestão de remessas",
      icon: <Truck size="28px" color="#000000" />,
      route: "/(tabs)/shipment",
    },
    {
      name: "Envase e Rotulagem",
      icon: <Wine size="28px" color="#000000" />,
      route: "/(tankControl)/tank/envaseERotulagem/envase",
    },
    {
      name: "Controle de estoque",
      icon: <LucideBox size="28px" color="#000000" />,
      route: "",
    },
  ];
  return (
    <>
      <CustomStatusBar backgroundColor="#18181b" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader mainText="Olá, Nome." />
        <View>
          <View>
            <Text className="text-zinc-950 font-bold text-2xl ml-7 mb-4">
              Atividades
            </Text>
            <FlatList
              data={activityListItems}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <ActivityCard
                  title={item.name}
                  icon={item.icon}
                  route={item.route}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 25,
                gap: 10,
              }}
            />
          </View>
        </View>
        <View className="px-7 mt-10">
          <Text className="text-zinc-950 font-bold text-2xl mb-4">
            Relatório mais recente
          </Text>
          <View className="bg-white rounded-lg px-3 pt-3 pb-6 gap-2">
            <Text className="text-[#575757] text-md">
              Relatório final de saída
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-black text-2xl font-bold">Nº 14072024</Text>
              <TouchableOpacity>
                <Text className="text-[#ED2860] text-md font-bold">
                  Exportar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
