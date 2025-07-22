import apiInstance from "@/api/apiInstance";
import { Button } from "@/components/atoms/Button";
import CenteredModal from "@/components/CenteredModal";
import { InputBox } from "@/components/Input";
import { useToast } from "@/hooks/useToast";
import { IDialogProps } from "@/types/IDialogProps";
import { Material } from "@/types/IMaterial";
import * as SecureStorage from "expo-secure-store";
import { X } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IAddNewMaterialDialogProps extends IDialogProps {
  setMaterials: Dispatch<SetStateAction<Material[]>>;
}

export default function AddNewMaterialDialog({
  isDialogOpen,
  setIsDialogOpen,
  setMaterials,
}: IAddNewMaterialDialogProps) {
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
        .then((res) => {
          toast({
            heading: "Sucesso!",
            message: `Material ${materialName} cadastrado com sucesso.`,
          });
          setMaterials((prev) => {
            return [...prev, { ...res.data, quantidade: 0 }];
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
    onDialogClose();
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
        <Button
          placeholder="Criar novo material"
          buttonClassname="mt-4"
          variant="secondary"
          onPress={handleCreateNewMaterial}
          disabled={materialName ? false : true}
        />
      </View>
    </CenteredModal>
  );
}
