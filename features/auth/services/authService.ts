import apiInstance from "@/api/apiInstance";
import { Credentials } from "@/features/auth/types/auth";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const router = useRouter();
const toast = useToast();

export default async function authUser(credentials: Credentials) {
  try {
    const response = await apiInstance.post("/auth/login", credentials);
    const token = response.data.token;

    await SecureStore.setItemAsync("user-token", token);
    router.push("/(tabs)/");
    toast({ heading: "Sucesso", message: "Seja bem-vindo!" });

    return token;
  } catch (e) {
    console.error("User login failed: ", e);
    //TODO: check error types to correctly handle them
    toast({
      heading: "Erro",
      message: "Erro ao realizar login, por favor verifique suas credenciais.",
      type: "error",
    });
  }
}
