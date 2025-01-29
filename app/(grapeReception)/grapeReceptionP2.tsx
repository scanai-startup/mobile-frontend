import { InputBox } from "@/components/Input";
import YesNoButtonField from "@/components/YesNoButtonField";
import { useShipmentStore } from "@/store/NewShipmentContext";

import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function GrapeRepectionP2() {
  const { shipmentData, updateShipmentData } = useShipmentStore();

  function handleInputChange(field: string, value: string | number) {
    updateShipmentData({ [field]: value });
  }

  return (
    <View className="flex-1">
      <View className="flex flex-1 gap-2 px-7 mt-6">
        <ScrollView
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <InputBox
            title="Sanidade"
            placeholder="5"
            onChangeText={(value) =>
              handleInputChange("sanidade", parseFloat(value))
            }
            keyboardType="number-pad"
          />

          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <InputBox
                title="SO2"
                placeholder="1.5"
                value={shipmentData.so2}
                onChangeText={(value) => handleInputChange("so2", value)}
                keyboardType="number-pad"
              />
            </View>
            <View className="flex-1">
              <InputBox title="Unidade" placeholder="Unidade" />
            </View>
          </View>
          <InputBox
            title="Tipo de vinho"
            placeholder="ex: VB - Vinho branco"
            value={shipmentData.tipodevinho}
            onChangeText={(value) => handleInputChange("tipodevinho", value)}
          />
          {/* <InputBox title="Cuba n°" placeholder="ex: VB - Vinho branco" /> */}
          <View className="mt-6">
            <Text className="text-3xl font-bold">Condições do caminhão</Text>
            <View className="flex flex-col gap-4">
              <YesNoButtonField
                yesDescription="Bom estado de conservação"
                noDescription="Estado de conservação ruim"
                question="Caminhão em bom estado de conservação?"
              />
              <YesNoButtonField
                yesDescription="Boas condições de higiene"
                noDescription="Condições de higiene ruins"
                question="Caminhão em boas condições de higiene?"
              />
              <YesNoButtonField
                yesDescription="Boas condições de uso"
                noDescription="Condições de uso ruins"
                question="Contentores de uva em boas condições de uso?"
              />
              <YesNoButtonField
                yesDescription="Boas práticas sendo mantidas"
                noDescription="Boas práticas não mantidas"
                question="As boas práticas estão sendo mantidas?"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
