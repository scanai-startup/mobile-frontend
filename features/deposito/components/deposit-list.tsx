import React from "react";
import { FlatList, Text, View } from "react-native";
import IDepositDetailedData from "../types/IDepositDetailedData";
import { DepositCard } from "./deposit-card";

interface IDepositListProps {
  deposits: IDepositDetailedData[];
}

function EmptyTankList() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-500 text-center mb-4">
        Não há nenhum tanque cadastrado ainda.
      </Text>
    </View>
  );
}

export default function DepositList<ReactNode>({
  deposits,
}: IDepositListProps) {
  function handleDepositType(deposit: IDepositDetailedData) {
    const depositId = Number(deposit.idDeposito);
    const title = `${deposit.tipoDeposito} ${deposit.numeroDeposito}`;
    const isAvailable =
      deposit.conteudo === "" ||
      deposit.conteudo === null ||
      deposit.conteudo === undefined;
    const baseProps = {
      depositId: depositId,
      title: title,
      isAvailable: isAvailable,
      capacity: deposit.capacidadeDeposito,
      volume: deposit.volumeConteudo || undefined,
    };
    let specificProps = {};

    if (deposit.conteudo === "Mostro" || deposit.conteudo === "Vinho") {
      specificProps = {
        content: deposit.conteudo,
        contentId: deposit.idConteudo,
        density: deposit.densidade,
        temperature: deposit.temperatura,
        pressure: deposit.pressao ?? null,
        isAvailable: false,
      };
    } else if (deposit.conteudo === "Pé de Cuba") {
      specificProps = {
        content: deposit.conteudo,
        contentId: deposit.idConteudo,
        isAvailable: false,
      };
    }

    return <DepositCard {...baseProps} {...specificProps} />;
  }

  return (
    <FlatList
      data={deposits}
      keyExtractor={(item) => item.idDeposito}
      ListEmptyComponent={<EmptyTankList />}
      renderItem={({ item }) => {
        return handleDepositType(item);
      }}
    />
  );
}
