import Badge from "@/components/atoms/Badge";
import { Href, Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IDepositCardProps } from "../types/IDepositCardProps";
import getHref from "../utils/getDepositHref";

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

  function renderStatus() {
    const statusStyles =
      isAvailable == true ? (
        <Badge
          placeholder="Disponível"
          variant="default"
          containerClassname="bg-green-400"
        />
      ) : (
        <Badge placeholder="Ocupado" variant="destructive" />
      );

    return statusStyles;
  }
  function renderError() {
    return (
      title === "ERROR" && (
        <Text className="text-base max-w-[200px]">
          Por favor contate imediatamente o suporte
        </Text>
      )
    );
  }
  function renderDetailRow(label: string, value: number, unit: string) {
    return (
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-light">{label}</Text>
        <View className="flex-row justify-center items-end">
          <Text className="text-2xl font-semibold">{value}</Text>
          <Text className="text-base font-normal text-neutral-400">{unit}</Text>
        </View>
      </View>
    );
  }
  function renderAnalysisDetails() {
    return (
      <>
        {renderDetailRow("Densidade:", density, " kg/m³")}
        {renderDetailRow("Temperatura:", temperature, " °C")}
        {pressure && renderDetailRow("Pressão:", pressure, " Pa")}
      </>
    );
  }
  function renderDetails() {
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
  }

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
