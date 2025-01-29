import { useEffect, useState } from "react";

export interface ISelectedTank {
  id: number;
  deposit: string;
  tankType: string;
  fkPeDeCuba?: number;
  fkMostro?: number;
  volume: number;
  lostVolume: number;
  currentVolume: number;
}

export function useTankSelection() {
  const [selectedTank, setSelectedTank] = useState<ISelectedTank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [volume, setVolume] = useState("");
  const [lostVolume, setLostVolume] = useState("");
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [isDialogConfirmButtonEnabled, setIsDialogConfirmButtonEnabled] =
    useState(true);

  useEffect(() => handleDialogConfirmButtonBehavior(), [volume, lostVolume]);

  const handleDialogConfirmButtonBehavior = () => {
    if (
      volume &&
      Number(volume) <= selectedTank!.currentVolume &&
      Number(lostVolume) < Number(volume)
    ) {
      setIsDialogConfirmButtonEnabled(false);
      return;
    }
    setIsDialogConfirmButtonEnabled(true);
  };

  const handleSelectTank = (tank: ISelectedTank) => {
    setVolume("");
    setLostVolume("");
    setSelectedTank(tank);
    setIsDialogOpen(true);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
    setVolume("");
    setLostVolume("");
    setSelectedTank(null);
    setIsNextButtonEnabled(false);
  };

  const handleContinueButton = () => {
    if (selectedTank) {
      setSelectedTank({
        ...selectedTank,
        volume: Number(volume),
        lostVolume: Number(lostVolume),
      });
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
    lostVolume,
    setLostVolume,
    isNextButtonEnabled,
    isDialogConfirmButtonEnabled,
    setIsDialogConfirmButtonEnabled,
    setIsNextButtonEnabled,
    handleSelectTank,
    onDialogClose,
    handleContinueButton,
  };
}
