import { useRouter } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";
import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  showReturnButton?: boolean;
  variant?: "primary" | "secondary";
  mainText: string;
  returnHref?: string | (() => void); // Modificado para aceitar função ou string
}

export default function AppHeader({
  showReturnButton = false,
  variant = "primary",
  returnHref = "/",
  mainText,
}: AppHeaderProps) {
  const OSPadding = Platform.OS === "ios" ? 0 : 20;
  const router = useRouter();

  return (
    <View
      style={{
        paddingVertical: OSPadding,
        paddingHorizontal: 24,
        backgroundColor: variant === "primary" ? "#171717" : "transparent",
        borderBottomWidth: 1,
        borderColor: "#C0C0C0",
      }}
      className="flex-row items-center"
    >
      {showReturnButton ? (
        typeof returnHref === "function" ? (
          <TouchableOpacity onPress={returnHref} testID="chevron-left-icon">
            <ChevronLeft color="#171717" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.push(returnHref as any)}
            testID="chevron-left-icon"
          >
            <ChevronLeft color="#171717" />
          </TouchableOpacity>
        )
      ) : null}

      <View
        style={{
          gap: variant === "primary" ? 10 : 0,
          flex: 1,
          justifyContent: variant === "primary" ? "space-between" : "center",
        }}
        className="flex-row items-center"
      >
        <Text
          className={
            variant === "primary"
              ? "text-white text-xl"
              : "text-zinc-950 text-2xl"
          }
        >
          {mainText}
        </Text>
        {variant === "primary" ? (
          <View
            className="size-8 bg-white rounded-full"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>U</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
