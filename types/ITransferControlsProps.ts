export interface TransferControlsProps {
  selectedTank: any;
  onTransfer: () => void;
  submitting: boolean;
  volumeTrasfega: string;
  volumeChegada: string;
  setVolumeTrasfega: (v: string) => void;
  setVolumeChegada: (v: string) => void;
}
