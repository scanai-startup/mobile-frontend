import Toast from "react-native-toast-message";

interface IToast {
  type?: "success" | "error" | "info";
  heading: string;
  message: string;
}

export function useToast() {
  return ({ heading, message, type = "success" }: IToast) => {
    Toast.show({
      type: type,
      text1: heading,
      text2: message,
      visibilityTime: 3500
    });
  };
}
