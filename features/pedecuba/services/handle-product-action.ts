// services/handle-product-action.ts
import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import IProduct from "../types/IProduct";

type ToastFn = (data: {
  heading: string;
  message: string;
  type?: "error" | "success";
}) => void;

export async function handleProductAction(
  product: IProduct,
  contentId: string,
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  setSelectedProduct: (p: IProduct | null) => void,
  toast: ToastFn,
) {
  const pIndex = products.findIndex((p) => p.id === product.id);
  const token = await SecureStore.getItemAsync("user-token");

  if (!token) {
    toast({
      heading: "Erro",
      message: "Token não encontrado. Faça login novamente.",
      type: "error",
    });
    return;
  }

  if (pIndex !== -1) {
    // Produto já existe, atualiza
    try {
      await apiInstance.put(
        "/produtoadcpedecuba/update",
        {
          id: product.id,
          fkpedecuba: contentId,
          nome: product.name,
          quantidade: product.amount,
          unidade: product.unit,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast({
        heading: "Sucesso",
        message: "Produto editado com sucesso.",
        type: "success",
      });

      setProducts((prev) => {
        const updated = [...prev];
        updated[pIndex] = product;
        return updated;
      });

      setSelectedProduct(null);
    } catch {
      toast({
        heading: "Erro",
        message: "Erro ao editar o produto. Tente novamente.",
        type: "error",
      });
    }
  } else {
    // Produto novo
    try {
      await apiInstance.post(
        "/produtoadcpedecuba/register",
        {
          fkpedecuba: contentId,
          produtos: [
            {
              nome: product.name,
              quantidade: product.amount,
              unidadeDeMedida: product.unit,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast({
        heading: "Sucesso",
        message: `${product.amount} ${product.unit === "KG" ? "kg" : "litros"} de ${product.name} adicionado com sucesso.`,
        type: "success",
      });

      setProducts((prev) => [...prev, product]);
      setSelectedProduct(null);
    } catch {
      toast({
        heading: "Erro",
        message: `Erro ao adicionar o produto ${product.name}.`,
        type: "error",
      });
    }
  }
}
