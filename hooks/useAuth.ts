import { useTokenStore } from "@/store/userData";
import { useToast } from "./useToast";
import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export function useAuth() {
  const { setToken } = useTokenStore();
  const toast = useToast();
  const router = useRouter();

  const login = async (matricula: string, senha: string) => {
    try {
      const response = await apiInstance.post("/auth/login", {
        matricula,
        senha,
      });
      const token = response.data.token;

      setToken(token);
      await SecureStore.setItemAsync("user-token", token);

      toast({ heading: "Sucesso", message: "Seja bem-vindo!" });
      router.push("/(tabs)/");
    } catch (error) {
      toast({
        heading: "Erro",
        message: "Houve um erro, por favor verifique suas credenciais.",
        type: "error",
      });
      console.error(error);
    }
  };

  return { login };
}
