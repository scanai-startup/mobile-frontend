import { Link } from "expo-router";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

export default function SignUp() {
  return (
    <View>
      <View>
        <View>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ marginLeft: -40 }}
          />
          <Text className="text-4xl text-black mt-4 mb-8">
            <B>Cadastre</B> um novo usuário.
          </Text>
        </View>
        <View className="mb-24 flex gap-2">
          <InputBox title={"Nome de usuário"} placeholder={"carlos_andrade"} />
          <InputBox title={"Email"} placeholder={"exemplo@gmail.com"} />
          <InputBox title={"Senha"} placeholder={"************"} />
          <InputBox title={"Confirmar senha"} placeholder={"************"} />
        </View>
        <View className="w-full flex justify-between">
          <Button placeholder="Cadastrar novo usuário" route="../" />
        </View>
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

function Button({
  placeholder,
  route,
}: {
  placeholder: string;
  route: string;
}) {
  return (
    <Link href={route} className="p-3" asChild>
      <TouchableOpacity className="bg-[#171717] w-full flex items-center rounded-lg mb-4">
        <Text className="text-white text-lg font-medium ">{placeholder}</Text>
      </TouchableOpacity>
    </Link>
  );
}
