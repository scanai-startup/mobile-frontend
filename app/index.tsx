import { Button } from "@/components/Button";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { Image, Text, View } from "react-native";

export default function Login() {
  return (
    <SafeAreaView className="flex-1 justify-between">
      <View>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ marginLeft: -40 }}
        />
        <Text className="text-4xl text-black mt-4 mb-8">
          Desfrute da <B>inovação</B> que a <B>Scan.AI</B> pode oferecer.
        </Text>
        <View className="w-full mb-24 gap-2">
          <InputBox title={"Nome de usuário"} placeholder={"carlos_andrade"} />
          <InputBox
            title={"Senha"}
            placeholder={"************"}
            secureTextEntry={true}
          />
        </View>
        <View className="flex w-full justify-between">
          <Button placeholder="Acessar" route="/grapeReception" />
          <Button placeholder="Cadastrar novo usuário" route="/signup" />
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

function Footer() {
  return (
    <View className="flex items-center">
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
