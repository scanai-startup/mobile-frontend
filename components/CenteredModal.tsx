import React, { ReactNode } from "react";
import { Modal, Pressable, View } from "react-native";

interface IModalProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  children?: ReactNode;
}

export default function CenteredModal({
  isDialogOpen,
  children,
  handleDialogClose,
}: IModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      className="bg-[#DEDEDE] py-3 px-3 rounded-b-lg"
      visible={isDialogOpen}
    >
      <View
        className="flex-1"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Pressable
          className="flex-1 relative"
          onPress={() => handleDialogClose()}
        />
        <View className="flex flex-col absolute top-[50%] max-h-[80vh] w-[90vw] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
          {children}
        </View>
      </View>
    </Modal>
  );
}
