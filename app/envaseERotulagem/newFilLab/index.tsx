import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NewProcessScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    batchName: "",
    depositName: "",
  });

  // Verifica se todos os campos estão preenchidos
  const isFormValid = Boolean(
    formData.productName && formData.batchName && formData.depositName,
  );

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;

    router.push("/envaseERotulagem/newFilLab/newFilLab");

    // Lógica de submit aqui
    // setIsLoading(true);
    // try {
    //   const token = await SecureStore.getItemAsync("user-token");
    //   const response = await apiInstance.post("/", formData, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   if (response.status === 201) router.back();
    // } catch (error) {
    //   console.error("Erro ao criar processo:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  }, [formData, isFormValid]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Novo Processo de Envase"
        returnHref={router.back}
      />

      <View className="p-6 flex-1 justify-between">
        <View>
          <Text className="text-4xl text-black">
            Cadastro de um novo processo
          </Text>
          <Text className="text-xl text-gray-600 mb-4">
            Preencha os dados do novo processo
          </Text>
        </View>

        <View className="flex-1 items-center mt-10 gap-4">
          <InputBox
            title="Nome do Produto"
            placeholder="Ex: Vinho Tinto Reserva"
            value={formData.productName}
            onChangeText={(text) => handleInputChange("productName", text)}
          />

          <InputBox
            title="Nome do Lote"
            placeholder="Ex: 2024-001"
            value={formData.batchName}
            onChangeText={(text) => handleInputChange("batchName", text)}
            keyboardType="number-pad"
          />

          <InputBox
            title="Nome do Depósito"
            placeholder="Ex: 101"
            value={formData.depositName}
            onChangeText={(text) => handleInputChange("depositName", text)}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          className={`rounded-lg p-4 items-center justify-center ${
            isFormValid ? "bg-blue-500" : "bg-gray-400"
          }`}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text className="text-white font-semibold text-lg">
            CRIAR PROCESSO
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
