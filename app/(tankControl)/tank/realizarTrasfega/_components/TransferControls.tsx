import { InputBox } from "@/components/Input";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TransferControlsProps } from "@/types/ITransferControlsProps";

export default function TransferControls({
  selectedTank,
  volumeTrasfega,
  setVolumeTrasfega,
  volumeChegada,
  setVolumeChegada,
  submitting,
  onTransfer,
}: TransferControlsProps) {
  return (
    <View className="gap-3 mt-2">
      <View className="bg-green-50 p-3 rounded-lg">
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm font-medium text-green-800">
            Capacidade Total
          </Text>
          <Text className="text-sm font-medium text-black-800">
            {selectedTank?.capacidadeDeposito}L
          </Text>
        </View>
        <View className="h-1 bg-green-200 rounded-full">
          <View
            className="h-full bg-green-500 rounded-full"
            style={{
              width: `${(selectedTank?.volumeConteudo / selectedTank?.capacidadeDeposito) * 100}%`,
            }}
          />
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <InputBox
            title="Quantidade a Transferir"
            keyboardType="number-pad"
            onChangeText={(v) =>
              v === "" || setVolumeTrasfega(v.replace(/[^0-9]/g, ""))
            }
            maxLength={5}
          />
        </View>

        <View className="flex-1">
          <InputBox
            title="Quantidade Recebida"
            keyboardType="number-pad"
            onChangeText={(v) =>
              v === "" || setVolumeChegada(v.replace(/[^0-9]/g, ""))
            }
            maxLength={5}
          />
        </View>
      </View>

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center disabled:opacity-60"
        onPress={onTransfer}
        disabled={submitting || !volumeTrasfega || !volumeChegada}
      >
        <Text className="text-white font-bold text-lg">
          {submitting ? "Processando..." : "Confirmar Transferência"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
