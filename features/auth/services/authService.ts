import apiInstance from "@/api/apiInstance";
import { Credentials } from "@/features/auth/types/auth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTokenStore } from "../store/userStore";
export async function authUser(
  credentials: Credentials,
  {
    setToken,
    router,
    toast,
  }: {
    setToken: (token: string) => void;
    router: ReturnType<typeof useRouter>;
    toast: ReturnType<typeof useToast>;
  },
) {
  try {
    const response = await apiInstance.post("/auth/login", credentials);
    const token = response.data.token;

    await SecureStore.setItemAsync("user-token", token);
    setToken(token);
    router.push("/(tabs)/");
    toast({ heading: "Sucesso", message: "Seja bem-vindo!" });

    return token;
  } catch (e) {
    console.error("User login failed: ", e);
    toast({
      heading: "Erro",
      message: "Erro ao realizar login, por favor verifique suas credenciais.",
      type: "error",
    });
  }
}
