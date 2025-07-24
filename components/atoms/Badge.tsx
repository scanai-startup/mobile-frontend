import React from "react";
import { Text, View } from "react-native";

interface IBadgeProps {
  variant?: "default" | "destructive";
  placeholder: string;
  containerClassname?: string;
  placeholderClassname?: string;
}

export default function Badge({
  variant = "default",
  placeholder,
  containerClassname,
  placeholderClassname,
}: IBadgeProps) {
  const classVariants = {
    default: {
      view: "border-transparent text-white",
    },
    destructive: {
      view: "border-transparent text-white",
    },
  };
  const defaultBgColor = variant === "default" ? "bg-zinc-900" : "bg-red-400";
  const hasExternalBgColor = containerClassname?.includes("bg-");
  const viewClasses = `${classVariants[variant].view} ${
    hasExternalBgColor ? "" : defaultBgColor
  } ${containerClassname} px-3 py-1 rounded-xl`;
  const textClasses = `text-md font-semibold ${
    placeholderClassname ? placeholderClassname : "text-white"
  }`;

  return (
    <View className={viewClasses}>
      <Text className={textClasses}>{placeholder}</Text>
    </View>
  );
}
