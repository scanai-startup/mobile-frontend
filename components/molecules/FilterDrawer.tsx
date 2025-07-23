import React, { ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface IFilterDrawerProps {
  visible?: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

export default function FilterDrawer({
  visible = false,
  children,
  onClose,
}: IFilterDrawerProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View className="bg-white p-4 rounded-t-lg">
          <Text className="text-xl font-bold mb-4">Filtros</Text>
          {children}
          <TouchableOpacity onPress={() => onClose(false)}>
            <Text className="text-blue-500">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
