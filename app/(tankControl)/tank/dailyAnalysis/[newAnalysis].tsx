import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import SafeAreaView from "@/components/SafeAreaView";
import AppHeader from "@/components/AppHeader";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <AppHeader
        mainText={`TNQ FER ${tank}`}
        variant="secondary"
        showReturnButton
        returnHref={router.back}
      />

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Link
          href={{
            pathname: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]/",
            params: { tank: tank },
          }}
          asChild
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#3B82F6",
              borderRadius: 12,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
          >
            <AntDesign name="pluscircle" size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 16,
                marginLeft: 8,
              }}
            >
              ADICIONAR NOVA ANÁLISE
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnalysisCard item={item} />}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 16 }}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.date}</Text>
        <TouchableOpacity>
          <Text style={{ color: "#3B82F6" }}>Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#6B7280", fontSize: 16 }}>Etapa</Text>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.stage}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#6B7280", fontSize: 16 }}>Densidade</Text>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.density}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#6B7280", fontSize: 16 }}>Temperatura</Text>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.temperature}°</Text>
      </View>
    </View>
  );
};
