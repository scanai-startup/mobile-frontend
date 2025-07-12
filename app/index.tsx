import Login from "@/features/auth";
import React from "react";
import { Text } from "react-native";

export default function LoginScreen() {
  return <Login />;
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
