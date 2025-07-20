import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import { ProcessDepositCard } from "@/components/ProcessDepositCard";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import { useTokenStore } from "@/features/auth/store/userStore";
import { Cylinder, LucideBox, Tag, Truck, Wine } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { subject } = useTokenStore();

  const activityListItems = [
    {
      name: "Gestão de tanques",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tabs)/tankControl",
    },
    {
      name: "Criar vinho",
      icon: <Wine size="28px" color="#000000" />,
      route: "/(newWine)/",
    },
    {
      name: "Gestão de remessas",
      icon: <Truck size="28px" color="#000000" />,
      route: "/(tabs)/shipment",
    },
    {
      name: "Envase e Rotulagem",
      icon: <Tag size="28px" color="#000000" />,
      route: "/envaseERotulagem/envase",
    },
    {
      name: "Controle de estoque",
      icon: <LucideBox size="28px" color="#000000" />,
      route: "/(tabs)/stock",
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <SafeAreaView>
        <AppHeader mainText={`Olá, ${subject}`} />
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
        <View className="px-7">
          <Text className="text-zinc-950 font-bold text-2xl mb-4">
            Envase e rotulagem de produtos
          </Text>
          <ProcessDepositCard />
        </View>
        <View className="px-7">
          <Text className="text-zinc-950 font-bold text-2xl mb-4">
            Relatório mais recente
          </Text>
          <View className="bg-white rounded-lg px-3 pb-6 gap-2">
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
