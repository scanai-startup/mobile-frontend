import React from "react";
import { BadgeAlert, BadgeCheck, Info } from "lucide-react-native";
import { Text, View } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <View className="flex-row items-center gap-2 bg-white w-[90%] rounded-lg px-3 py-4 border-l-[8px] border-l-green-500">
      <BadgeCheck color="#22c55e" size={40} />
      <View className="max-w-[80%]">
        <Text className="font-bold text-xl">{props.text1}</Text>
        <Text className="font-normal text-lg text-zinc-500">{props.text2}</Text>
      </View>
    </View>
  ),
  info: (props: any) => (
    <View className="flex-row items-center gap-2 bg-white w-[90%] rounded-lg px-3 py-4 border-l-[8px] border-l-blue-500">
      <Info color="#3b82f6" size={40} />
      <View className="max-w-[80%]">
        <Text className="font-bold text-xl">{props.text1}</Text>
        <Text className="font-normal text-lg text-zinc-500">{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props: any) => (
    <View className="flex-row items-center gap-2 bg-white w-[90%] rounded-lg px-3 py-4 border-l-[8px] border-l-red-500">
      <BadgeAlert color="#ef4444" size={40} />
      <View className="max-w-[80%]">
        <Text className="font-bold text-xl">{props.text1}</Text>
        <Text className="font-normal text-lg text-zinc-500">{props.text2}</Text>
      </View>
    </View>
  ),
};
