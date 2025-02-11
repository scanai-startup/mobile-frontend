import React, { useCallback } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react-native";
import Radio from "./RadioButton";

interface CollapsibleStageProps {
  value: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  children: React.ReactNode;
  handleDataConfirmation: () => void;
  completedStages: string[];
}

export function CollapsibleStage({
  value,
  title,
  icon,
  completed,
  children,
  handleDataConfirmation,
  completedStages,
}: CollapsibleStageProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <View className="mb-1">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="flex-1 flex-row items-center gap-3 mb-4"
          onPress={toggleCollapse}
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
        <Radio
          handleDataConfirmation={handleDataConfirmation}
          completedStages={completedStages}
          value={value}
        />
      </View>
      {!isCollapsed && children}
    </View>
  );
}

export default React.memo(CollapsibleStage);
