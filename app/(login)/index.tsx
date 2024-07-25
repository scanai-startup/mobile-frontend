import { InputBox } from "@/components/Input";
import { Button } from "@/components/Button";
import { View, Text, Image } from "react-native";

export default function SignUp() {
  return (
    <View>
      <View>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ marginLeft: -40 }}
        />
        <Text className="text-4xl text-black mt-4 mb-8">
          Desfrute da <B>inovação</B> que a <B>Scan.AI</B> pode oferecer.
        </Text>
      </View>
      <View className="flex mb-24 gap-2">
        <InputBox title={"Nome de usuário"} placeholder={"carlos_andrade"} />
        <InputBox title={"Senha"} placeholder={"************"} />
      </View>
      <View className="flex w-full justify-between">
        <Button placeholder="Acessar" route="" />
        <Button placeholder="Cadastrar novo usuário" route="./signup" />
      </View>
    </View>
  );
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
