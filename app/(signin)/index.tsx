import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

export default function SignUp() {
  return (
    <View className="flex-1 bg-[#EFEFEF] justify-between px-11 pt-20 pb-2">
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
        <View className="mb-24 flex gap-2">
          <InputBox title={"Nome de usuário"} placeholder={"carlos_andrade"} />
          <InputBox title={"Senha"} placeholder={"************"} />
        </View>
        <View className="w-full flex justify-between">
          <Button placeholder="Acessar" />
          <Button placeholder="Cadastrar novo usuário" />
        </View>
      </View>
      <View className="flex w-full items-center justify-between flex-1">
        <View className="flex w-full items-center justify-center">
          <Text className="mt-4 text-[#9B9B9B] text-[10px]">
            © 2024 Scan.AI. Todos os direitos reservados.
          </Text>
          <Text className="text-xs text-[#9B9B9B]">
            scanaistartup@gmail.com
          </Text>
        </View>
        <Text className="flex text-xs mt-4 items-center justify-center text-[#9B9B9B]">
          Política de Privacidade Termos de Uso
        </Text>
      </View>
    </View>
  );
}

function InputBox({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) {
  return (
    <View className="flex flex-col items-start font-medium h-auto w-full">
      <Text className="text-lg text-black mb-2">{title}</Text>
      <TextInput
        className="border border-[#BDBDBD] h-12 w-[310px] p-2 rounded-md text-lg"
        placeholder={placeholder}
      />
    </View>
  );
}

const B = (props: any) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

function Button({ placeholder }: { placeholder: string }) {
  return (
    <TouchableOpacity className="bg-[#171717] w-full flex items-center rounded-lg mb-4">
      <Text className="text-white text-lg p-3 font-medium">{placeholder}</Text>
    </TouchableOpacity>
  );
}
