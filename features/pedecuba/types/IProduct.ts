export default interface IProduct {
  id: number;
  name: string;
  amount: number;
  unit: "KG" | "L";
  updatedDate?: string | null;
}
