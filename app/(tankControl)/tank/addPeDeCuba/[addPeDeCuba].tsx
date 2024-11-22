import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { useTokenStore } from "@/context/userData";
import { useToast } from "@/hooks/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CirclePlus, CircleX, Minus, Pencil, Plus } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductData {
  id: number;
  name: string;
  quantity: number;
  unity: "L" | "KG";
  dateAdded: string;
  hourAdded: string;
}
export default function AddPeDeCuba() {
  const router = useRouter();
  const toast = useToast();
  const { tank, depositId } = useLocalSearchParams();
  const [trasfegaDate, setTrasfegaDate] = useState<Date>(new Date());
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>();
  const [volume, setVolume] = useState<number>();
  const { userId } = useTokenStore();
  const lastProductUpdateRef = useRef<{
    [key: number]: { date: string; hour: string };
  }>({});

  function handleProductAction(product: ProductData) {
    // adding or editing any product will trigger this function
    const pIndex = products.findIndex((p) => p.id === product.id);
    if (pIndex !== -1) {
      setProducts((prev) => prev.map((p, i) => (i === pIndex ? product : p)));
      selectedProduct ? setSelectedProduct(null) : null;
      return;
    }
    setProducts((prev) => [...prev, product]);
  }

  function onDialogClose() {
    // when closing the dialog this funcion will be called
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  async function handleAddPeDeCuba() {
    const token = await SecureStore.getItemAsync("user-token");
    const productsData = products.map((p) => {
      return {
        nome: p.name,
        quantidade: p.quantity,
        unidadeDeMedida: p.unity,
      };
    });
    const data = {
      fkdeposito: depositId,
      fkfuncionario: userId,
      datainicio: trasfegaDate.toISOString(),
      volume: volume,
      produtos: productsData,
    };
    apiInstance
      .post("/pedecuba/register", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        toast({
          heading: "Sucesso",
          message: "Pé de cuba cadastrado com sucesso",
          type: "success",
        });
        router.navigate({
          pathname: "/tank/[tank]",
          params: {
            tank: tank as string,
            depositId: depositId,
            content: "Pé de Cuba",
            contentId: data.id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChangeProductQuantity(
    product: ProductData,
    operation: string
  ) {
    const currHour = new Date().toLocaleTimeString();
    const currDate = new Date().toLocaleDateString();
    const formatedHour = currHour.slice(0, currHour.length - 6);
    const formatedDate =
      currDate.slice(0, currDate.length - 4) +
      currDate.slice(8, currDate.length);
    const lastUpdate = lastProductUpdateRef.current[product.id] || {};

    if (lastUpdate.date === formatedDate && lastUpdate.hour === formatedHour) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity:
                  operation === "add"
                    ? product.quantity + 10
                    : product.quantity - 10,
              }
            : p
        )
      );
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity:
                  operation === "add"
                    ? product.quantity + 10
                    : product.quantity - 10,
                hourAdded: formatedHour,
                dateAdded: formatedDate,
              }
            : p
        )
      );
      lastProductUpdateRef.current[product.id] = {
        date: formatedDate,
        hour: formatedHour,
      };
    }
  }

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText="Adicionar Pé de Cuba"
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
          <DateInput
            questionTitle="Data da trasfega"
            selectedDate={trasfegaDate}
            setSelectedDate={(date) => setTrasfegaDate(date)}
          />
          <View className="flex-row justify-between gap-8">
            <View className="flex-1">
              <Text className="text-xl">Litros</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="1.200"
                  onChangeText={(v) => setVolume(Number(v))}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <Text className="text-zinc-950 font-bold text-3xl mb-1">
            Produtos
          </Text>
          <DefaultButton
            title="ADICIONAR NOVO PRODUTO"
            icon={<CirclePlus color="white" />}
            onPress={() => setIsModalOpen(true)}
          />
          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onRemove={(id: number) =>
                  setProducts((prev) => prev.filter((p) => p.id !== id))
                }
                handleEditProductClick={(v) => {
                  setIsModalOpen(v);
                  setSelectedProduct(item);
                }}
                onChangeProductQuantity={(op: string) =>
                  handleChangeProductQuantity(item, op)
                }
              />
            )}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 10,
            }}
            ListEmptyComponent={
              <View className="items-center">
                <Text className="text-xl">Lista vazia</Text>
              </View>
            }
          ></FlatList>
          <DefaultButton title="CONCLUIR" onPress={() => handleAddPeDeCuba()} />
        </View>
      </SafeAreaView>
    </>
  );
}

interface ProductCardP {
  product: ProductData;
  onRemove: (id: number) => void;
  handleEditProductClick: (v: boolean) => void;
  onChangeProductQuantity: (operation: string) => void;
}
export function ProductCard({
  product,
  onRemove,
  handleEditProductClick,
  onChangeProductQuantity,
}: ProductCardP) {
  return (
    <View className="flex-row justify-between items-center bg-white p-6 rounded-md">
      <View className="flex-row flex-1 items-center gap-3">
        <TouchableOpacity
          className="p-2 bg-blue-100 rounded-lg"
          onPress={() => handleEditProductClick(true)}
        >
          <Pencil color="blue" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => onChangeProductQuantity("add")}>
            <Plus color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChangeProductQuantity("minus")}
            disabled={product.quantity <= 0}
          >
            <Minus color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-semibold max-w-52" numberOfLines={1}>
            {product.quantity} {product.unity === "KG" ? "kg" : "L"} de{" "}
            {product.name}
          </Text>
          <View className="flex-row justify-between pr-2">
            <Text className="text-sm">{product.dateAdded}</Text>
            <Text className="text-sm">{product.hourAdded}</Text>
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
  product?: ProductData | null;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  handleProductAction: (product: ProductData) => void;
}
export function ProductInfoModal({
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
    const addedHour = new Date().toLocaleTimeString();
    const addedDate = new Date().toLocaleDateString();
    if (product) {
      product = {
        ...product,
        name: productName,
        quantity: parseInt(productQuantity),
        unity: productUnity,
        dateAdded:
          addedDate.slice(0, addedDate.length - 4) +
          addedDate.slice(8, addedDate.length),
        hourAdded: addedHour.slice(0, addedHour.length - 6),
      };
      handleProductAction(product);
    } else {
      // otherwise, its adding a product
      const data: ProductData = {
        id: Math.floor(Math.random() * 100), //!important: we need ids to control the items rendering, maybe using uuid?
        name: productName,
        quantity: parseInt(productQuantity),
        unity: productUnity,
        dateAdded:
          addedDate.slice(0, addedDate.length - 4) +
          addedDate.slice(8, addedDate.length),
        hourAdded: addedHour.slice(0, addedHour.length - 6),
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
      setProductQuantity(String(product.quantity));
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
