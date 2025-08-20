import React from "react";
import { Text } from "react-native";

export default function ErrorMessage({ message }: { message: string }) {
  return <Text className="text-sm text-red-500">{message}</Text>;
}
