import { Image, Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

export default function AppHeader() {
  return (
    <View className="flex-row items-center px-7 justify-between w-full">
      <View className="flex-row items-center gap-4">
        <Image
          source={require("@/assets/images/rio-sol-logo.jpg")}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <Text className="text-white text-xl">Olá, Nome.</Text>
      </View>
      <TabBarIcon name="information-circle" style={{ color: "white" }} />
    </View>
  );
}
