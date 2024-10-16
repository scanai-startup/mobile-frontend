import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import { useLocalSearchParams } from "expo-router";
import {
  ArrowRightLeft,
  Boxes,
  ChevronDown,
  Cylinder,
  Grape,
  Microscope,
  Milk,
} from "lucide-react-native";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Tank() {
  const { tank } = useLocalSearchParams();

  const activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]",
      type: "tank",
      param: tank,
    },
    {
      name: "Análises de deposito",
      icon: <Microscope size="28px" color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]",
      type: "tank",
      param: tank,
    },
    {
      name: "Envase e rotulagem",
      icon: <Milk size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
    {
      name: "Adicionar Vinho Base",
      icon: <Grape size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      type: "tank",
      param: tank,
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
    {
      name: "Adicionar pé de Cuba",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <AppHeader showReturnButton variant="secondary" mainText={`${tank}`} />
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
              param={item.param}
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
      <View className="mt-4">
        <Text className="text-2xl">Remessas associadas</Text>
        <Card />
      </View>
      <CardNotEmpty />
    </SafeAreaView>
  );
}

const Card = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>Última remessa associada</Text>
      <View style={styles.row}>
        <Text style={styles.shipment}>101 - 2º Talão</Text>
        <Text style={styles.details}>Detalhes</Text>
      </View>
    </View>
  );
};

const CardNotEmpty = () => {
  return (
    <View>
      <Text className="text-2xl font-medium">Resumo da última análise</Text>
      <View className="bg-white" style={styles.card}>
        <Text className="text-xl text-black font-medium">09/08/24</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Densidade</Text>
          <View style={styles.bottomAligned}>
            <Text className="text-xl">996</Text>
            <Text className="text-gray-500">g/cm3</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Temperatura</Text>
          <View style={styles.bottomAligned}>
            <ChevronDown size="25px" color="red" />
            <Text className="text-xl">20</Text>
            <Text className="text-gray-500">ºC</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Pressão</Text>
          <View style={styles.bottomAligned}>
            <ChevronDown
              size="25px"
              color="green"
              style={{
                transform: [{ rotate: "180deg" }],
              }}
            />
            <Text className="text-xl">5.7</Text>
            <Text className="text-gray-500">bar</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 8,
  },
  subtitle: {
    color: "gray",
    fontSize: 12,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shipment: {
    fontSize: 16,
  },
  details: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "blue",
  },
  bottomAligned: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4, // Use this if gap is not supported, otherwise you can remove it
  },
});
