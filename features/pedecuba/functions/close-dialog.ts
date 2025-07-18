import IProduct from "../types/IProduct";

export function CloseDialog(
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>,
) {
  setIsModalOpen(false);
  setSelectedProduct(null);
}
