import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import * as SecureStore from "expo-secure-store";
import { validateField } from "@/hooks/validateField";
import { useTokenStore } from "@/features/auth/store/userStore";
import { getAnalysisConfig } from "@/features/analisediaria/utils/get-analisys-config";
import { createAnalysis } from "../services/createAnalysis";

export function useDailyAnalysisForm() {
  const { tank, content, contentId } = useLocalSearchParams();
  const router = useRouter();
  const toast = useToast();
  const { userId } = useTokenStore();

  const [date, setDate] = useState<Date>(new Date());
  const [density, setDensity] = useState("");
  const [temperature, setTemperature] = useState("");

  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync("user-token");

    if (!validateField(temperature, "Preencha a temperatura para prosseguir"))
      return;
    if (!validateField(density, "Preencha a densidade para prosseguir")) return;

    const config = getAnalysisConfig(
      content as string,
      contentId as string,
      String(userId!),
      density,
      date,
      temperature,
    );

    if (!config) {
      toast({
        heading: "Erro",
        message: "Tipo de conteúdo inválido.",
        type: "error",
      });
      return;
    }

    try {
      await createAnalysis(config.endpoint, config.payload, token);

      toast({
        heading: "Sucesso",
        message: "Nova análise criada com sucesso.",
        type: "success",
      });

      router.back();
    } catch {
      toast({
        heading: "Erro",
        message: "A análise não pôde ser criada, tente novamente.",
        type: "error",
      });
    }
  };

  return {
    tank,
    date,
    setDate,
    density,
    setDensity,
    temperature,
    setTemperature,
    handleSubmit,
    router,
  };
}
