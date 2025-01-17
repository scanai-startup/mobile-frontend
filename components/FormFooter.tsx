import { Href, Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FormFooterP {
  nextHref: string | { pathname: string; params: any };
  isReturnButtonEnabled?: boolean;
  isNextButtonEnabled?: boolean;
  handleDataSubmit?: () => void;
  isLastPage: boolean;
}

export default function FormFooter({
  nextHref,
  isReturnButtonEnabled = false,
  isNextButtonEnabled = true,
  handleDataSubmit,
  isLastPage,
}: FormFooterP) {
  const router = useRouter();
  const nextButtonStyles =
    "text-xl " + (isNextButtonEnabled ? "text-blue-500" : "text-[#C0C0C0]");
  return (
    <View
      style={{
        height: 80,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        borderTopColor: "#C0C0C0",
      }}
    >
      <View className="flex-1 flex-row items-center justify-between px-14">
        <TouchableOpacity
          onPress={() => router.dismiss(1)}
          disabled={!isReturnButtonEnabled}
        >
          <Text
            className="text-xl"
            style={{
              color: isReturnButtonEnabled ? "#93c5fd" : "#C0C0C0",
            }}
          >
            Anterior
          </Text>
        </TouchableOpacity>
        {isReturnButtonEnabled && isLastPage && handleDataSubmit ? (
          <TouchableOpacity
            onPress={() => handleDataSubmit()}
            disabled={!isNextButtonEnabled}
          >
            <Text className={nextButtonStyles}>Concluir</Text>
          </TouchableOpacity>
        ) : (
          <Link href={nextHref as Href} asChild>
            <TouchableOpacity disabled={!isNextButtonEnabled}>
              <Text className={nextButtonStyles}>Próximo</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
