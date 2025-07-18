import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import IProduct from "../types/IProduct";

export async function getAllProducts(contentId: string): Promise<IProduct[]> {
  const token = await SecureStore.getItemAsync("user-token");

  const res = await apiInstance.get(
    `/produtoadcpedecuba/getAllByPeDeCubaId/${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = res.data;
  const products: IProduct[] = data.map((p: any) => ({
    id: p.id,
    name: p.nome,
    amount: p.quantidade,
    unit: p.unidade,
    updatedDate: new Date(p.updatedAt).toLocaleDateString(),
  }));

  return products;
}
