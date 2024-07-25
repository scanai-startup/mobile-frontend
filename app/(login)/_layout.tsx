import { Slot } from "expo-router";
import React from "react";

import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1 bg-[#EFEFEF]  px-11 pt-20 pb-2">
      <Slot />
      <Footer />
    </View>
  );
}

function Footer() {
  return (
    <View className="flex w-full items-center justify-between">
      <View className="flex w-full items-center justify-center">
        <Text className="mt-4 text-[#9B9B9B] text-[10px]">
          © 2024 Scan.AI. Todos os direitos reservados.
        </Text>
        <Text className="text-xs text-[#9B9B9B]">scanaistartup@gmail.com</Text>
      </View>
      <Text className="flex text-xs mt-4 items-center justify-center text-[#9B9B9B]">
        Política de Privacidade Termos de Uso
      </Text>
    </View>
  );
}
