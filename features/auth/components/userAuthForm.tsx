import { Button } from "@/components/Button";
import { InputBox } from "@/components/Input";
import React, { useState } from "react";
import { View } from "react-native";
import authUser from "../services/authService";

export function UserAuthForm() {
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
        <Button
          placeholder="Acessar"
          onPress={handleSubmit}
          buttonClassname="w-full"
          accessibilityRole="button"
        />
      </View>
    </View>
  );
}
