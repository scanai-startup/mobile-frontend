import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import CenteredModal from "@/components/CenteredModal";
import { DefaultButton } from "@/components/DefaultButton";
import { DensTempGraph } from "@/components/DensTempGraph";
import { InputBox } from "@/components/Input";
import SafeAreaView from "@/components/SafeAreaView";
import { useShipmentStore } from "@/store/remessasContext";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRightLeft,
  ChevronDown,
  Cylinder,
  Grape,
  Microscope,
  Milk,
  Pencil,
  TestTubeDiagonal,
  X,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function Tank() {
  const { tank, depositId, content, contentId } = useLocalSearchParams();
  const router = useRouter();
  const { clearShipments } = useShipmentStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      clearShipments();
      return;
    }, []),
  );

  let activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]",
      //type: "tank",
      param: [
        {
          tank: tank as string,
          depositId: Number(depositId),
          content: content,
          contentId: contentId,
        },
      ],
    },
    {
      name: "Análises de deposito",
      icon: <Microscope size="28px" color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/listAnalysis/[listAnalysis]",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Envase e rotulagem",
      icon: <Milk size="28px" color="#000000" />,
      route: "/envaseERotulagem/envase",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Adicionar Vinho Base",
      icon: <Grape size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      //type: "tank",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size="28px" color="#000000" />,
      route: "/(tankControl)/tank/realizarTrasfega/[trasfega]",
      //type: "",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Controle de produtos",
      icon: <TestTubeDiagonal size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addProduct/[addProduct]",
      //type: "tank",
      param: [
        {
          tank: tank as string,
          contentId: contentId,
        },
      ],
    },
  ];

  function filterActivityItems() {
    if (content !== "Vinho" && content !== "Pé de Cuba") {
      return activityListItems.filter((i) => i.name !== "Controle de produtos");
    }
    return activityListItems;
  }

  const shipmentDetailsLink = () => {
    console.log("Navigate to shipment details");
  };

  const analysisData = [
    {
      label: "Densidade",
      value: 996,
      unit: "g/cm³",
    },
    {
      label: "Temperatura",
      value: "20",
      unit: "ºC",
      icon: ChevronDown,
      iconColor: "red",
    },
    {
      label: "Pressão",
      value: "5.7",
      unit: "bar",
      icon: ChevronDown,
      iconColor: "green",
      iconStyle: { transform: [{ rotate: "180deg" }] },
    },
  ];

  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText={`${tank}`}
        returnHref={router.back}
      />
      <ScrollView>
        <View className="flex flex-row justify-between px-7 items-center mb-4">
          <Text className="text-zinc-950 font-bold text-2xl">Ações</Text>
          <View
            className="flex flex-row justify-between items-center gap-4 border p-2 bg-white"
            onTouchStart={() => setIsDialogOpen(true)}
          >
            <Text className="text-blue-500">Editar Tanque</Text>
            <Pencil size="25px" color="black" />
          </View>
          <CenteredModal
            isDialogOpen={isDialogOpen}
            handleDialogClose={() => setIsDialogOpen(false)}
          >
            <View className="px-6 py-10 bg-white rounded-xl relative">
              <X
                style={{ position: "absolute", top: 16, right: 16 }}
                size={35}
                color="black"
                onPress={() => setIsDialogOpen(false)}
              />
              <Text className="text-xl mt-8 mb-4">
                Alterações que podem ser feitas no tanque
              </Text>
              <View className="gap-8">
                <InputBox
                  title="Editar Volume"
                  placeholder="500 (Aqui virá o volume atual)"
                >
                  <Text className="text-xl">L</Text>
                </InputBox>
                <DefaultButton title="Concluir" onPress={() => null} />
              </View>
            </View>
          </CenteredModal>
        </View>
        <FlatList
          data={filterActivityItems()}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <ActivityCard
                title={item.name}
                icon={item.icon}
                route={item.route}
                //type={item.type}
                param={item.param}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 25,
            gap: 10,
          }}
        />
        <View className="px-7 gap-4">
          <View>
            <Card shipment="101 - 2º Talão" detailsLink={shipmentDetailsLink} />
            <AnalysisSummaryCard date="09/08/24" data={analysisData} />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-700 justify-self-start">
              Dados recentes
            </Text>
            <View className="flex-1 bg-gray-100 justify-center items-center">
              <DensTempGraph />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const Card = ({
  shipment,
  detailsLink,
}: {
  shipment: string;
  detailsLink: () => void;
}) => {
  return (
    <View>
      <Text className="text-black font-bold text-xl mb-1 mt-2">
        Remessa (s)
      </Text>
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-gray-500 text-sm mb-1">Remessa associada</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-medium">{shipment}</Text>
          <Text
            className="text-base font-semibold text-blue-500"
            onPress={detailsLink}
          >
            Ver Detalhes
          </Text>
        </View>
      </View>
    </View>
  );
};

const AnalysisSummaryCard = ({ date, data }: { date: string; data: any }) => {
  return (
    <View>
      <Text className="text-lg font-medium text-black mb-1 mt-1">
        Resumo da Última Análise
      </Text>
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-base font-medium text-gray-600">{date}</Text>
        {data.map((item: any, index: number) => (
          <View key={index} className="flex-row justify-between items-center">
            <Text className="text-gray-700">{item.label}</Text>
            <View className="flex-row items-center gap-1">
              {item.icon && (
                <item.icon
                  size="20px"
                  color={item.iconColor}
                  style={item.iconStyle || {}}
                />
              )}
              <Text className="text-lg font-medium text-black">
                {item.value}
              </Text>
              <Text className="text-sm text-gray-600">{item.unit}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
