import { Button } from "@/components/atoms/Button";
import { InputBox } from "@/components/Input";
import { CirclePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import IProduct from "../types/IProduct";

interface IAddOrEditProductModal {
  product?: IProduct | null;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  handleProductAction: (product: IProduct) => void;
}
export default function AddOrEditProductModal({
  handleCloseDialog,
  product,
  isDialogOpen,
  handleProductAction,
}: IAddOrEditProductModal) {
  const [productUnity, setProductUnity] = useState<"L" | "KG">("L");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  function handleAddProduct() {
    // if the component recieved a product it means that the user is editing a product
    if (product) {
      product = {
        ...product,
        name: productName,
        amount: parseInt(productQuantity),
        unit: productUnity,
      };
      handleProductAction(product);
    } else {
      // otherwise, its adding a product
      const data: IProduct = {
        id: Math.floor(Math.random() * 100),
        name: productName,
        amount: parseInt(productQuantity),
        unit: productUnity,
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
        <View
          className="bg-white px-7 py-5 gap-4 rounded-t-3xl h-[350px]"
          style={{ height: 340 }} //TODO: check why nativewind styles arent being appllied
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="text-zinc-950 font-bold text-3xl mb-1">
              {product ? "Editar produto" : "Novo Produto"}
            </Text>
            <Button
              onPress={() => {
                productUnity === "KG"
                  ? setProductUnity("L")
                  : setProductUnity("KG");
              }}
              placeholder={
                productUnity === "KG" ? "Quilograma (kg)" : "Litro (L)"
              } //TODO: melhorar isso
              variant="secondary"
            />
          </View>
          <View className="justify-between gap-4">
            <InputBox placeholder="Dep. 100" title="Nome do produto" />
            <InputBox
              placeholder="1200"
              title="Quantidade"
              auxText={productUnity}
              className="w-full"
            />
          </View>
          <View className="flex-1 justify-end">
            <Button
              placeholder={product ? "EDITAR PRODUTO" : "ADICIONAR PRODUTO"}
              icon={<CirclePlus color="white" />}
              onPress={() => handleAddProduct()}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
