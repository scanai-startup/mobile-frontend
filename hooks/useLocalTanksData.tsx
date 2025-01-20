import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ITankData from "@/types/ITankData";

export function useLocalTanksData() {
  const [tanksData, setTanksData] = useState<ITankData[]>([]);

  const getTanksDataFromLocal = async () => {
    try {
      const data = await AsyncStorage.getItem("tanksData");
      data && setTanksData(JSON.parse(data));
    } catch (err) {
      console.error("Error getting tanks data from local storage: ", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTanksDataFromLocal();
      return;
    }, [])
  );

  return {
    tanksData,
  };
}