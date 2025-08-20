import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import NewDailyAnalysisForm from "@/features/controleDeTanques/components/new-daily-analysis-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function DailyAnalysis() {
  const { tank, content, contentId } = useLocalSearchParams<{
    tank: string;
    content: string;
    contentId: string;
  }>();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Nova análise diária"
        returnHref={router.back}
      />
      <View className="px-5">
        <NewDailyAnalysisForm
          tank={tank}
          content={content}
          contentId={contentId}
        />
      </View>
    </SafeAreaView>
  );
}
