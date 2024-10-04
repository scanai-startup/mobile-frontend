import { Href, Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FormFooterP {
  nextHref: Href<string>;
  isReturnButtonEnabled?: boolean;
}

export default function FormFooter({
  nextHref,
  isReturnButtonEnabled = false,
}: FormFooterP) {
  const router = useRouter();
  return (
    <View className="h-20 border-t border-neutral-250">
      <View className="flex-1 flex-row items-center justify-between px-14">
        <TouchableOpacity
          onPress={() => router.dismiss(1)}
          disabled={!isReturnButtonEnabled}
        >
          <Text
            className={
              isReturnButtonEnabled
                ? "text-xl text-blue-500"
                : "text-xl text-neutral-250"
            }
          >
            Anterior
          </Text>
        </TouchableOpacity>
        <Link href={nextHref}>
          <Text className="text-xl text-blue-500">Próximo</Text>
        </Link>
      </View>
    </View>
  );
}
