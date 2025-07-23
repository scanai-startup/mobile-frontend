import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import DateInput from "@/components/DateInput";
import SafeAreaView from "@/components/SafeAreaView";
import { useTokenStore } from "@/features/auth/store/userStore";
import { useToast } from "@/hooks/useToast";
import { validateField } from "@/hooks/validateField";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
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
        <Button
          placeholder="Concluir"
          onPress={handleSubmit}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}
