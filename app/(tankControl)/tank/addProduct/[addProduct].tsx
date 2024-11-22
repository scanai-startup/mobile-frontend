//! important: need to refac this screen later

import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { useToast } from "@/hooks/useToast";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CirclePlus, CircleX, Pencil } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
interface IProduct {
  id: number;
  name: string;
  amount: number;
  unit: "KG" | "L";
  updatedDate: string;
}

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
      })
      .catch(() => {
        toast({
          heading: "Erro",
          message: `Erro ao remover o produto ${name}, tente novamente.`,
          type: "error",
        });
      })
      .finally(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
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
          <ProductInfoModal
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
interface IProdCard {
  product: IProduct;
  onRemove: (id: number) => void;
  handleEditProductClick: (value: boolean) => void;
}
function ProductCard({ product, onRemove, handleEditProductClick }: IProdCard) {
  return (
    <View className="flex-row justify-between items-center bg-white p-6 rounded-md">
      <View className="flex-row flex-1 items-center gap-3">
        <TouchableOpacity
          className="p-2 bg-blue-100 rounded-lg"
          onPress={() => handleEditProductClick(true)}
        >
          <Pencil color="blue" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-semibold max-w-52" numberOfLines={1}>
            {product.amount} {product.unit === "KG" ? "kg" : "L"} de{" "}
            {product.name}
          </Text>
          <View className="flex-row justify-between pr-2">
            <Text className="text-sm">{product.updatedDate}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(product.id)}>
        <CircleX color="white" size="32" fill="#F87171" />
      </TouchableOpacity>
    </View>
  );
}

interface ProductInfoModalP {
  product?: IProduct | null;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  handleProductAction: (product: IProduct) => void;
}
function ProductInfoModal({
  handleCloseDialog,
  product,
  isDialogOpen,
  handleProductAction,
}: ProductInfoModalP) {
  const [productUnity, setProductUnity] = useState<"L" | "KG">("L");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  function handleAddProduct() {
    // if the component recieved a product it means that the user is editing a product
    const date = new Date().toLocaleDateString();
    if (product) {
      product = {
        ...product,
        name: productName,
        amount: parseInt(productQuantity),
        unit: productUnity,
        updatedDate:
          date.slice(0, date.length - 4) + date.slice(8, date.length),
      };
      handleProductAction(product);
    } else {
      // otherwise, its adding a product
      const data: IProduct = {
        id: Math.floor(Math.random() * 100), //!important: we need ids to control the items rendering, maybe using uuid?
        name: productName,
        amount: parseInt(productQuantity),
        unit: productUnity,
        updatedDate:
          date.slice(0, date.length - 4) + date.slice(8, date.length),
      };
      handleProductAction(data);
    }
    onDialogClose();
  }

  function onDialogClose() {
    // function to clear all the input values and close the dialog
    setProductName("");
    setProductQuantity("");
    handleCloseDialog();
  }

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductQuantity(String(product.amount));
    }
  }, [product]);

  return (
    <Modal
      transparent
      animationType="fade"
      className="bg-[#DEDEDE] py-3 px-3 rounded-b-lg"
      visible={isDialogOpen}
    >
      <View
        className="flex-1"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Pressable className="flex-1" onPress={() => onDialogClose()} />
        <View className="bg-white px-7 py-5 gap-4 rounded-t-3xl h-[350px]">
          <Text className="text-zinc-950 font-bold text-3xl mb-1">
            {product ? "Editar produto" : "Novo Produto"}
          </Text>
          <View className="justify-between gap-4">
            <View>
              <Text className="text-xl">Nome do produto</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="Dep.100"
                  value={productName}
                  onChangeText={(v) => setProductName(v)}
                />
              </View>
            </View>
            <View>
              <Text className="text-xl">Quantidade</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="1.200"
                  value={productQuantity}
                  onChangeText={(v) => setProductQuantity(v)}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => {
                    productUnity === "KG"
                      ? setProductUnity("L")
                      : setProductUnity("KG");
                  }}
                >
                  <Text className="text-lg">
                    {productUnity === "KG" ? "kg" : "L"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex-1 justify-end">
            <DefaultButton
              title={product ? "EDITAR PRODUTO" : "ADICIONAR PRODUTO"}
              icon={<CirclePlus color="white" />}
              onPress={() => handleAddProduct()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
