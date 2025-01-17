import { useToast } from "./useToast";

export const validateField = (field: string, message: string) => {
    const toast = useToast();
    
    if (!field) {
      toast({
        heading: "Atenção !",
        message,
        type: "info",
      });
      return false;
    }
    return true;
  };