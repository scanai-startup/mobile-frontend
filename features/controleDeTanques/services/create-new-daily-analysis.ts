import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import INewDailyAnalysisPayload from "../types/INewDailyAnalysisPayload";

export default async function createNewDailyAnalysis(
  data: INewDailyAnalysisPayload,
): Promise<{ status: boolean; message: string }> {
  let endpoint = "";
  let payload = {};
  const token = await SecureStore.getItemAsync("user-token");
  const basePayload = {
    densidade: data.densidade,
    data: data.data,
    temperatura: data.temperature,
  };

  switch (data.content) {
    case "Mostro":
      endpoint = "/analiseDiariaMostro/register";
      payload = {
        fkmostro: data.contentId,
        fkfuncionario: data.userId,
        ...basePayload,
      };
      break;
    //! esse case nao ta funcionando, pq ainda falta o endpoint no back
    case "Pé de Cuba":
      endpoint = "/analisePeDeCuba/register";
      payload = {
        fkpedecuba: data.contentId,
        fkfuncionario: data.userId,
        ...basePayload,
      };
      break;
    //! pra esse case a gente precisa modificar o form pra validar e receber o dado da pressão
    case "Vinho":
      endpoint = "/analiseVinho/register";
      payload = {
        fkpedecuba: data.contentId,
        fkfuncionario: data.userId,
        ...basePayload,
      };
      break;
    default:
      break;
  }

  return apiInstance
    .post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return { status: true, message: "Nova análise criada com sucesso." };
    })
    .catch((err) => {
      //TODO: fazer tratamento de erros melhor
      console.error(err);
      return {
        status: false,
        message:
          "Houve um erro ao criar a nova análise diária, por favor tente novamente.",
      };
    });
}
