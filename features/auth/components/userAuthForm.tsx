import { Button } from "@/components/atoms/Button";
import { InputBox } from "@/components/Input";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { authUser } from "../services/authService";
import { useTokenStore } from "../store/userStore";

export function UserAuthForm() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken } = useTokenStore();
  const router = useRouter();
  const toast = useToast();

  async function handleSubmit() {
    const credentials = { matricula, senha };
    await authUser(credentials, { setToken, router, toast });
  }

  React.useEffect(() => {
    if (
      __DEV__ &&
      !process.env.JEST_WORKER_ID &&
      process.env.EXPO_PUBLIC_ENV == "development"
    ) {
      const credentials = {
        matricula: "123",
        senha: "senha123",
      };
      authUser(credentials, { setToken, router, toast });
    }
  }, []);

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
