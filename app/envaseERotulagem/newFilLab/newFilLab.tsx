import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import HourInput from "@/components/HourInput";
import SafeAreaView from "@/components/SafeAreaView";
import YesNoButtonField from "@/components/YesNoButtonField";
import { stageQuestions } from "@/constants/stageQuestions";
import { useRouter } from "expo-router";
import { Droplet, Package, Rows3, Tag } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StageProgressFooter } from "../_components/StageProgressFooter";
import { CollapsibleStage } from "../_components/CollapsibleStage";
import React from "react";
import FichaTabs from "../_components/FichaTabs";

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
        <View className="justify-center p-3 bg-green-100 rounded-lg">
          <Rows3 color="#00A64E" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "depalletization",
    },
    {
      title: "Enchimento",
      icon: (
        <View className="justify-center p-3 bg-red-100 rounded-lg">
          <Droplet color="#EB1203" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "filling",
    },
    {
      title: "Rotulagem",
      icon: (
        <View className="justify-center p-3 bg-purple-100 rounded-lg">
          <Tag color="#8C5EE8" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "labelling",
    },
    {
      title: "Embalamento",
      icon: (
        <View className="justify-center p-3 bg-blue-100 rounded-lg">
          <Package color="#0052FF" />
        </View>
      ),
      description: "Lorem Ipsum",
      value: "packaging",
    },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startHour, setStartHour] = useState(new Date());
  const [finishHour, setFinishHour] = useState(
    new Date(startHour.getTime() + 2 * 60 * 60 * 1000),
  );
  const [volume, setVolume] = useState("");

  const router = useRouter();
  const [activeFicha, setActiveFicha] = useState<"A" | "B">("A");
  const stagesForFicha = {
    A: ["depalletization", "filling"],
    B: ["labelling", "packaging"],
  };
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  const handleDataConfirmation = () => {
    const currentStages = stagesForFicha[activeFicha];

    if (volume && selectedDate && startHour && finishHour) {
      setCompletedStages((prev) => {
        const newCompleted = new Set([...prev]);
        currentStages.forEach((stage) => newCompleted.add(stage));
        return Array.from(newCompleted);
      });
    } else {
      Alert.alert(
        "Dados Incompletos",
        "Por favor, preencha todos os campos antes de confirmar.",
        [{ text: "OK" }],
      );
    }
  };

  const renderActiveFicha = () => {
    return stagesForFicha[activeFicha].map((stageKey) => {
      const stage = stages.find((s) => s.value === stageKey);
      const isCompleted = completedStages.includes(stageKey);

      return (
        <CollapsibleStage
          key={stageKey}
          title={stage?.title || ""}
          icon={stage?.icon}
          completed={isCompleted}
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
      );
    });
  };

  return (
    <>
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
              questionTitle="Hora início"
              setSelectedHour={setStartHour}
              selectedHour={startHour}
            />
            <HourInput
              questionTitle="Hora fim"
              setSelectedHour={setFinishHour}
              selectedHour={finishHour}
            />
          </View>

          {renderActiveFicha()}
          <View className="mt-8 mb-4">
            <TouchableOpacity
              className="py-4 rounded-lg bg-blue-500"
              onPress={handleDataConfirmation}
            >
              <Text className="text-white text-center font-bold text-lg">
                Confirmar Dados preenchidos
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StageProgressFooter
          activeFicha={activeFicha}
          completedStages={completedStages}
          onComplete={() => {
            console.log("Ficha concluída!");
            router.dismissTo("/(tabs)/");
          }}
        />
      </SafeAreaView>
    </>
  );
}
