import apiInstance from "@/api/apiInstance";
import AddNewBatchDialog from "@/app/(stockControl)/_components/AddNewBatchDialog";
import AddNewMaterialDialog from "@/app/(stockControl)/_components/AddNewMaterialDialog";
import StockMaterialCard from "@/app/(stockControl)/_components/StockMaterialCard";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import { Material } from "@/types/IMaterial";
import { useFocusEffect } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { CirclePlus, Search } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function StockItemsList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isNewMaterialDialogOpen, setIsNewMaterialDialogOpen] = useState(false);
  const [isNewBatchDialogOpen, setIsNewBatchDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>({
    id: 0,
    nome: "",
    quantidade: 0,
  });
  const [searchedName, setSearchedName] = useState("");
  const filteredData = materials.filter((m) => {
    return m.nome.toLowerCase().includes(searchedName.toLowerCase());
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
          setMaterials(res.data);
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
      <StatusBar barStyle="dark-content" />
      <AddNewMaterialDialog
        isDialogOpen={isNewMaterialDialogOpen}
        setIsDialogOpen={setIsNewMaterialDialogOpen}
        setMaterials={setMaterials}
      />
      <AddNewBatchDialog
        isDialogOpen={isNewBatchDialogOpen}
        setIsDialogOpen={setIsNewBatchDialogOpen}
        selectedMaterial={selectedMaterial}
        setMaterials={setMaterials}
      />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader mainText="Estoque" variant="secondary" showReturnButton />
        <View className="px-7 flex-1 gap-6">
          <Button
            placeholder="Criar novo material"
            icon={<CirclePlus color="white" />}
            onPress={() => {
              setIsNewMaterialDialogOpen(true);
            }}
            variant="secondary"
          />
          <View className="flex flex-row justify-between">
            <InputBox
              icon={Search}
              placeholder="Pesquise pelo material"
              className="flex-1"
              onChangeText={(value) => {
                setSearchedName(value);
              }}
            />
            <Button
              placeholder="Filtrar"
              buttonClassname="ml-2"
              variant="secondary"
            />
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => {
              return (
                <StockMaterialCard
                  {...item}
                  handleAddButton={() => {
                    setSelectedMaterial(item);
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
