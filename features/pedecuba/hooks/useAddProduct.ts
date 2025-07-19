import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { getAllProducts } from "../services/get-all-products";
import { useToast } from "@/hooks/useToast";
import IProduct from "../types/IProduct";
import { CloseDialog } from "../functions/close-dialog";

export default function useAddProducts() {
  const router = useRouter();
  const toast = useToast();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { contentId } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        if (typeof contentId !== "string") return;
        try {
          const products = await getAllProducts(contentId);
          setProducts(products);
        } catch (err) {
          toast({
            heading: "Erro",
            message: "Erro ao buscar produtos",
            type: "error",
          });
        }
      };

      fetchProducts();
    }, [contentId]),
  );

  function closeDialog() {
    CloseDialog(setIsModalOpen, setSelectedProduct);
  }

  return {
    products,
    selectedProduct,
    contentId,
    isModalOpen,
    setIsModalOpen,
    toast,
    router,
    setProducts,
    setSelectedProduct,
    closeDialog,
  };
}
