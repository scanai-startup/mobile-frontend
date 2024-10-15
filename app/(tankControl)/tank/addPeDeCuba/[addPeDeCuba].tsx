import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import SafeAreaView from "@/components/SafeAreaView";
import { useLocalSearchParams } from "expo-router";
import { CirclePlus, CircleX, Minus, Pencil, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
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
  unity: string;
  dateAdded: string;
  hourAdded: string;
}
export default function AddPeDeCuba() {
  const { tank } = useLocalSearchParams();
  const [trasfegaDate, setTrasfegaDate] = useState<Date>(new Date());
  const [data, setData] = useState<ProductData[]>([
    {
      id: 1,
      name: "Dep.100",
      quantity: 900,
      unity: "liters",
      dateAdded: "08/07/25",
      hourAdded: "11:15",
    },
    {
      id: 2,
      name: "Dap.",
      quantity: 800,
      unity: "liters",
      dateAdded: "08/07/25",
      hourAdded: "12:30",
    },
    {
      id: 3,
      name: "Nutristat",
      quantity: 20,
      unity: "kilogram",
      dateAdded: "08/07/25",
      hourAdded: "13:45",
    },
    {
      id: 4,
      name: "Zoc",
      quantity: 10,
      unity: "kilogram",
      dateAdded: "08/07/25",
      hourAdded: "15:00",
    },
    {
      id: 5,
      name: "Dep.200",
      quantity: 100,
      unity: "liters",
      dateAdded: "12/08/25",
      hourAdded: "18:15",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>();

  function handleProductAction(product: ProductData) {
    const pIndex = data.findIndex((p) => p.id === product.id);
    if (pIndex !== -1) {
      setData((prev) => prev.map((p, i) => (i === pIndex ? product : p)));
      setSelectedProduct(null);
      return;
    }
    setData((prev) => [...prev, product]);
  }
  function onDialogClose() {
    setIsModalOpen(false);
    selectedProduct ?? setSelectedProduct(null);
  }

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, gap: 20 }}
        edges={["right", "bottom", "left"]}
      >
        <AppHeader
          variant="secondary"
          mainText="Adicionar Pé de Cuba"
          showReturnButton
        />
        <View className="flex-1 gap-4 px-7 pb-4">
          <ProductInfoModal
            handleCloseDialog={() => onDialogClose()}
            isDialogOpen={isModalOpen}
            handleSetProduct={(p) => handleProductAction(p)}
            product={selectedProduct ? selectedProduct : null}
          />
          <DateInput
            questionTitle="Data da trasfega"
            selectedDate={trasfegaDate}
            setSelectedDate={(date) => setTrasfegaDate(date)}
          />
          <View className="flex-row justify-between gap-8">
            <View className="flex-1">
              <Text className="text-xl">Dep. N°</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  value={tank as string}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl">Litros</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="1.200"
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
            data={data}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onRemove={(id: number) =>
                  setData((prev) => prev.filter((p) => p.id !== id))
                }
                handleEditProductClick={(v) => {
                  setIsModalOpen(v);
                  setSelectedProduct(item);
                }}
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
        </View>
      </SafeAreaView>
    </>
  );
}

interface ProductCardP {
  product: ProductData;
  onRemove: (id: number) => void;
  handleEditProductClick: (v: boolean) => void;
}
export function ProductCard({
  product,
  onRemove,
  handleEditProductClick,
}: ProductCardP) {
  return (
    <View className="flex-row justify-between items-center bg-white p-6 rounded-md">
      <View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="p-2 bg-blue-100 rounded-lg"
            onPress={() => handleEditProductClick(true)}
          >
            <Pencil color="blue" />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Plus color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Minus color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-xl font-semibold max-w-52">
              {product.quantity} {product.unity === "liters" ? "litros" : "kg"}{" "}
              de {product.name}
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-sm">{product.dateAdded}</Text>
              <Text className="text-sm">{product.hourAdded}</Text>
            </View>
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
  handleSetProduct: (product: ProductData) => void;
}
export function ProductInfoModal({
  handleCloseDialog,
  product,
  isDialogOpen,
  handleSetProduct,
}: ProductInfoModalP) {
  const [productUnity, setProductUnity] = useState<"liters" | "kilogram">(
    "kilogram"
  );
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  function handleAddProduct() {
    if (product) {
      product = {
        ...product,
        name: productName,
        quantity: parseInt(productQuantity),
        unity: productUnity,
      };
      handleSetProduct(product);
    } else {
      const data: ProductData = {
        id: Math.floor(Math.random() * 100),
        name: productName,
        quantity: parseInt(productQuantity),
        unity: productUnity,
        dateAdded: "08/07/25",
        hourAdded: "11:15",
      };
      handleSetProduct(data);
    }
    onDialogClose();
  }
  function onDialogClose() {
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
                />
                <TouchableOpacity
                  onPress={() => {
                    productUnity === "kilogram"
                      ? setProductUnity("liters")
                      : setProductUnity("kilogram");
                  }}
                >
                  <Text className="text-lg">
                    {productUnity === "kilogram" ? "kg" : "litros"}
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
