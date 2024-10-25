import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

interface Analysis {
  id: string;
  date: string;
  stage: string;
  density: string;
  temperature: string;
}

const data: Analysis[] = [
  {
    id: "1",
    date: "09/07/24",
    stage: "Tomada espuma",
    density: "996",
    temperature: "20",
  },
];

export default function DailyAnalysis() {
  const { tank } = useLocalSearchParams();
  const router = useRouter();
  const [trasfegaDate, setTrasfegaDate] = useState<Date>(new Date());

  return (
    <SafeAreaView className="flex-1">
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Nova análise diária"
        returnHref={router.back}
      />

      <View className="px-5 flex-1 ">
        <Text className="text-4xl text-black mt-4 font-bold">{tank}</Text>
        <View className="mt-4">
          <DateInput
            questionTitle="Data da trasfega"
            selectedDate={trasfegaDate}
            setSelectedDate={(date) => setTrasfegaDate(date)}
          />
          <View className="mb-4 mt-4">
            <Text className="text-lg mb-2">Densidade</Text>
            <View className="flex-row items-center gap-4">
              <TextInput
                className="flex-1 bg-[#DEDEDE] py-3 px-3 rounded-lg h-14 placeholder-gray-400"
                keyboardType="numeric"
                defaultValue="1030"
              />
              <TextInput
                className="flex-1 bg-[#DEDEDE] py-3 px-3 rounded-lg h-14 placeholder-gray-400"
                defaultValue="°C"
              />
            </View>
          </View>
          <View className="mb-4">
            <Text className="text-lg mb-2">Temperatura</Text>
            <View className="flex-row items-center gap-4">
              <TextInput
                className="flex-1 bg-[#DEDEDE] py-3 px-3 rounded-lg h-14 placeholder-gray-400"
                keyboardType="numeric"
                defaultValue="24"
              />
              <TextInput
                className="flex-1 bg-[#DEDEDE] py-3 px-3 rounded-lg h-14 placeholder-gray-400"
                defaultValue="Kg/m3"
              />
            </View>
          </View>
        </View>
      </View>

      <View className="px-5 py-4">
        <Link
          href={{
            pathname: "/(tankControl)/tank/[tank]",
            params: { tank: tank as string },
          }}
          asChild
        >
          <DefaultButton title="Concluir" />
        </Link>
      </View>
    </SafeAreaView>
  );
}
