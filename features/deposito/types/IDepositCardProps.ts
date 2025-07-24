export interface IDepositCardProps {
  depositId: number;
  title: string;
  isAvailable: boolean;
  density?: number;
  temperature?: number;
  pressure?: number | null;
  content?: string;
  contentId?: number;
  capacity: number;
  volume?: number;
}
