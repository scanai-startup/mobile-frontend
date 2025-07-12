import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { UserAuthForm } from "@/features/auth";
import authUser from "@/features/auth/services/authService";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Login() {
  if (
    //! if on dev environment, auto-logins
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
            <UserAuthForm />
            <View className="flex w-full items-center mt-14">
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
