import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { useShipmentStore } from "@/store/remessasContext";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { AlertCircle, ArrowRightLeft, Grape, Truck } from "lucide-react-native";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

export default function EmptyTank() {
  const { tank, depositId, capacity } = useLocalSearchParams();
  const router = useRouter();

  const activityListItems = [
    {
      name: "Adicionar Remessa",
      icon: <Truck size={28} color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      param: [
        {
          tank: tank as string,
          depositId: Number(depositId),
          capacity: Number(capacity),
        },
      ],
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size={28} color="#000000" />,
      route: "/(tankControl)/tank/realizarTrasfega/[trasfega]",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Iniciar pé de Cuba",
      icon: <Grape size={28} color="#000000" />,
      route: "/(tankControl)/tank/addPeDeCuba/[addPeDeCuba]",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
  ];

  const { clearShipments } = useShipmentStore();

  useFocusEffect(
    useCallback(() => {
      clearShipments();
      return;
    }, []),
  );

  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText={`${tank}`}
        returnHref={() => router.dismissTo("/(tabs)/tankControl")}
      />
      <View>
        <Text className="text-zinc-950 font-bold text-2xl ml-7 mb-4">
          Ações
        </Text>
        <FlatList
          data={activityListItems}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <ActivityCard
                title={item.name}
                icon={item.icon}
                route={item.route}
                //type={item.type}
                param={item.param}
              />
            );
          }}
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
