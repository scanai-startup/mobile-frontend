import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  ArrowDown,
  Boxes,
  ChevronDown,
  Cylinder,
  Grape,
  Search,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";

export default function Reception() {
  const activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
    {
      name: "Análises de deposito",
      icon: <Boxes size="28px" color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/[depositAnalysis]",
      type: "tank",
    },
    {
      name: "Envase e rotulagem",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
    {
      name: "Adicionar Vinho Base",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
    },
    {
      name: "Realizar Trasfega",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
    {
      name: "Adicionar pé de Cuba",
      icon: <Grape size="28px" color="#000000" />,
      route: "",
      type: "",
      param: "",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Recepção de Uvas"
      />
      <View className="flex flex-1 mt-4 gap-2">
        <ScrollView>
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
          <View>
            <Text className="text-3xl font-bold">Condições do caminhão</Text>
            <View className="flex flex-col items-center gap-4">
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
    </SafeAreaView>
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
              buttonState === "yes" ? "bg-green-500" : "bg-gray-300"
            }`}
            onPress={handleYesClick}
          >
            <Text className="text-white text-lg">X</Text>
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
              buttonState === "no" ? "bg-red-500" : "bg-gray-300"
            }`}
            onPress={handleNoClick}
          >
            <Text className="text-white text-lg">X</Text>
          </TouchableOpacity>
          <View className="flex-shrink">
            <Text className="text-black font-semibold text-2xl">Não</Text>
            <Text className="text-gray-400 font-semibold">
              Estado de conservação ruim
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
