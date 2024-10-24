import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { useLocalSearchParams } from "expo-router";
import {
  AlertCircle,
  ArrowRightLeft,
  Cylinder,
  Grape,
  GrapeIcon,
  Microscope,
  Milk,
} from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function EmptyTank() {
  const { tank } = useLocalSearchParams();

  const activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size={28} color="#000000" />,
      route: "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]",
      type: "tank",
    },
    {
      name: "Análises de depósito",
      icon: <Microscope size={28} color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]",
      type: "tank",
    },
    {
      name: "Envase e rotulagem",
      icon: <Milk size={28} color="#000000" />,
      route: "/(tankControl)/tank/envaseERotulagem/[envase]",
      type: "tank",
    },
    {
      name: "Adicionar Vinho Base",
      icon: <GrapeIcon size={28} color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      type: "tank",
      param: tank,
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size={28} color="#000000" />,
      route: "/(tankControl)/tank/realizarTrasfega/[trasfega]",
      type: "tank",
      param: tank,
    },
    {
      name: "Adicionar pé de Cuba",
      icon: <Grape size={28} color="#000000" />,
      route: "",
    },
  ];

  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText={`${tank}`}
        returnHref="/(tabs)/tankControl"
      />
      <View>
        <Text className="text-zinc-950 font-bold text-2xl ml-7 mb-4">
          Ações
        </Text>
        <FlatList
          data={activityListItems}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ActivityCard
              title={item.name}
              icon={item.icon}
              route={item.route}
              type={item.type}
              param={tank}
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
      <View className="mt-20 justify-center items-center">
        <AlertCircle size={48} color="gray" />
        <Text className="text-gray-600 text-lg font-semibold mt-4">
          Não há nenhum conteúdo neste tanque.
        </Text>
      </View>
    </SafeAreaView>
  );
}
