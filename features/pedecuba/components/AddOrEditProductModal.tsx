import { DefaultButton } from "@/components/DefaultButton";
import IProduct from "../types/IProduct";
import { CirclePlus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
        <View className="bg-white px-7 py-5 gap-4 rounded-t-3xl h-[350px]">
          <Text className="text-zinc-950 font-bold text-3xl mb-1">
            {product ? "Editar produto" : "Novo Produto"}
          </Text>
          <View className="justify-between gap-4">
            <View>
              <Text className="text-xl">Nome do produto</Text>
              <View className="flex flex-row items-center bg-[#DEDEDE] rounded-lg h-14">
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
              <View className="flex flex-row items-center bg-[#DEDEDE] rounded-lg h-14">
                <TextInput
                  className="text-xl ml-2 flex-1"
                  placeholder="1.200"
                  value={productQuantity}
                  onChangeText={(v) => setProductQuantity(v)}
                  keyboardType="number-pad"
                />
                <TouchableOpacity
                  onPress={() => {
                    productUnity === "KG"
                      ? setProductUnity("L")
                      : setProductUnity("KG");
                  }}
                >
                  <Text className="text-lg mr-1">
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
