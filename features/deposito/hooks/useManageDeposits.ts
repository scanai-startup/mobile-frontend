import { useToast } from "@/hooks/useToast";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { getAllDepositsWithInformation } from "../services/get-all-deposits";
import IDepositDetailedData from "../types/IDepositDetailedData";

export default function useManageDeposits() {
  const [data, setData] = useState<IDepositDetailedData[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<IDepositDetailedData[]>([]);
  const toast = useToast();

  async function fetchDeposits() {
    const deposits = await getAllDepositsWithInformation({ toast });
    setData(deposits);
  }
  useFocusEffect(
    useCallback(() => {
      fetchDeposits();
      return;
    }, []),
  );
  useEffect(() => {
    const filteredDeposits = search
      ? data.filter((e) => {
          return (
            e.tipoDeposito.toLowerCase().includes(search.toLowerCase()) ||
            e.numeroDeposito.toLowerCase().includes(search.toLowerCase())
          );
        })
      : data;
    filteredData;
    setFilteredData(filteredDeposits);
  }, [search, data]);

  return { filteredData, isDrawerVisible, setIsDrawerVisible, setSearch };
}
