import { CheckIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface CardTrasfegaProps {
  depositId: number;
  title: string;
  isAvailable: boolean;
  density?: number;
  temperature?: number;
  pressure?: number | null;
  content?: string;
  contentId?: number;
  capacity: number;
  volume?: number;
  onSelect?: (depositId: number) => void;
  isSelected?: boolean;
}

export function CardTrasfega({
  title = "ERROR",
  isAvailable,
  density = 0,
  temperature = 0,
  pressure = 0,
  depositId,
  content = "",
  contentId = 0,
  capacity,
  volume = 0,
  onSelect,
  isSelected = false,
}: CardTrasfegaProps) {
  const handlePress = () => {
    if (onSelect) onSelect(depositId);
  };

  const renderError = () =>
    title === "ERROR" && (
      <Text className="text-base max-w-[200px]">
        Por favor contate imediatamente o suporte
      </Text>
    );

  const renderAnalysisDetails = () => {
    return (
      <>
        {renderDetailRow("Densidade:", density, " kg/m³")}
        {renderDetailRow("Temperatura:", temperature, " °C")}
        {pressure && renderDetailRow("Pressão:", pressure, " Pa")}
      </>
    );
  };

  const renderDetails = () => {
    return (
      <>
        <View className="w-full h-[1px] bg-neutral-250" />
        <View className="p-4">
          {Number(volume)
            ? renderDetailRow("Volume (em uso):", volume, " L")
            : null}
          {renderDetailRow("Capacidade:", capacity, " L")}
          {temperature ? renderAnalysisDetails() : null}
        </View>
      </>
    );
  };

  const renderDetailRow = (label: string, value: number, unit: string) => {
    return (
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-light">{label}</Text>
        <View className="flex-row justify-center items-end">
          <Text className="text-2xl font-semibold">{value}</Text>
          <Text className="text-base font-normal text-neutral-400">{unit}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ marginBottom: 16, width: "100%" }}
    >
      <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
        <View className="flex-row p-4 justify-between items-center">
          <View className="flex-row gap-4">
            {title !== "ERROR" ? (
              <Text className="text-2xl font-bold">{title}</Text>
            ) : (
              renderError()
            )}
          </View>
          {isSelected && (
            <TouchableOpacity onPress={handlePress}>
              <View className="bg-blue-500 rounded-full p-1">
                <CheckIcon size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {renderDetails()}
      </View>
    </TouchableOpacity>
  );
}
