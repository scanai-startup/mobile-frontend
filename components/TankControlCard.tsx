import { Link, Href } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface CardProps {
  depositId: number;
  title: string;
  isAvailable: boolean;
  density?: 0;
  temperature?: number;
  pressure?: 0;
  content?: string;
  contentId?: number;
}

export function Card({
  title = "ERROR",
  isAvailable,
  density = 0,
  temperature = 0,
  pressure = 0,
  depositId,
  content = "",
  contentId = 0,
}: CardProps) {
  const href = getHref(title, depositId, isAvailable, content, contentId);
  const renderStatus = () => {
    const statusStyles =
      isAvailable == true
        ? { bg: "bg-green-200", text: "text-green-800", label: "Disponível" }
        : { bg: "bg-red-200", text: "text-red-800", label: "Ocupado" };

    return (
      <View className={`${statusStyles.bg} px-2 py-1 rounded-full`}>
        <Text className={`text-md ${statusStyles.text}`}>
          {statusStyles.label}
        </Text>
      </View>
    );
  };

  const renderError = () =>
    title === "ERROR" && (
      <Text className="text-base max-w-[200px]">
        Por favor contate imediatamente o suporte
      </Text>
    );

  const renderDetails = () => {
    if (temperature == null) return;
    return content == "Mostro" ? (
      <>
        <View className="w-full h-[1px] bg-neutral-250" />
        <View className="p-4">
          {renderDetailRow("Densidade:", density, "kg/m³")}
          {renderDetailRow("Temperatura:", temperature, "°C")}
          {pressure && renderDetailRow("Pressão:", pressure, "Pa")}
        </View>
      </>
    ) : content == "Pé de Cuba" ? (
      <>
        <Text>Info pé de cuba</Text>
      </>
    ) : null;
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
    <Link href={href as Href} asChild>
      <TouchableOpacity style={{ marginBottom: 16, width: "100%" }}>
        <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
          <View className="flex-row p-4 justify-between items-center">
            {title !== "ERROR" ? (
              <Text className="text-2xl font-bold">{title}</Text>
            ) : (
              renderError()
            )}
            {renderStatus()}
          </View>
          {renderDetails()}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

function getHref(
  title: string,
  depositId: number,
  isAvailable: boolean,
  content: string,
  contentId: number,
) {
  return isAvailable
    ? {
        pathname: "/(tankControl)/[emptyTank]",
        params: { tank: title, depositId },
      }
    : {
        pathname: "/tank/[tank]",
        params: { tank: title, depositId, content, contentId },
      };
}
