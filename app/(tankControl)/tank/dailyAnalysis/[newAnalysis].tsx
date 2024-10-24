import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface Analysis {
  id: string;
  date: string;
  stage: string;
  density: string;
  temperature: string;
}

const data: Analysis[] = [
  {
    id: "1",
    date: "09/07/24",
    stage: "Tomada espuma",
    density: "996",
    temperature: "20",
  },
];

export default function DailyAnalysis() {
  const { tank } = useLocalSearchParams();

  console.log(tank, data.length);

  return (
    <SafeAreaView>
      <AppHeader
        mainText={`TNQ FER ${tank}`}
        variant="secondary"
        showReturnButton
      />
      <View className="flex-1 px-7 gap-4">
        <Link
          href={{
            pathname: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]/",
            params: {
              tank: tank,
            },
          }}
          asChild
        >
          <DefaultButton title="ADICIONAR NOVA ANÁLISE" />
        </Link>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AnalysisCard item={item} />}
          contentContainerStyle={{ gap: 16 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-center mb-4">
                Não há análises feitas ainda neste tanque
              </Text>
              <Text className="text-4xl">📊</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const AnalysisCard = ({ item }: { item: Analysis }) => {
  return (
    <View className="bg-white rounded-md shadow border border-neutral-250">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-2xl font-bold">{item.date}</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View className="h-px bg-neutral-250" />
      <View className="p-4">
        <CardRow label="Etapa" value={item.stage} />
        <CardRow label="Densidade" value={item.density} />
        <CardRow label="Temperatura" value={`${item.temperature} °C`} />
      </View>
    </View>
  );
};

const CardRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between">
    <Text className="text-xl font-light">{label}</Text>
    <Text className="font-medium text-2xl">{value}</Text>
  </View>
);
