import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import DateInput from "@/components/DateInput";
import FormFooter from "@/components/FormFooter";
import HourInput from "@/components/HourInput";
import SafeAreaView from "@/components/SafeAreaView";
import YesNoButtonField from "@/components/YesNoButtonField";
import {
  ChevronsUpDown,
  Droplet,
  Package,
  Rows3,
  Tag,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function newFilLab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startHour, setStartHour] = useState(new Date());
  const [finishHour, setFinishHour] = useState(
    new Date(startHour.getTime() + 2 * 60 * 60 * 1000)
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <AppHeader
          showReturnButton
          variant="secondary"
          mainText="Envase e Rotulagem"
        />
        <ScrollView contentContainerClassName="p-7 gap-6">
          <TouchableOpacity
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-row items-center justify-between bg-[#DEDEDE] py-3 px-3 rounded-lg h-14"
          >
            <Text className="text-xl">Etapas</Text>
            <ChevronsUpDown color="black" />
          </TouchableOpacity>
          {isDropdownOpen ? (
            <Modal
              transparent
              animationType="fade"
              className="bg-[#DEDEDE] py-3 px-3 rounded-b-lg"
            >
              <View className="flex-1">
                <Pressable
                  className="flex-1 bg-black opacity-25"
                  onPress={() => setIsDropdownOpen(false)}
                />
                <View className="bg-white px-10 py-4 gap-4">
                  <TouchableOpacity className="flex-row items-center gap-4">
                    <Rows3 color="green" />
                    <View className="">
                      <Text className="text-2xl font-semibold">
                        Despaletização
                      </Text>
                      <Text className="text-neutral-400">Lorem Ipsum</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-4">
                    <Droplet color="red" />
                    <View className="">
                      <Text className="text-2xl font-semibold">Enchimento</Text>
                      <Text className="text-neutral-400">Lorem Ipsum</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-4">
                    <Tag color="purple" />
                    <View className="">
                      <Text className="text-2xl font-semibold">Rotulagem</Text>
                      <Text className="text-neutral-400">Lorem Ipsum</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-4">
                    <Package color="blue" />
                    <View className="">
                      <Text className="text-2xl font-semibold">
                        Embalamento
                      </Text>
                      <Text className="text-neutral-400">Lorem Ipsum</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            ""
          )}
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="text-xl">Produto</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput className="text-xl ml-2 flex-1" placeholder="1.5" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl">Lote</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput className="text-xl ml-2 flex-1" placeholder="123" />
              </View>
            </View>
          </View>
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <Text className="text-xl">Depósito</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput className="text-xl ml-2 flex-1" placeholder="1.5" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl">Volume</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput className="text-xl ml-2 flex-1" placeholder="3000" />
              </View>
            </View>
          </View>
          <DateInput
            questionTitle="Data"
            selectedDate={selectedDate}
            setSelectedDate={(date) => setSelectedDate(date)}
          />
          <View className="flex-row justify-between gap-4">
            <HourInput
              questionTitle="Hora início"
              setSelectedHour={(date) => setStartHour(date)}
              selectedHour={startHour}
            />
            <HourInput
              questionTitle="Hora fim"
              setSelectedHour={(date) => setFinishHour(date)}
              selectedHour={finishHour}
            />
          </View>
          <View>
            <Text className="text-2xl font-bold">
              Condições de despaletização
            </Text>
            <View className="flex flex-col gap-4">
              <YesNoButtonField
                yesDescription="Bom estado de conservação"
                noDescription="Estado de conservação ruim"
                question="Está em boas condições?"
              />
            </View>
          </View>
          <View>
            <Text className="text-2xl font-bold">Condições de rotulagem</Text>
            <View className="flex flex-col gap-4">
              <YesNoButtonField
                yesDescription="Bom estado de conservação"
                noDescription="Estado de conservação ruim"
                question="Está em boas condições?"
              />
            </View>
          </View>
        </ScrollView>
        <FormFooter nextHref="/" />
      </SafeAreaView>
    </>
  );
}
