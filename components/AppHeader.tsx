import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Image, Platform, Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface AppHeaderProps {
  showReturnButton?: boolean;
}

export default function AppHeader({
  showReturnButton = false,
}: AppHeaderProps) {
  const OSPadding = Platform.OS === "ios" ? 0 : 20;
  return (
    <View
      style={{ paddingTop: OSPadding }}
      className="flex-row items-center justify-between"
    >
      {showReturnButton ? (
        <Link href="/">
          <ChevronLeft size="34px" color="black" />
        </Link>
      ) : (
        <>
          <View style={{ gap: 10 }} className="flex-row items-center">
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
