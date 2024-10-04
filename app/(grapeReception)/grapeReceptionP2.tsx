import { Check, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GrapeRepectionP2() {
  return (
    <View className="flex-1">
      <View className="flex flex-1 gap-2 px-7 mt-6">
        <ScrollView
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-xl">Sanidade</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="Sanidade"
              />
            </View>
          </View>
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="text-xl">SO2</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="Sanidade"
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl">Unidade</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="Sanidade"
                />
              </View>
            </View>
          </View>
          <View>
            <Text className="text-xl">Tipo de vinho</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="ex: VB - Vinho branco"
              />
            </View>
          </View>
          <View>
            <Text className="text-xl">Cuba n°</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="ex: VB - Vinho branco"
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl font-bold">Condições do caminhão</Text>
            <View className="flex flex-col gap-4">
              <YesNoButton
                question={"Caminhão em bom estado de conservação?"}
              />
              <YesNoButton
                question={"Caminhão em boas condições de higiene?"}
              />
              <YesNoButton
                question={"Contentores de uva em boas condições de uso?"}
              />
              <YesNoButton
                question={"As boas práticas estão sendo mantidas?"}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const YesNoButton = ({ question }: { question: string }) => {
  const [buttonState, setButtonState] = useState("yes");

  const handleYesClick = () => setButtonState("yes");
  const handleNoClick = () => setButtonState("no");

  return (
    <View className="justify-start">
      <Text className="text-lg mb-2">{question}</Text>
      <View className="gap-2">
        <View className="flex-row flex-wrap items-center">
          <TouchableOpacity
            className={`px-7 py-5 rounded mr-2 ${
              buttonState === "yes" ? "bg-green-400" : "bg-gray-300"
            }`}
            onPress={handleYesClick}
          >
            <Check
              color={buttonState === "yes" ? "#15803d" : "#9ca3af"}
              width={20}
              height={24}
            />
          </TouchableOpacity>
          <View className="flex-shrink">
            <Text className="text-black font-semibold text-2xl">Sim</Text>
            <Text className="text-gray-500 font-semibold text-lg">
              Bom estado de conservação
            </Text>
          </View>
        </View>
        <View className="flex-row flex-wrap items-center">
          <TouchableOpacity
            className={`px-7 py-5 rounded mr-2 ${
              buttonState === "no" ? "bg-red-400" : "bg-gray-300"
            }`}
            onPress={handleNoClick}
          >
            <X
              width={20}
              height={24}
              color={buttonState === "no" ? "#dc2626" : "#9ca3af"}
            />
          </TouchableOpacity>
          <View className="flex-shrink">
            <Text className="text-black font-semibold text-2xl">Não</Text>
            <Text className="text-gray-500 font-semibold text-lg">
              Estado de conservação ruim
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
