export default interface INewDailyAnalysisPayload {
  content: string;
  contentId: string;
  userId: number;
  data: Date;
  densidade: string;
  temperature: string;
}
