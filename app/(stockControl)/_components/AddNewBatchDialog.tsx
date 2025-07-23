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

interface IAddNewBatchDialogProps extends IDialogProps {
  selectedMaterial: Material;
  setMaterials: Dispatch<SetStateAction<Material[]>>;
}

export default function AddNewBatchDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedMaterial,
  setMaterials,
}: IAddNewBatchDialogProps) {
  const [batchNumber, setBatchNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [supplier, setSupplier] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const toast = useToast();
  function onDialogClose() {
    setBatchNumber("");
    setAmount("");
    setSupplier("");
    setUnitPrice("");
    setIsDialogOpen(false);
  }
  async function handleAddNewBatch() {
    try {
      const token = await SecureStorage.getItemAsync("user-token");
      const payload = {
        fornecedor: supplier,
        numerolote: batchNumber,
      };
      apiInstance
        .post("/lotematerial/register", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          handleMaterialArrival(Number(res.data.id));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Erro ao recuperar token", error);
    }
  }
  async function handleMaterialArrival(batchId: number) {
    try {
      const token = await SecureStorage.getItemAsync("user-token");
      const data = {
        fornecedor: supplier,
        numerolote: batchNumber,
        fkmaterial: selectedMaterial.id,
        qttentrada: amount,
        fklotematerial: batchId,
        dataentrada: new Date().toISOString().slice(0, 10),
        valorunidade: parseFloat(unitPrice),
      };
      apiInstance
        .post("/entradamaterial/register", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          toast({
            heading: "Sucesso!",
            message: `Lote ${batchNumber} do fornecedor ${supplier} com ${amount} de ${selectedMaterial.nome} cadastrado com sucesso.`,
          });
          setMaterials((prev) => {
            return prev.map((m) => {
              if (m.id === data.fkmaterial) {
                return {
                  ...m,
                  quantidade: m.quantidade + data.qttentrada,
                };
              }
              return m;
            });
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
          Adicionar lote de {selectedMaterial.nome.toUpperCase()}.
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
            title="Valor da unidade"
            placeholder="15.50"
            value={unitPrice}
            onChangeText={(v) => setUnitPrice(v)}
            keyboardType="number-pad"
          />
          <InputBox
            title="Nome do fornecedor"
            placeholder="Abrafrutas"
            value={supplier}
            onChangeText={(v) => setSupplier(v)}
          />
        </View>
        <Button
          placeholder="Adicionar novo material"
          buttonClassname="mt-4"
          variant="secondary"
          onPress={handleAddNewBatch}
          disabled={amount && batchNumber && supplier ? false : true}
        />
      </View>
    </CenteredModal>
  );
}
