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

interface IAddNewBatchDialogProps extends IDialogProps {
  selectedMaterial: {
    id: number;
    name: string;
  };
}

export default function AddNewBatchDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedMaterial,
}: IAddNewBatchDialogProps) {
  const [batchNumber, setBatchNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [supplier, setSupplier] = useState("");
  const toast = useToast();
  function onDialogClose() {
    setBatchNumber("");
    setAmount("");
    setSupplier("");
    setIsDialogOpen(false);
  }
  async function handleAddNewBatch() {
    try {
      const token = await SecureStorage.getItemAsync("user-token");
      const data = {
        fornecedor: supplier,
        numerolote: batchNumber,
        fkmaterial: 1, //TODO: aguardar o retorno da API trazer os IDs de cada material para alterar essa linha para selectedMaterial.id
      };
      apiInstance
        .post("/entradamaterial/register", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast({
            heading: "Sucesso!",
            message: `Lote ${batchNumber} do fornecedor ${supplier} com ${amount} de ${selectedMaterial.name} cadastrado com sucesso.`,
          });
        })
        .catch((err) => {
          toast({
            heading: "Erro",
            message: `Erro ao cadastrar novo lote, por favor tente novamente.`,
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
          Adicionar lote de {selectedMaterial.name.toUpperCase()}.
        </Text>
        <View className="gap-4">
          <InputBox
            title="Número do lote"
            placeholder="03205906001"
            value={batchNumber}
            onChangeText={(v) => setBatchNumber(v)}
            keyboardType="number-pad"
          />
          <InputBox
            title="Quantidade"
            placeholder="500"
            value={amount}
            onChangeText={(v) => setAmount(v)}
            keyboardType="number-pad"
          />
          <InputBox
            title="Nome do fornecedor"
            placeholder="Abrafrutas"
            value={supplier}
            onChangeText={(v) => setSupplier(v)}
          />
        </View>
        <DefaultButton
          title="ADICIONAR NOVO MATERIAL"
          className="mt-4"
          onPress={handleAddNewBatch}
          disabled={amount && batchNumber && supplier ? false : true}
        />
      </View>
    </CenteredModal>
  );
}
