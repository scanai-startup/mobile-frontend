import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { CirclePlus } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

import { Button } from "@/components/atoms/Button";
import {
  AddOrEditProductModal,
  handleProductAction,
  handleRemoveProduct,
  ProductCard,
  useAddProducts,
} from "@/features/pedecuba";

export default function AddProduct() {
  const {
    router,
    products,
    selectedProduct,
    setSelectedProduct,
    isModalOpen,
    setIsModalOpen,
    setProducts,
    toast,
    contentId,
    closeDialog,
  } = useAddProducts();

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
            handleCloseDialog={() => closeDialog()}
            isDialogOpen={isModalOpen}
            handleProductAction={(p) =>
              handleProductAction(
                p,
                contentId as string,
                products,
                setProducts,
                setSelectedProduct,
                toast,
              )
            }
            product={selectedProduct}
          />
          <Button
            placeholder="Adicionar novo produto"
            icon={<CirclePlus color="white" />}
            onPress={() => setIsModalOpen(true)}
            variant="secondary"
          />
          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onRemove={(id: number) =>
                  handleRemoveProduct(id, item.name, setProducts, toast)
                }
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
