import { Text, TextInput, View } from "react-native";

export function InputBox({
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
