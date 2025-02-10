import apiInstance from "@/api/apiInstance";
import AddNewBatchDialog from "@/app/(stockControl)/_components/AddNewBatchDialog";
import AddNewMaterialDialog from "@/app/(stockControl)/_components/AddNewMaterialDialog";
import StockMaterialCard from "@/app/(stockControl)/_components/StockMaterialCard";
import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { useFocusEffect } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { CirclePlus, Search } from "lucide-react-native";
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
  const [selectedMaterial, setSelectedMaterial] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });
  const [searchedName, setSearchedName] = useState("");
  const filteredData = materials.filter((m) => {
    return m.title.toLowerCase().includes(searchedName.toLowerCase());
  });

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
                  setSearchedName(value);
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
            data={filteredData}
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

function EmptyMaterialListIndicator() {
  return (
    <View className="flex-1 items-center">
      <Text className="text-lg text-gray-500">
        Não há nenhum material cadastrado.
      </Text>
    </View>
  );
}
