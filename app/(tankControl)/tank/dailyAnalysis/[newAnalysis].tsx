import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
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
  const router = useRouter();

  return (
    <SafeAreaView>
      <AppHeader
        mainText={`TNQ FER ${tank}`}
        variant="secondary"
        showReturnButton
        returnHref={router.back}
      />
      <View className="flex-1 px-7 gap-4">
        <Link
          href={{
            pathname: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]/",
            params: { tank: tank },
          }}
          asChild
        >
          <DefaultButton title="ADICIONAR NOVA ANÁLISE" />
        </Link>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnalysisCard item={item} />}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 16 }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#6B7280", fontSize: 16, marginBottom: 4 }}>
              Não há análises feitas ainda neste tanque
            </Text>
            <Text style={{ fontSize: 40 }}>📊</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const AnalysisCard = ({ item }: { item: Analysis }) => {
  return (
    <View className="bg-white rounded-md shadow border border-neutral-250">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-2xl font-bold">{item.date}</Text>
        <TouchableOpacity>
          <Text style={{ color: "#3B82F6" }}>Detalhes</Text>
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
