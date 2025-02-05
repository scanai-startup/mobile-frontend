import { Deposito } from "@/types/IDeposito";
import { useState } from "react";

export function useTankSelection(data: Deposito[]) {
  const [selectedTank, setSelectedTank] = useState<Deposito | null>(null);

  const handleSelectTank = (id: number) => {
    if (Number(selectedTank?.idDeposito) === id) {
      setSelectedTank(null);
    } else {
      const tank = data.find((t) => Number(t.idDeposito) === id);
      if (tank) setSelectedTank(tank);
    }
  };

  return { selectedTank, handleSelectTank };
}
