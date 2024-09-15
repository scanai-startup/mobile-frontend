import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function SignUp() {
  return (
    <SafeAreaView>
      <View className="flex-1">
        <View>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ marginLeft: -40 }}
          />
          <Text className="text-4xl text-black mt-4 mb-8">
            <B>Cadastre</B> um novo usuário.
          </Text>
        </View>
        <View className="w-full mb-24 gap-2">
          <InputBox title={"Nome de usuário"} placeholder={"carlos_andrade"} />
          <InputBox title={"Email"} placeholder={"exemplo@gmail.com"} />
          <InputBox
            title={"Senha"}
            placeholder={"************"}
            secureTextEntry={true}
          />
          <InputBox
            title={"Confirmar senha"}
            placeholder={"************"}
            secureTextEntry={true}
          />
        </View>
        <View className="w-full flex justify-between">
          <Button placeholder="Cadastrar novo usuário" route="../" />
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

function Button({
  placeholder,
  route,
}: {
  placeholder: string;
  route: string;
}) {
  return (
    <Link href={{ pathname: route as "/signup" }} className="p-3" asChild>
      <TouchableOpacity className="bg-[#171717] w-full flex items-center rounded-lg mb-4">
        <Text className="text-white text-lg font-medium ">{placeholder}</Text>
      </TouchableOpacity>
    </Link>
  );
}
function Footer() {
  return (
    <View className="flex w-full items-center justify-between mb-4">
      <View className="flex w-full items-center justify-center">
        <Text className="mt-4 text-[#9B9B9B] text-[10px]">
          © 2024 Scan.AI. Todos os direitos reservados.
        </Text>
        <Text className="text-xs text-[#9B9B9B]">scanaistartup@gmail.com</Text>
      </View>
      <Text className="flex text-xs mt-4 items-center justify-center text-[#9B9B9B]">
        Política de Privacidade Termos de Uso
      </Text>
    </View>
  );
}
