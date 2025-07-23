import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useDailyAnalysisForm } from "@/features/analisediaria/index";

export default function DailyAnalysis() {
  const {
    tank,
    date,
    setDate,
    density,
    setDensity,
    temperature,
    setTemperature,
    handleSubmit,
    router,
  } = useDailyAnalysisForm();

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
            questionTitle="Data"
            selectedDate={date}
            setSelectedDate={(date) => setDate(date)}
          />
          <View className="mb-4 mt-4">
            <Text className="text-lg mb-2">Densidade</Text>
            <View className="flex-row items-center gap-4">
              <TextInput
                className="flex-1 bg-[#DEDEDE] py-3 px-3 rounded-lg h-14 placeholder-gray-400"
                keyboardType="number-pad"
                placeholder="1030"
                onChangeText={(value) => setDensity(value)}
                maxLength={10}
              />
            </View>
          </View>
          <View className="mb-4">
            <Text className="text-lg mb-2">Temperatura</Text>
            <View className="flex-row items-center gap-4 bg-[#DEDEDE] px-3 rounded-lg h-14">
              <TextInput
                className="flex-1 placeholder-gray-400"
                keyboardType="number-pad"
                placeholder="24"
                onChangeText={(value) => setTemperature(value)}
                maxLength={10}
              />
              <Text>°C</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-5 py-4">
        <DefaultButton title="Concluir" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
