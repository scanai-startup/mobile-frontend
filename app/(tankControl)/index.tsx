import SafeAreaView from "@/components/SafeAreaView";
import { Search, Filter } from "lucide-react-native";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";

interface CardProps {
  title: string;
  isAvailable: boolean;
  density?: string;
  temperature?: number;
  pressure?: 0;
}

function FilterDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: any;
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View className="bg-white p-4 rounded-t-lg">
          <Text className="text-xl font-bold mb-4">Filtros</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Card({
  title,
  isAvailable,
  density = "",
  temperature = 0,
  pressure = 0,
}: CardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`/(tankControl)/tank/${title}`);
        router.push(`/(tankControl)/tank/${title}`);
      }}
      style={{ marginBottom: 16 }}
    >
      <View className="bg-white p-4 rounded-lg shadow flex-col">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">{title}</Text>
          {isAvailable ? (
            <View className="bg-green-200 px-2 py-1 rounded-full">
              <Text className="text-xs text-green-800">Disponível</Text>
            </View>
          ) : (
            <View className="bg-red-200 px-2 py-1 rounded-full">
              <Text className="text-xs text-red-800">Ocupado</Text>
            </View>
          )}
        </View>
        {!isAvailable && (
          <View className="mt-2 space-y-1">
            <View className="flex-row justify-between">
              <Text className="text-base">Densidade:</Text>
              <Text className="text-lg">{density} kg/m³</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base">Temperatura:</Text>
              <Text className="text-lg">{temperature} °C</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base">Pressão:</Text>
              <Text className="text-lg">{pressure} Pa</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function TankControl() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const data = [
    { title: "Tanque 1", isAvailable: true },
    {
      title: "Tanque 2",
      isAvailable: false,
      density: "980",
      temperature: 22,
      pressure: 100000,
    },
    {
      title: "Tanque 3",
      isAvailable: false,
      density: "980",
      temperature: 22,
      pressure: 100000,
    },
    { title: "Tanque 4", isAvailable: true },
    {
      title: "Tanque 5",
      isAvailable: false,
      density: "980",
      temperature: 22,
      pressure: 100000,
    },
    { title: "Tanque 6", isAvailable: true },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Controle de tanques"
      />
      <View>
        <Text className="text-4xl text-black mt-4 font-bold">
          Controle de tanques.
        </Text>
        <Text className="text-xl mt-2 mb-4">
          Lista de todas as informações acessíveis no momento.
        </Text>
      </View>
      <View className="flex flex-row items-center w-full mb-4">
        <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg flex-1">
          <Search size="25px" color="#9A9A9A" />
          <TextInput
            className="text-xl ml-2 flex-1"
            placeholder="Digite o que deseja buscar..."
          />
        </View>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={{
            backgroundColor: "#007BFF",
            paddingVertical: 14,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "semibold" }}>
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            isAvailable={item.isAvailable}
            density={item.density}
            temperature={item.temperature}
            pressure={item.pressure == 0 ? 0 : undefined}
          />
        )}
        keyExtractor={(item) => item.title}
        className="flex-1"
      />
      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </SafeAreaView>
  );
}
