import ITankData from "@/types/ITankData";
import { create } from "zustand";

interface TanksState {
  tanksData: ITankData[];
  setTanksData: (data: ITankData[]) => void;
}
export const useTanksStore = create<TanksState>((set) => ({
  tanksData: [],
  setTanksData: (data) => set({ tanksData: data }),
}));
