import { InferType } from "yup";
import { newDailyAnalysisSchema } from "../lib/schemas";

export type NewDailyAnalysisFormInputs = InferType<
  typeof newDailyAnalysisSchema
>;
