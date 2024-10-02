import React from "react";
import { View, TouchableOpacity, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import AppHeader from "@/components/AppHeader";

interface Item {
    id: number | string;
    lote: string;
    produto: string;
    data: string;
    volume: string;
    deposito: string;
  }

const data = [
    {
        id: 1,
        lote: '24116F28',
        produto: 'Cabernet Suave',
        data: '21/07/24',
        volume: '3000 L',
        deposito: '102',
    },
    {
        id: '2',
        lote: '24116F28',
        produto: 'Cabernet Suave',
        data: '21/07/24',
        volume: '3000 L',
        deposito: '102',
    },
    {
        id: '3',
        lote: '24116F28',
        produto: 'Cabernet Suave',
        data: '21/07/24',
        volume: '3000 L',
        deposito: '102',
    },
    {
        id: '4',
        lote: '24116F28',
        produto: 'Cabernet Suave',
        data: '21/07/24',
        volume: '3000 L',
        deposito: '102',
    },
    {
        id: '5',
        lote: '24116F28',
        produto: 'Cabernet Suave',
        data: '21/07/24',
        volume: '3000 L',
        deposito: '102',
    },

];
const Card = ({ item }: { item: Item }) => {
    return(
        <ScrollView className="items-center">
                <View className="w-80 h-56 p-4 shadow rounded-sm bg-white mb-3">
                    <View className="flex-row justify-between items-end mb-4">
                        <Text className="font-medium text-lg">LOTE {item.lote}</Text>
                        <TouchableOpacity><Text className="color-blue-500">Detalhes</Text></TouchableOpacity>
                    </View>
                    <View className="h-0.5 w-full flex-row justify-center bg-neutral-200"/>

                    <View className="flex-row items-end justify-between mb-2">
                        <Text className="font-light">Produto</Text>
                        <Text className="font-medium text-lg">{item.produto}</Text>
                    </View>
                    <View className="flex-row items-end justify-between mb-2">
                        <Text className="font-light">Data</Text>
                        <Text className="font-medium text-lg">{item.data}</Text>
                    </View>
                    <View className="flex-row items-end justify-between mb-2">
                        <Text className="font-light">Volume</Text>
                        <Text className="font-medium text-lg">{item.volume}</Text>
                    </View>
                    <View className="flex-row items-end justify-between mb-2">
                        <Text className="font-light">Depósito</Text>
                        <Text className="font-medium text-lg">{item.deposito}</Text>
                    </View>
                </View>
            </ScrollView>
    );
};
export default function envaseERotulage(){
    return (
        <SafeAreaView className="bg-neutral-200 h-full w-full">
        <AppHeader
        showReturnButton
        variant="secondary"
        mainText="Envase e Rotulagem"
        />
        <View className="items-center h-20">
            <TouchableOpacity className="flex-row m-5 items-center w-80 h-11 bg-blue-500 rounded-xl px-6 py-3"> <AntDesign name="pluscircle" size={24} color="white" /><Text className="text-white font-medium text-base ml-2">ADICIONAR NOVO PROCESSO</Text></TouchableOpacity>
        </View>
        <FlatList 
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card item={item} />}
            contentContainerStyle={{ padding: 16 }}
            />
        </SafeAreaView>
    );
}