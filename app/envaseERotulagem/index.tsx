import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  id: number | string;
  lote: string;
  produto: string;
  data: string;
  volume: string;
  deposito: string;
}

const data = [
  {
    id: 1,
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
  },
  {
    id: "2",
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
  },
  {
    id: "3",
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
  },
  {
    id: "4",
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
  },
  {
    id: "5",
    lote: "24116F28",
    produto: "Cabernet Suave",
    data: "21/07/24",
    volume: "3000 L",
    deposito: "102",
  },
];
const Card = ({ item }: { item: Item }) => {
  return (
    <View className="max-w-96 w-96 h-56 p-2 shadow rounded-sm bg-white mb-3">
      <View className="flex-row justify-between items-end mb-4">
        <Text className="font-medium text-lg">LOTE {item.lote}</Text>
        <TouchableOpacity>
          <Text className="color-blue-500">Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View className="h-0.5 w-full flex-row justify-center bg-neutral-200" />
      <View className="flex-row items-end justify-between mb-2">
        <Text className="font-light">Produto</Text>
        <Text className="font-medium text-lg">{item.produto}</Text>
      </View>
      <View className="flex-row items-end justify-between mb-2">
        <Text className="font-light">Data</Text>
        <Text className="font-medium text-lg">{item.data}</Text>
      </View>
      <View className="flex-row items-end justify-between mb-2">
        <Text className="font-light">Volume</Text>
        <Text className="font-medium text-lg">{item.volume}</Text>
      </View>
      <View className="flex-row items-end justify-between mb-2">
        <Text className="font-light">Depósito</Text>
        <Text className="font-medium text-lg">{item.deposito}</Text>
      </View>
    </View>
  );
};

export default function envaseERotulagem() {
  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Envase e Rotulagem"
      />
      <View className="flex-1 items-center">
        <TouchableOpacity className="flex-row items-center w-80 h-14 bg-blue-500 rounded-xl px-6 py-3">
          <AntDesign name="pluscircle" size={24} color="white" />
          <Text className="text-white font-medium text-base ml-2">
            ADICIONAR NOVO PROCESSO
          </Text>
        </TouchableOpacity>

        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={{
            paddingVertical: 10,
            gap: 10,
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

// <CustomStatusBar barStyle="dark-content" />
//       <SafeAreaView
//         style={{ flex: 1, gap: 20 }}
//         edges={["right", "bottom", "left"]}
//       >
//         <AppHeader
//           variant="secondary"
//           mainText="Gestão de remessas"
//           showReturnButton
//         />
//         <View className="px-7">
//           <Link href="/" asChild>
//             <DefaultButton
//               title="ADICIONAR NOVA REMESSA"
//               icon={<CirclePlus color="white" />}
//             />
//           </Link>
//           <FlatList
//             data={data}
//             keyExtractor={(item) => String(item.id)}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item }) => <ShipmentCard {...item} />}
//             contentContainerStyle={{
//               paddingVertical: 20,
//               paddingBottom: 160,
//               gap: 10,
//             }}
//           ></FlatList>
//         </View>
//       </SafeAreaView>
