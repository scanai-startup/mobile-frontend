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
      view: "border-transparent bg-zinc-900 text-white",
      placeholder: "text-white",
    },
    destructive: {
      view: "border-transparent bg-red-400 text-white",
      placeholder: "text-white",
    },
  };
  console.log(containerClassname);

  return (
    <View
      className={`${classVariants[variant].view} ${containerClassname} px-3 py-1 rounded-xl`}
    >
      <Text
        className={`text-md font-semibold ${classVariants[variant].placeholder} ${placeholderClassname}`}
      >
        {placeholder}
      </Text>
    </View>
  );
}
