import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function FichaTabs({
  active,
  onSelect,
}: {
  active: "A" | "B";
  onSelect: (type: "A" | "B") => void;
}) {
  return (
    <View className="flex-row px-7 mt-4 border-b border-zinc-200 justify-between">
      <TouchableOpacity
        className={`pb-3 px-2 mr-8 ${active === "A" ? "border-b-2 border-[#ED2860]" : ""}`}
        onPress={() => onSelect("A")}
      >
        <Text
          className={`text-lg ${active === "A" ? "font-bold text-[#ED2860]" : "text-zinc-600"}`}
        >
          Enchimento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`pb-3 px-2 ${active === "B" ? "border-b-2 border-[#ED2860]" : ""}`}
        onPress={() => onSelect("B")}
      >
        <Text
          className={`text-lg ${active === "B" ? "font-bold text-[#ED2860]" : "text-zinc-600"}`}
        >
          Rotulagem
        </Text>
      </TouchableOpacity>
    </View>
  );
}
