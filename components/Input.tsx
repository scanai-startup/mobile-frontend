import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputBoxProps extends TextInputProps {
  title: string;
}

export function InputBox({ title, ...rest }: InputBoxProps) {
  return (
    <View className="flex flex-col items-start font-medium h-auto w-full">
      <Text className="text-lg text-black mb-2">{title}</Text>
      <TextInput
        className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
        {...rest}
      />
    </View>
  );
}
