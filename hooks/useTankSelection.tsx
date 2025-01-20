import { useState } from "react";

export interface ISelectedTank {
  deposit: string;
  fkPeDeCuba: number;
  volume: number;
}

export function useTankSelection() {
  const [selectedTank, setSelectedTank] = useState<ISelectedTank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [volume, setVolume] = useState("");
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const handleSelectTank = (tank: ISelectedTank) => {
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
    setVolume("");
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