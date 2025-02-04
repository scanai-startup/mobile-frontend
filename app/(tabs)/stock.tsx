import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import CenteredModal from "@/components/CenteredModal";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { useToast } from "@/hooks/useToast";
import { useFocusEffect } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { CirclePlus, Search, X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function StockItemsList() {
  const boilerplate = [
    {
      title: "rotulo rosé",
      amount: 68360,
      lastSupplier: "Forn. 1",
      lastBatch: "03205991234",
      lastLoss: 185,
    },
    {
      title: "vinho tinto",
      amount: 45230,
      lastSupplier: "Forn. 2",
      lastBatch: "03205991235",
      lastLoss: 120,
    },
    {
      title: "vinho branco",
      amount: 78900,
      lastSupplier: "Forn. 3",
      lastBatch: "03205991236",
      lastLoss: 200,
    },
    {
      title: "espumante",
      amount: 12345,
      lastSupplier: "Forn. 4",
      lastBatch: "03205991237",
      lastLoss: 50,
    },
  ];
  const [materials, setMaterials] = useState(boilerplate);
  const [isNewMaterialDialogOpen, setIsNewMaterialDialogOpen] = useState(false);
  const [isNewBatchDialogOpen, setIsNewBatchDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({});
  async function getAllMaterials() {
    try {
      const token = await SecureStorage.getItemAsync("user-token");
      apiInstance
        .get("/material/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Erro ao rcuperar token", err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAllMaterials();
      return;
    }, []),
  );
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <AddNewMaterialDialog
        isDialogOpen={isNewMaterialDialogOpen}
        setIsDialogOpen={setIsNewMaterialDialogOpen}
      />
      <AddNewBatchDialog
        isDialogOpen={isNewBatchDialogOpen}
        setIsDialogOpen={setIsNewBatchDialogOpen}
        selectedMaterial={selectedMaterial}
      />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader mainText="Estoque" variant="secondary" showReturnButton />
        <View className="px-7 flex-1 gap-6">
          <DefaultButton
            title="CRIAR NOVO MATERIAL"
            icon={<CirclePlus color="white" />}
            onPress={() => {
              setIsNewMaterialDialogOpen(true);
            }}
          />
          <View className="flex flex-row justify-between">
            <View className="flex-1 flex-row items-center bg-[#DEDEDE] rounded-lg h-14 px-3">
              <Search size="25px" color="#9A9A9A" />
              <TextInput
                onChangeText={(value) => {
                  // filter handling
                }}
                className="text-base ml-2"
                placeholder="Digite o que deseja buscar..."
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              className="bg-[#007BFF] justify-center px-4 rounded-md ml-3"
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "semibold" }}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={materials}
            keyExtractor={(i) => i.title}
            renderItem={({ item }) => {
              return (
                <StockMaterialCard
                  {...item}
                  handleAddButton={() => {
                    setSelectedMaterial({ id: 1, name: item.title });
                    setIsNewBatchDialogOpen(true);
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return <EmptyMaterialListIndicator />;
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

interface IStockMaterialCardProps {
  title: string;
  amount: number;
  lastSupplier: string;
  lastBatch: string;
  lastLoss: number;
  handleAddButton: () => void;
}

function StockMaterialCard({
  title,
  amount,
  lastSupplier,
  lastBatch,
  lastLoss,
  handleAddButton,
}: IStockMaterialCardProps) {
  function showCardDetail(title: string, data: string | number) {
    return (
      <View className="flex-row flex-1 justify-between">
        <Text className="text-xl font-light">{title}</Text>
        <Text className="text-2xl font-semibold">{data}</Text>
      </View>
    );
  }
  return (
    <View className="bg-white rounded-lg shadow flex-col border border-neutral-250 mb-4">
      <View className="flex-row p-4 justify-between items-center">
        <View className="flex-row flex-1 justify-between items-center">
          <Text className="text-2xl font-semibold">{title.toUpperCase()}</Text>
          <TouchableOpacity onPress={handleAddButton}>
            <Text className="text-blue-500">Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full h-[1px] bg-neutral-250" />
      <View className="p-4">
        {showCardDetail("Quantidade", amount)}
        {showCardDetail("Últ. fornecedor", lastSupplier)}
        {showCardDetail("Últ. lote", lastBatch)}
        {showCardDetail("Últ. perca", lastLoss * -1)}
      </View>
    </View>
  );
}

function EmptyMaterialListIndicator() {
  return (
    <View className="flex-1 items-center">
      <Text className="text-lg text-gray-500">
        Não há nenhum material cadastrado.
      </Text>
    </View>
  );
}

interface IDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (state: boolean) => void;
}

function AddNewMaterialDialog({ isDialogOpen, setIsDialogOpen }: IDialogProps) {
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

interface IAddNewBatchDialogProps extends IDialogProps {
  selectedMaterial: {
    id: number;
    name: string;
  };
}

function AddNewBatchDialog({
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
        .post("/lotematerial/register", data, {
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
