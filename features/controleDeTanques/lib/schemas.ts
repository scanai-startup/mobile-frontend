import { date, object, string } from "yup";

export const newDailyAnalysisSchema = object({
  date: date().required("Insira a data da análise."),
  temperature: string()
    .required("Insira a temperatura coletada.")
    .matches(/^\d+$/, "Insira apenas números."),
  density: string()
    .required("Insira a densidade coletada.")
    .matches(/^\d+$/, "Insira apenas números."),
});
