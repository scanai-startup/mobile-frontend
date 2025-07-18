import IProduct from "../types/IProduct";
import { CircleX, Minus, Pencil, Plus } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IProductCard {
  product: IProduct;
  onRemove: (id: number) => void;
  handleEditProductClick: (v: boolean) => void;
  onChangeProductQuantity?: null | ((operation: string) => void);
}
export default function ProductCard({
  product,
  onRemove,
  handleEditProductClick,
  onChangeProductQuantity = null,
}: IProductCard) {
  return (
    <View className="flex-row justify-between items-center bg-white p-6 rounded-md">
      <View className="flex-row flex-1 items-center gap-3">
        <TouchableOpacity
          className="p-2 bg-blue-100 rounded-lg"
          onPress={() => handleEditProductClick(true)}
        >
          <Pencil color="blue" />
        </TouchableOpacity>
        {onChangeProductQuantity ? (
          <View>
            <TouchableOpacity onPress={() => onChangeProductQuantity!("add")}>
              <Plus color="black" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onChangeProductQuantity!("minus")}
              disabled={product.amount <= 0}
            >
              <Minus color="black" size={20} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View className="flex-1">
          <Text className="text-xl font-semibold max-w-52" numberOfLines={1}>
            {product.amount} {product.unit === "KG" ? "kg" : "L"} de{" "}
            {product.name}
          </Text>
          {product.updatedDate ? (
            <View className="flex-row justify-between pr-2">
              <Text className="text-sm">{product.updatedDate}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(product.id)}>
        <CircleX color="white" size="32" fill="#F87171" />
      </TouchableOpacity>
    </View>
  );
}
