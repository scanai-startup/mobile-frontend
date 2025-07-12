import { InputBox } from "@/components/Input";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import authUser from "../services/authService";

export default function UserAuthForm() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit() {
    const credentials = {
      matricula: matricula,
      senha: senha,
    };
    await authUser(credentials);
  }

  return (
    <View>
      <View className="w-full mb-6 mt-20 gap-2">
        <InputBox
          title="Nome de usuário"
          placeholder="carlos_andrade"
          onChangeText={setMatricula}
        />
        <InputBox
          title="Senha"
          placeholder="************"
          secureTextEntry={true}
          onChangeText={setSenha}
        />
      </View>
      <View className="flex w-full items-center mt-14">
        <TouchableOpacity
          className="bg-[#171717] w-full flex items-center rounded-lg p-4"
          onPress={handleSubmit}
          accessibilityRole="button"
        >
          <Text className="text-white text-lg font-medium ">Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
