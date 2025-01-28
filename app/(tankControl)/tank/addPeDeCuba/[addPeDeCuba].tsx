import apiInstance from "@/api/apiInstance";
import AddOrEditProductModal from "@/components/AddOrEditProductModal";
import AppHeader from "@/components/AppHeader";
import DateInput from "@/components/DateInput";
import { DefaultButton } from "@/components/DefaultButton";
import ProductCard from "@/components/ProductCard";
import SafeAreaView from "@/components/SafeAreaView";
import { useTokenStore } from "@/store/userData";
import { useToast } from "@/hooks/useToast";
import IProduct from "@/types/IProduct";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CirclePlus } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function AddPeDeCuba() {
  const router = useRouter();
  const toast = useToast();
  const { tank, depositId } = useLocalSearchParams();
  const [trasfegaDate, setTrasfegaDate] = useState<Date>(new Date());
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
  const [volume, setVolume] = useState<number>();
  const { userId } = useTokenStore();

  function handleProductAction(product: IProduct) {
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
        quantidade: p.amount,
        unidadeDeMedida: p.unit,
      };
    });

    const data = {
      volume: volume,
      depositoId: Number(depositId),
      produtos: productsData,
      funcionarioId: userId,
    };

    apiInstance
      .post("/vinculodepositopedecuba", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        toast({
          heading: "Sucesso",
          message: "Pé de cuba cadastrado com sucesso.",
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
        toast({
          heading: "Erro",
          message: "Erro ao cadastrar o pé de cuba, tente novamente.",
          type: "error",
        });
        console.log(err);
      });
  }
  function handleChangeProductQuantity(product: IProduct, operation: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              amount:
                operation === "add" ? product.amount + 10 : product.amount - 10,
            }
          : p,
      ),
    );
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
          <AddOrEditProductModal
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
              <View className="flex flex-row items-center bg-[#DEDEDE] rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="1.200"
                  onChangeText={(v) => setVolume(Number(v))}
                  keyboardType="number-pad"
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
