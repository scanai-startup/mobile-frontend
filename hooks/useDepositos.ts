import { useEffect, useState } from "react";
import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import { Deposito } from "@/types/IDeposito";

export function useDepositos() {
  const [data, setData] = useState<Deposito[]>([]);
  const [loading, setLoading] = useState(true);

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
