import { useState } from "react";
import { Deposito } from "@/types/IDeposito";

export function useTankSelection(data: Deposito[]) {
  const [selectedTank, setSelectedTank] = useState<Deposito | null>(null);

  const handleSelectTank = (id: number) => {
    if (selectedTank?.idDeposito === id) {
      setSelectedTank(null);
    } else {
      const tank = data.find((t) => t.idDeposito === id);
      if (tank) setSelectedTank(tank);
    }
  };

  return { selectedTank, handleSelectTank };
}
