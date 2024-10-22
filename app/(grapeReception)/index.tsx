import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ScanText } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GrapeReception() {
  const [isHourModalOpen, setIsHourModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date());

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
    </View>
  );
}
