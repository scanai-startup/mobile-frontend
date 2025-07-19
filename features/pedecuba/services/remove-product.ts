import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import IProduct from "../types/IProduct";

export async function handleRemoveProduct(
  id: number,
  name: string,
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  toast: (data: {
    heading: string;
    message: string;
    type?: "error" | "success";
  }) => void,
) {
  try {
    const token = await SecureStore.getItemAsync("user-token");
    await apiInstance.delete(`/produtoadcpedecuba/hardDelete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast({
      heading: "Sucesso",
      message: `${name} removido com sucesso.`,
      type: "success",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch {
    toast({
      heading: "Erro",
      message: `Erro ao remover o produto ${name}, tente novamente.`,
      type: "error",
    });
  }
}
