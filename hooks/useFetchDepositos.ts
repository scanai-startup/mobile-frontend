import apiInstance from "@/api/apiInstance";
import { Deposito } from "@/types/IDeposito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useFetchDepositos() {
  const [data, setData] = useState<Deposito[]>([]);
  const [loading, setLoading] = useState(true);

  const syncTanksToLocalStorage = async (data: Deposito[]) => {
    try {
      const json = JSON.stringify(data);
      await AsyncStorage.setItem("tanksData", json);
    } catch (err) {
      console.log("Erro ao converter para json: ", err);
    }
  };

  useEffect(() => {
    async function getDepositos() {
      try {
        const token = await SecureStore.getItemAsync("user-token");
        const response = await apiInstance.get(
          "/deposito/getAllDepositosWithInformations",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setData(response.data);
        syncTanksToLocalStorage(response.data);
      } catch (error) {
        console.error("Erro ao buscar depósitos:", error);
      } finally {
        setLoading(false);
      }
    }
    getDepositos();
  }, []);

  return { data, loading };
}
