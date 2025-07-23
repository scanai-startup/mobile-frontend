import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import FilterDrawer from "@/components/molecules/FilterDrawer";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import DepositList from "@/features/deposito/components/deposit-list";
import SearchDepositForm from "@/features/deposito/components/search-deposit-form";
import { getAllDepositsWithInformation } from "@/features/deposito/services/get-all-deposits";
import { IDepositDetailedData } from "@/features/deposito/types/index";
import { useToast } from "@/hooks/useToast";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

export default function TankControl() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState<IDepositDetailedData[]>([]);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const filteredData = search
    ? data.filter((e) => {
        return (
          e.tipoDeposito.toLowerCase().includes(search.toLowerCase()) ||
          e.numeroDeposito.toLowerCase().includes(search.toLowerCase())
        );
      })
    : data;

  async function fetchDeposits() {
    const deposits = await getAllDepositsWithInformation({ toast });
    setData(deposits);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDeposits();
      return;
    }, []),
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppHeader
          showReturnButton
          variant="secondary"
          mainText="Controle de tanques"
          returnHref={"/(tabs)/"}
        />
        <View className="px-7 flex-1">
          <View>
            <Text className="text-4xl text-black font-bold">
              Controle de tanques.
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Lista de todas as informações acessíveis no momento.
            </Text>
          </View>
          <View className="flex flex-row items-center w-full mb-4">
            <SearchDepositForm onSearch={setSearch} />
            <Button
              placeholder="Filtrar"
              onPress={() => setDrawerVisible(true)}
              buttonClassname="ml-2"
              variant="secondary"
            />
          </View>
          <FilterDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          />
          <DepositList deposits={filteredData} />
        </View>
      </SafeAreaView>
    </>
  );
}
