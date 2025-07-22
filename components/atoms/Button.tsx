import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Button extends Omit<TouchableOpacityProps, "className"> {
  placeholder: string;
  buttonClassname?: string;
  placeholderClassname?: string;
  variant?: "default" | "ghost";
  icon?: ReactNode;
  iconPosition?: "right" | "left";
}

export function Button({
  placeholder,
  buttonClassname,
  placeholderClassname,
  variant = "default",
  icon,
  iconPosition = "left",
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
      className={`flex ${iconPosition === "right" ? "flex-row-reverse" : "flex-row"} items-center justify-center gap-2 rounded-lg p-4 ${classVariants[variant].button} ${buttonClassname}`}
      {...TouchableOpacityProps}
    >
      {icon}
      <Text
        className={`${classVariants[variant].placeholder} font-medium ${placeholderClassname}`}
      >
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
}
