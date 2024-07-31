import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface AppHeaderProps {
  showReturnButton?: boolean;
}

export default function AppHeader({
  showReturnButton = false,
}: AppHeaderProps) {
  return (
    <View className="flex-row items-center justify-between w-full">
      {showReturnButton ? (
        <Link href="/">
          <ChevronLeft size="32px" color="black" />
        </Link>
      ) : (
        <>
          <View className="flex-row items-center gap-4">
            <Image
              source={require("@/assets/images/rio-sol-logo.jpg")}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <Text className="text-white text-xl">Olá, Nome.</Text>
          </View>
          <TabBarIcon name="information-circle" style={{ color: "white" }} />
        </>
      )}
    </View>
  );
}
