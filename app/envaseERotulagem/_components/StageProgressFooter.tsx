import { CheckCircle } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function StageProgressFooter({
  activeFicha,
  completedStages,
  onComplete,
}: {
  activeFicha: "A" | "B";
  completedStages: string[];
  onComplete: () => void;
}) {
  const stages = ["depalletization", "filling", "labelling", "packaging"];

  const allCompleted = stages.every((stage) =>
    completedStages.includes(stage.toLowerCase()),
  );

  return (
    <View className="px-7 py-4 border-t border-zinc-200 bg-white">
      <View className="flex-row justify-between items-center mb-4">
        {stages.map((stage) => (
          <View key={stage} className="items-center">
            <CheckCircle
              size={24}
              color={
                completedStages.includes(stage.toLowerCase())
                  ? "#00A64E"
                  : "#C0C0C0"
              }
            />
            <Text className="text-xs mt-1">{stage}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        className={`py-3 rounded-lg ${allCompleted ? "bg-[#00A64E]" : "bg-[#C0C0C0]"}`}
        onPress={allCompleted ? onComplete : undefined}
      >
        <Text className="text-white text-center font-bold">
          {allCompleted ? "Concluir Ficha" : "Complete todas as etapas"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
