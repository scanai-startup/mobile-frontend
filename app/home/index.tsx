import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { Boxes, Cylinder, Grape } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const activityListItems = [
    {
      name: "Gestão de tanques",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "",
    },
    {
      name: "Recepção de uvas",
      icon: <Boxes size="28px" color="#000000" />,
      route: "/grapeReception",
    },
    {
      name: "Iniciar nova produção",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
    },
  ];
  return (
    <>
      <View className="h-1/3 pt-20 px-7 bg-zinc-900">
        <AppHeader />
      </View>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 0 }}>
        <View className="-top-[25%] absolute">
          <Text className="text-white font-bold text-2xl ml-7 mb-4">
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
        <View className="px-7 mt-8">
          <Text className="text-black font-bold text-2xl mb-4">
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
