import { Button } from "@/components/Button";
import CustomStatusBar from "@/components/CustomStatusBar";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Login() {
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
              <InputBox title="Nome de usuário" placeholder="carlos_andrade" />
              <InputBox
                title="Senha"
                placeholder="************"
                secureTextEntry={true}
              />
            </View>
            <View className="flex w-full items-center mt-16">
              <Button placeholder="Acessar" route="/(tabs)" />
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
