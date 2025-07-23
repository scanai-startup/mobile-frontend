import apiInstance from "@/api/apiInstance";

export async function createAnalysis(
  endpoint: string,
  payload: any,
  token: string | null,
) {
  return apiInstance.post(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
