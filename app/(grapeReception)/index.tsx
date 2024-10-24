import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ScanText } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Modal } from "react-native";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function GrapeReception() {
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos permissão da Camera.</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Garantir permissão.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleHourPickEvent(event: DateTimePickerEvent, date: Date) {
    if (event.type === "set") {
      setSelectedHour(date);
    }
    setIsHourModalOpen(false);
  }

  return (
    <View className="flex-1">
      <View className="flex flex-1 gap-2 px-7 mt-6">
        <DefaultButton
          title="SCANEAR DOCUMENTO"
          icon={<ScanText color="white" />}
          onPress={() => setIsModalOpen(!isModalOpen)}
        />
        <ScrollView
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <DateInput
            questionTitle="Data"
            selectedDate={selectedDate}
            setSelectedDate={(date) => setSelectedDate(date)}
          />
          <View>
            <Text className="text-xl">Número da carrada</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="3°" />
            </View>
          </View>
          <View>
            <Text className="text-xl">Lote</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="101 - AIREN"
              />
            </View>
          </View>
          <View>
            <Text className="text-xl">Horário de saída</Text>
            <View className="flex flex-col justify-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TouchableOpacity onPress={() => setIsHourModalOpen(true)}>
                <Text className="text-xl">
                  {selectedHour.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              {isHourModalOpen && (
                <DateTimePicker
                  mode="time"
                  value={new Date()}
                  onChange={(event, date) => {
                    date ? handleHourPickEvent(event, date) : null;
                  }}
                />
              )}
            </View>
          </View>
          <View>
            <Text className="text-xl">Caixas</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="540" />
              <Text>unidades</Text>
            </View>
          </View>
          <View>
            <Text className="text-xl">Peso</Text>
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
              <TextInput className="text-xl ml-2 flex-1" placeholder="1.450" />
              <Text>kg</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 justify-end items-center bg-black bg-opacity-50">
          <View className="w-full h-[80%] bg-white rounded-xl p-5 ">
            <CameraView
              facing={facing}
              style={{ width: "100%", height: "70%" }}
            >
              <View className="flex-row justify-center mt-5">
                <TouchableOpacity className=" rounded-lg py-4 px-16 mt-5"></TouchableOpacity>
              </View>
            </CameraView>
            <View className="flex flex-1 justify-between pb-5">
              <Text className="text-2xl flex-1 text-center font-medium">
                Aponte a câmera para o centro do documento
              </Text>
              <TouchableOpacity className="bg-blue-500 rounded-lg py-4 px-16 mt-5 items-center">
                <Text className="text-lg font-bold text-white ">
                  Tirar foto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
