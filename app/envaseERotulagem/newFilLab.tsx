import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function newFilLab() {
  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Envase e Rotulagem"
      />
      <ScrollView contentContainerClassName="px-7 gap-6">
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="text-xl">Produto</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="1.5" />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-xl">Lote</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="123" />
            </View>
          </View>
        </View>
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="text-xl">Depósito</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="1.5" />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-xl">Volume</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="3000" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
