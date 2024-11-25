//! important: need to refac this screen later

import apiInstance from "@/api/apiInstance";
import AddOrEditProductModal from "@/components/AddOrEditProductModal";
import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import ProductCard from "@/components/ProductCard";
import SafeAreaView from "@/components/SafeAreaView";
import { useToast } from "@/hooks/useToast";
import IProduct from "@/types/IProduct";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CirclePlus } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function AddProduct() {
  const router = useRouter();
  const toast = useToast();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
  const { contentId } = useLocalSearchParams();

  async function getAllProducts() {
    const token = await SecureStore.getItemAsync("user-token");
    apiInstance
      .get(`/produtoadcpedecuba/getAllByPeDeCubaId/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        const products: IProduct[] = data.map((p: any) => {
          const formattedDate = new Date(p.updatedAt).toLocaleDateString();
          return {
            id: p.id,
            name: p.nome,
            amount: p.quantidade,
            unit: p.unidade,
            updatedDate: formattedDate,
          };
        });
        setProducts(products);
      })
      .catch(() => {
        toast({
          heading: "Erro",
          message: "Erro ao obter os produtos, por favor tente novamente.",
          type: "error",
        });
      });
  }
  async function handleRemoveProduct(id: number, name: string) {
    const token = await SecureStore.getItemAsync("user-token");
    apiInstance
      .delete(`/produtoadcpedecuba/hardDelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast({ heading: "Sucesso", message: `${name} removido com sucesso.` });
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch(() => {
        toast({
          heading: "Erro",
          message: `Erro ao remover o produto ${name}, tente novamente.`,
          type: "error",
        });
      });
  }
  function onDialogClose() {
    // when closing the dialog this funcion will be called
    setIsModalOpen(false);
    setSelectedProduct(null);
  }
  async function handleProductAction(product: IProduct) {
    // adding or editing any product will trigger this function
    const pIndex = products.findIndex((p) => p.id === product.id);
    const token = await SecureStore.getItemAsync("user-token");
    if (pIndex !== -1) {
      const data = {
        id: product.id,
        fkpedecuba: contentId,
        nome: product.name,
        quantidade: product.amount,
        unidade: product.unit,
      };
      apiInstance
        .put("/produtoadcpedecuba/update", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast({
            heading: "Sucesso",
            message: "Produto editado com sucesso.",
            type: "success",
          });
          setProducts((prev) => {
            const updatedProducts = [...prev];
            updatedProducts[pIndex] = product;
            return updatedProducts;
          });
        })
        .catch((err) => {
          toast({
            heading: "Erro",
            message:
              "Erro ao salvar as alterações do produto, tente novamente.",
            type: "error",
          });
        });
      return;
    }
    apiInstance
      .post(
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast({
          heading: "Sucesso",
          message: `${product.amount} ${product.unit === "KG" ? "kg" : "litros"} de ${product.name} adicionado com sucesso.`,
        });
        setProducts((prev) => prev.map((p, i) => (i === pIndex ? product : p)));
        selectedProduct ? setSelectedProduct(null) : null;
      })
      .catch(() => {
        toast({
          heading: "Erro",
          message: `Erro ao adicionar o produto ${product.name}, tente novamente.`,
          type: "error",
        });
      });
    setProducts((prev) => [...prev, product]);
  }
  useFocusEffect(
    // calls the api everytime the screen gets displayed
    useCallback(() => {
      getAllProducts();
      return;
    }, [])
  );
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText="Controle de produtos"
          showReturnButton
          returnHref={router.back}
        />
        <View className="flex-1 gap-4 px-7 pb-4">
          <AddOrEditProductModal
            handleCloseDialog={() => onDialogClose()}
            isDialogOpen={isModalOpen}
            handleProductAction={(p) => handleProductAction(p)}
            product={selectedProduct ? selectedProduct : null}
          />
          <DefaultButton
            title="ADICIONAR NOVO PRODUTO"
            icon={<CirclePlus color="white" />}
            onPress={() => setIsModalOpen(true)}
          />
          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onRemove={(id: number) => handleRemoveProduct(id, item.name)}
                handleEditProductClick={(v) => {
                  setIsModalOpen(v);
                  setSelectedProduct(item);
                }}
              />
            )}
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 160,
              gap: 10,
              flex: 1,
            }}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500 text-xl text-center mb-4">
                  Não há produtos cadastrados. 🕵️
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}
