import { useState } from "react";

export interface ISelectedTank {
  id: number;
  deposit: string;
  fkPeDeCuba: number;
  volume: number;
  currentVolume: number;
}

export function useTankSelection() {
  const [selectedTank, setSelectedTank] = useState<ISelectedTank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [volume, setVolume] = useState("");
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const handleSelectTank = (tank: ISelectedTank) => {
    setVolume("");
    setSelectedTank(tank);
    setIsDialogOpen(true);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
    setVolume("");
    setSelectedTank(null);
    setIsNextButtonEnabled(false);
  };

  const handleContinueButton = () => {
    if (selectedTank) {
      setSelectedTank({ ...selectedTank, volume: Number(volume) });
    }
    setIsNextButtonEnabled(true);
    setIsDialogOpen(false);
  };

  return {
    selectedTank,
    setSelectedTank,
    isDialogOpen,
    setIsDialogOpen,
    volume,
    setVolume,
    isNextButtonEnabled,
    setIsNextButtonEnabled,
    handleSelectTank,
    onDialogClose,
    handleContinueButton,
  };
}
