import SafeAreaView from "@/components/SafeAreaView";
import { Search } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

export default function GrapeReception() {
  return (
    <SafeAreaView className="flex-1 justify-between">
      <View>
        <View>
          <Text className="text-4xl text-black mt-4 font-bold">
            Controle de tanques.
          </Text>
          <Text className="text-xl">
            Lista de todos as informações acessíveis no momento.
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start bg-[#DEDEDE] py-3 px-3 rounded-lg w-full">
          <Search size="25px" color="#9A9A9A" />
          <TextInput
            className="text-xl ml-2"
            placeholder="Digite o que deseja buscar..."
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
