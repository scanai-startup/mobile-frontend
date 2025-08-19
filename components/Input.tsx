import { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputBoxProps extends Omit<TextInputProps, "className"> {
  title?: string;
  auxText?: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function InputBox({
  title = "",
  auxText = "",
  children,
  icon,
  className,
  ...rest
}: InputBoxProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView className={className}>
      {title && <Text className="text-xl">{title}</Text>}
      <View className="flex-row items-center py-1 px-2 bg-[#DEDEDE] rounded-lg w-full">
        {icon &&
          React.createElement(icon, {
            color: isFocused ? "black" : "#adacac",
            size: 20,
          })}
        <TextInput
          className="flex-1 text-xl rounded-md placeholder:text-[#adacac]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {auxText && <Text className="text-neutral-500">{auxText}</Text>}
        <View>{children}</View>
      </View>
    </KeyboardAvoidingView>
  );
}
