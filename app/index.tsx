import CustomStatusBar from "@/components/CustomStatusBar";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import authUser from "@/features/auth/services/authService";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  {
    /* 
    So executa for ambiente de testes nem ambiente de desenvolvimento
    */
  }
  if (
    __DEV__ &&
    !process.env.JEST_WORKER_ID &&
    process.env.EXPO_PUBLIC_ENV == "development"
  ) {
    const credentials = {
      matricula: "123",
      senha: "senha123",
    };
    authUser(credentials);
  }

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View className="px-7 flex-1 justify-between">
          <View>
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ marginLeft: -40 }}
            />
            <Text className="text-4xl text-black mt-4 mb-8">
              Desfrute da <B>inovação</B> que a <B>Scan.AI</B> pode oferecer.
            </Text>
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
              <LoginButton
                placeholder="Acessar"
                route="/(tabs)"
                matricula={matricula}
                senha={senha}
              />
              <Text className="mt-4 text-[#9B9B9B] text-[10px]">
                © 2024 Scan.AI. Todos os direitos reservados.
              </Text>
              <Text className="text-xs text-[#9B9B9B]">
                scanaistartup@gmail.com
              </Text>
            </View>
          </View>
        </View>
        <View className="items-center mt-auto mb-4">
          <Text className="text-xs text-[#9B9B9B]">
            Política de Privacidade Termos de Uso
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

function LoginButton({
  placeholder,
  matricula,
  senha,
}: {
  placeholder: string;
  route: string;
  matricula: string;
  senha: string;
}) {
  function handleSubmit() {
    const credentials = {
      matricula: matricula,
      senha: senha,
    };
    authUser(credentials);
  }

  return (
    <TouchableOpacity
      className="bg-[#171717] w-full flex items-center rounded-lg p-4"
      onPress={handleSubmit}
      accessibilityRole="button"
    >
      <Text className="text-white text-lg font-medium ">{placeholder}</Text>
    </TouchableOpacity>
  );
}
