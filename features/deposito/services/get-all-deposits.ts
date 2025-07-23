import apiInstance from "@/api/apiInstance";
import { useToast } from "@/hooks/useToast";
import * as SecureStore from "expo-secure-store";
import IDepositDetailedData from "../types/IDepositDetailedData";

export interface IGetAllDepositsWithInformationFunc {
  toast: ReturnType<typeof useToast>;
}

export async function getAllDepositsWithInformation({
  toast,
}: IGetAllDepositsWithInformationFunc) {
  try {
    const token = await SecureStore.getItemAsync("user-token");
    const res = await apiInstance.get(
      "/deposito/getAllDepositosWithInformations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const deposits: IDepositDetailedData[] = res.data;

    return deposits;
  } catch (error) {
    console.error("Erro ao buscar depósitos:", error);
    toast({
      heading: "Erro",
      message: "Houve um erro ao buscar os depósitos, tente novamente.",
      type: "error",
    });
    return [];
  }
}
