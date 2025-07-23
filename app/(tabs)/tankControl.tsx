import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/atoms/Button";
import FilterDrawer from "@/components/molecules/FilterDrawer";
import SafeAreaView from "@/components/SafeAreaView";
import StatusBar from "@/components/StatusBar";
import DepositList from "@/features/deposito/components/deposit-list";
import SearchDepositForm from "@/features/deposito/components/search-deposit-form";
import useManageDeposits from "@/features/deposito/hooks/useManageDeposits";
import React from "react";
import { Text, View } from "react-native";

export default function TankControl() {
  const { filteredData, isDrawerVisible, setIsDrawerVisible, setSearch } =
    useManageDeposits();

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
              onPress={() => setIsDrawerVisible(true)}
              buttonClassname="ml-2"
              variant="secondary"
            />
          </View>
          <FilterDrawer
            visible={isDrawerVisible}
            onClose={() => setIsDrawerVisible(false)}
          />
          <DepositList deposits={filteredData} />
        </View>
      </SafeAreaView>
    </>
  );
}
