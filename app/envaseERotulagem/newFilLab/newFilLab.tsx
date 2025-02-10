import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import HourInput from "@/components/HourInput";
import SafeAreaView from "@/components/SafeAreaView";
import YesNoButtonField from "@/components/YesNoButtonField";
import { stageQuestions } from "@/constants/stageQuestions";
import { Droplet, Package, Rows3, Tag } from "lucide-react-native";
import { CollapsibleStage } from "../_components/CollapsibleStage";
import FichaTabs from "../_components/FichaTabs";
import StageProgressFooter from "../_components/StageProgressFooter";

interface StageInfo {
  title: string;
  icon: React.JSX.Element;
  description: string;
  value: string;
}

export default function NewFillLab() {
  const stages: StageInfo[] = [
    {
      title: "Despaletização",
      icon: (
        <View className="p-3 bg-green-100 rounded-lg">
          <Rows3 color="#00A64E" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "depalletization",
    },
    {
      title: "Enchimento",
      icon: (
        <View className="p-3 bg-red-100 rounded-lg">
          <Droplet color="#EB1203" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "filling",
    },
    {
      title: "Rotulagem",
      icon: (
        <View className="p-3 bg-purple-100 rounded-lg">
          <Tag color="#8C5EE8" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "labelling",
    },
    {
      title: "Embalamento",
      icon: (
        <View className="p-3 bg-blue-100 rounded-lg">
          <Package color="#0052FF" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "packaging",
    },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [volume, setVolume] = useState("");

  // Estado para armazenar os horários de cada ficha
  const [fichaTime, setFichaTime] = useState<
    Record<"A" | "B", { start: Date; finish: Date }>
  >({
    A: { start: new Date(), finish: new Date() },
    B: { start: new Date(), finish: new Date() },
  });

  const router = useRouter();
  const [activeFicha, setActiveFicha] = useState<"A" | "B">("A");

  const stagesForFicha = {
    A: ["depalletization", "filling"],
    B: ["labelling", "packaging"],
  };
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  const handleFichaTimeChange = (
    ficha: "A" | "B",
    type: "start" | "finish",
    newTime: Date,
  ) => {
    setFichaTime((prev) => ({
      ...prev,
      [ficha]: { ...prev[ficha], [type]: newTime },
    }));
  };

  const handleDataConfirmation = (title: string) => {
    setCompletedStages((prev) =>
      prev.includes(title)
        ? prev.filter((stage) => stage !== title)
        : [...prev, title],
    );
  };

  const renderActiveFicha = () => {
    return stagesForFicha[activeFicha].map((stageKey) => {
      const stage = stages.find((s) => s.value === stageKey);
      const isCompleted = completedStages.includes(stage!.value);

      return (
        <View key={stageKey}>
          <CollapsibleStage
            value={stage!.value}
            title={stage?.title || ""}
            icon={stage?.icon}
            completed={isCompleted}
            handleDataConfirmation={() => handleDataConfirmation(stage!.value)}
            completedStages={completedStages}
          >
            {stageQuestions[stageKey as keyof typeof stageQuestions]?.map(
              (q, i) => (
                <YesNoButtonField
                  key={i}
                  question={q.question}
                  yesDescription={q.yesDesc}
                  noDescription={q.noDesc}
                />
              ),
            )}
          </CollapsibleStage>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Envase e Rotulagem"
        returnHref={router.back}
      />
      <FichaTabs active={activeFicha} onSelect={setActiveFicha} />

      <ScrollView contentContainerClassName="p-7 gap-6">
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="text-xl">Volume</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] px-3 rounded-lg h-14">
              <TextInput
                className="text-xl ml-2 flex-1"
                keyboardType="number-pad"
                placeholder="3000"
                value={volume}
                onChangeText={setVolume}
              />
            </View>
          </View>
        </View>

        <DateInput
          questionTitle="Data"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <View className="flex-row justify-between gap-4">
          <HourInput
            questionTitle={`Hora início ${activeFicha}`}
            setSelectedHour={(newTime) =>
              handleFichaTimeChange(activeFicha, "start", newTime)
            }
            selectedHour={fichaTime[activeFicha].start}
          />
          <HourInput
            questionTitle={`Hora fim ${activeFicha}`}
            setSelectedHour={(newTime) =>
              handleFichaTimeChange(activeFicha, "finish", newTime)
            }
            selectedHour={fichaTime[activeFicha].finish}
          />
        </View>

        {renderActiveFicha()}
      </ScrollView>

      <StageProgressFooter
        activeFicha={activeFicha}
        completedStages={completedStages}
        onComplete={() => {
          if (
            volume &&
            selectedDate &&
            fichaTime[activeFicha].start &&
            fichaTime[activeFicha].finish
          ) {
            router.dismissTo("/(tabs)/");
          } else {
            Alert.alert(
              "Atenção !",
              "Existem informações que não foram preenchidas.",
            );
          }
        }}
      />
    </SafeAreaView>
  );
}
