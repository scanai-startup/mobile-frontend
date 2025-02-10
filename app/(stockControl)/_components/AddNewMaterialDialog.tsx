import apiInstance from "@/api/apiInstance";
import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import { InputBox } from "@/components/Input";
import { useToast } from "@/hooks/useToast";
import { IDialogProps } from "@/types/IDialogProps";
import * as SecureStorage from "expo-secure-store";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AddNewMaterialDialog({
  isDialogOpen,
  setIsDialogOpen,
}: IDialogProps) {
  const [materialName, setMaterialName] = useState("");
  const toast = useToast();
  function onDialogClose() {
    setMaterialName("");
    setIsDialogOpen(false);
  }
  async function handleCreateNewMaterial() {
    try {
      const token = await SecureStorage.getItemAsync("user-token");
      const data = {
        nome: materialName,
      };
      apiInstance
        .post("/material/register", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast({
            heading: "Sucesso!",
            message: `Material ${materialName} cadastrado com sucesso.`,
          });
        })
        .catch((err) => {
          toast({
            heading: "Erro",
            message: `Erro ao cadastrar o material ${materialName}, por favor tente novamente.`,
            type: "error",
          });
          console.error(err);
        });
    } catch (err) {
      toast({
        heading: "Erro",
        message: `Erro interno, por favor tente novamente.`,
        type: "error",
      });
      console.error("Erro ao recuperar token", err);
    }
    setIsDialogOpen(false);
  }
  return (
    <CenteredModal
      isDialogOpen={isDialogOpen}
      handleDialogClose={() => {
        onDialogClose();
      }}
    >
      <View className="px-6 py-8 bg-white rounded-xl">
        <View className="flex-1 items-end">
          <TouchableOpacity onPress={onDialogClose}>
            <X size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl text-black font-bold mb-6">
          Criar novo tipo de material.
        </Text>
        <InputBox
          title="Nome do material"
          placeholder="Garrafa Brunet"
          value={materialName}
          onChangeText={(v) => setMaterialName(v)}
        />
        <DefaultButton
          title="Criar novo material"
          className="mt-4"
          onPress={handleCreateNewMaterial}
          disabled={materialName ? false : true}
        />
      </View>
    </CenteredModal>
  );
}
