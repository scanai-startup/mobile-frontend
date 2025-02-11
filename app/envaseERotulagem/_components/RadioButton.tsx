import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RadioProps {
  handleDataConfirmation: () => void;
  value?: string;
  completedStages: string[];
}

function Radio({ handleDataConfirmation, value, completedStages }: RadioProps) {
  const [checked, setChecked] = useState(
    value ? completedStages.includes(value) : false,
  );

  const onPress = useCallback(() => {
    setChecked((prev) => {
      const newCheckedState = !prev;
      return newCheckedState;
    });
    handleDataConfirmation();
  }, [handleDataConfirmation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center space-x-2"
    >
      <View className="items-center gap-2">
        <View className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-gray-400">
          {checked && <View className="size-6 rounded-full bg-blue-500" />}
        </View>
        <Text className="text-xs">Confirmar</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Radio);
