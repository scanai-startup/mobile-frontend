import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputBoxProps extends TextInputProps {
  title: string;
}

export function InputBox({ title, ...rest }: InputBoxProps) {
  return (
    <KeyboardAvoidingView className="flex flex-col items-start font-medium h-auto w-full">
      <Text className="text-lg text-black mb-2">{title}</Text>
      <TextInput
        className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
        style={{ backgroundColor: "#D4D4D4", padding: 10, borderRadius: 5 }}
        {...rest}
      />
    </KeyboardAvoidingView>
  );
}
