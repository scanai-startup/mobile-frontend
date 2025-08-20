import { Button } from "@/components/atoms/Button";
import DateInput from "@/components/DateInput";
import ErrorMessage from "@/components/error-message";
import { InputBox } from "@/components/Input";
import { useTokenStore } from "@/features/auth/store/userStore";
import { useToast } from "@/hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { newDailyAnalysisSchema } from "../lib/schemas";
import createNewDailyAnalysis from "../services/create-new-daily-analysis";
import INewDailyAnalysisFormProps from "../types/INewDailyAnalysisFormProps";
import { NewDailyAnalysisFormInputs } from "../types/NewDailyAnalysisFormInputs";

//TODO: lidar com lógica pra pé de cuba (falta endpoint) e vinho (editar form pra receber e validar pressão)
export default function NewDailyAnalysisForm({
  tank,
  content,
  contentId,
}: INewDailyAnalysisFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewDailyAnalysisFormInputs>({
    resolver: yupResolver(newDailyAnalysisSchema),
    defaultValues: {
      date: new Date(),
      temperature: "",
      density: "",
    },
  });
  const { userId } = useTokenStore();
  const toast = useToast();
  const router = useRouter();

  async function onSubmit(formdata: NewDailyAnalysisFormInputs) {
    const data = {
      content: content,
      contentId: contentId,
      userId: userId as number,
      data: formdata.date,
      densidade: formdata.density,
      temperature: formdata.temperature,
    };
    const res = await createNewDailyAnalysis(data);

    if (res.status) {
      router.back();
      return toast({
        heading: "Sucesso",
        message: res.message,
        type: "success",
      });
    }

    return toast({ heading: "Erro!", message: res.message, type: "error" });
  }

  return (
    <View>
      <Text className="text-4xl text-black mt-4 font-bold">{tank}</Text>
      <View>
        <View className="flex gap-4 mt-4">
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <DateInput
                questionTitle="Data"
                selectedDate={value}
                setSelectedDate={(date) => onChange(date)}
                maximumDate={new Date()}
              />
            )}
          />
          {errors.date && <ErrorMessage message={errors.date.message!} />}
          <Controller
            control={control}
            name="density"
            render={({ field: { onBlur, value, onChange } }) => (
              <InputBox
                title="Densidade"
                placeholder="1030"
                keyboardType="number-pad"
                maxLength={10}
                auxText="kg/m³"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.density && <ErrorMessage message={errors.density.message!} />}
          <Controller
            control={control}
            name="temperature"
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, value, onChange } }) => (
              <InputBox
                title="Temperatura"
                keyboardType="number-pad"
                placeholder="24"
                maxLength={10}
                auxText="°C"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.temperature && (
            <ErrorMessage message={errors.temperature.message!} />
          )}
        </View>
      </View>
      <View className="mt-4">
        <Button
          placeholder="Concluir"
          onPress={handleSubmit(onSubmit)}
          variant="secondary"
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}
