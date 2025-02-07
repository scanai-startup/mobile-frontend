import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

export function CollapsibleStage({
  title,
  icon,
  completed,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View className="mb-1">
      <TouchableOpacity
        className="flex-row items-center gap-3 mb-4"
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        {icon}
        <Text className="text-2xl font-bold flex-1">{title}</Text>
        {completed && <CheckCircle size={20} color="#00A64E" />}
        {isCollapsed ? (
          <ChevronUp color="#666" />
        ) : (
          <ChevronDown color="#666" />
        )}
      </TouchableOpacity>

      {!isCollapsed && children}
    </View>
  );
}
