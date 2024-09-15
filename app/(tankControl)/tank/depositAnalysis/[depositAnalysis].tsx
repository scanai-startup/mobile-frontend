import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import SafeAreaView from "@/components/SafeAreaView";
import AppHeader from "@/components/AppHeader";

export default function depositAnalysis() {
  const { tank } = useLocalSearchParams();

  const [date, setDate] = useState("09/07/24");
  const [densityValue, setDensityValue] = useState("1030");
  const [densityUnit, setDensityUnit] = useState("kg/m³");
  const [temperatureValue, setTemperatureValue] = useState("12");
  const [temperatureUnit, setTemperatureUnit] = useState("°C");

  return (
    <SafeAreaView className="flex-1">
      <AppHeader
        mainText={`analise : ${tank}`}
        variant="secondary"
        showReturnButton
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de registro</Text>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={setDate}
            className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Densidade</Text>
        <View style={styles.doubleInputWrapper}>
          <TextInput
            style={styles.input}
            value={densityValue}
            onChangeText={setDensityValue}
            keyboardType="numeric"
            className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
          />
          <TextInput
            style={[styles.unitInput, styles.unitInputMargin]}
            value={densityUnit}
            onChangeText={setDensityUnit}
            className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Temperatura</Text>
        <View style={styles.doubleInputWrapper}>
          <TextInput
            style={styles.input}
            value={temperatureValue}
            onChangeText={setTemperatureValue}
            keyboardType="numeric"
            className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
          />
          <TextInput
            style={[styles.unitInput, styles.unitInputMargin]}
            value={temperatureUnit}
            onChangeText={setTemperatureUnit}
            className="border border-[#BDBDBD] h-12 w-full p-2 rounded-md placeholder:text-[#BDBDBD]"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Concluir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  dateInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: "#D4D4D4",
  },
  doubleInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    gap: 16,
  },
  input: {
    flex: 3,
    height: 40,
    fontSize: 16,
    backgroundColor: "#D4D4D4",
  },
  unitInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: "#D4D4D4",
  },
  unitInputMargin: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
