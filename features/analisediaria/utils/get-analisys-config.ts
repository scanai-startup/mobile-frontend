type AnalysisConfig = {
  endpoint: string;
  payload: Record<string, any>;
};

export function getAnalysisConfig(
  content: string,
  contentId: string,
  userId: string,
  density: string,
  date: Date,
  temperature: string,
): AnalysisConfig | null {
  const contentMap: Record<
    string,
    { endpoint: string; getPayload: () => Record<string, any> }
  > = {
    Mostro: {
      endpoint: "/analisediariamostro/register",
      getPayload: () => ({
        fkmostro: contentId,
        fkfuncionario: userId,
        densidade: density,
        data: date,
        temperatura: temperature,
      }),
    },
    "Pé de Cuba": {
      endpoint: "/analisepedecuba/register",
      getPayload: () => ({
        fkpedecuba: contentId,
        fkfuncionario: userId,
        densidade: density,
        data: date,
        temperatura: temperature,
      }),
    },
    // Adicionar outros tipos conforme necessário
  };

  const selected = contentMap[content];
  return selected
    ? { endpoint: selected.endpoint, payload: selected.getPayload() }
    : null;
}
