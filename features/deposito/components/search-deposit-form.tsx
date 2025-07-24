import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

interface IFilterFormProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchDepositForm({ onSearch }: IFilterFormProps) {
  return (
    <View className="flex flex-row items-center flex-1">
      <View className="flex flex-row items-center bg-[#DEDEDE] py-0 px-3 rounded-lg flex-1">
        <Search size="25px" color="#9A9A9A" />
        <TextInput
          onChangeText={(value) => onSearch(value)}
          className="text-base ml-2 flex-1 py-0 h-14"
          placeholder="Digite o que deseja buscar..."
        />
      </View>
    </View>
  );
}
