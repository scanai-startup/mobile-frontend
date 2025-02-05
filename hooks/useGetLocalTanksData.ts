import { Deposito } from "@/types/IDeposito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useGetLocalTanksData() {
  const [data, setData] = useState<Deposito[]>([]);

  const getTanksDataFromLocal = async () => {
    try {
      const data = await AsyncStorage.getItem("tanksData");
      data && setData(JSON.parse(data));
    } catch (err) {
      console.error("Error getting tanks data from local storage: ", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTanksDataFromLocal();
      return;
    }, []),
  );

  return {
    data,
  };
}
