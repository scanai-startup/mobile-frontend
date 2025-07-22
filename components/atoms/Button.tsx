import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Button extends Omit<TouchableOpacityProps, "className"> {
  placeholder: string;
  buttonClassname?: string;
  placeholderClassname?: string;
  variant?: "default" | "ghost";
}

export function Button({
  placeholder,
  buttonClassname,
  placeholderClassname,
  variant = "default",
  ...TouchableOpacityProps
}: Button) {
  const classVariants = {
    default: {
      button: "bg-[#171717]",
      placeholder: "text-white",
    },
    ghost: {
      button: "bg-neutral-300",
      placeholder: "text-neutral-700",
    },
  };

  return (
    <TouchableOpacity
      className={`flex items-center rounded-lg p-4 ${classVariants[variant].button} ${buttonClassname}`}
      {...TouchableOpacityProps}
    >
      <Text className={`${classVariants[variant].placeholder} font-medium`}>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
}
