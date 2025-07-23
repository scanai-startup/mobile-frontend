import Badge from "@/components/atoms/Badge";
import { Href, Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IDepositCardProps } from "../types/IDepositCardProps";

export function DepositCard({
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
}: IDepositCardProps) {
  const href = getHref(
    title,
    depositId,
    isAvailable,
    content,
    contentId,
    (capacity = capacity),
    (volume = volume),
  );
  const renderStatus = () => {
    const statusStyles =
      isAvailable == true ? (
        <Badge
          placeholder="Disponível"
          variant="default"
          containerClassname="bg-green-500"
        />
      ) : (
        <Badge placeholder="Ocupado" />
      );

    return statusStyles;
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
          {renderDetailRow("Volume (em uso):", volume, " L")}
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
    <Link href={href as Href} asChild testID="tank-card">
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
  capacity: number,
  volume: number,
) {
  return isAvailable
    ? {
        pathname: "/(tankControl)/[emptyTank]",
        params: { tank: title, depositId, capacity },
      }
    : {
        pathname: "/tank/[tank]",
        params: {
          tank: title,
          depositId,
          content,
          contentId,
          capacity,
          volume,
        },
      };
}
