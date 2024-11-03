import React, { createContext, useContext, useState } from "react";

interface IShipmentData {
  // this is the request body signature
  casta: string;
  datachegada: string;
  fkfuncionario: number;
  fkviticultor: number;
  numerolote: number;
  numerotalao: number;
  peso: number;
  sanidade: number;
  so2: string;
  tipodevinho: string;
  fkmostro?: number;
}

interface ShipmentContextType {
  shipmentData: IShipmentData;
  setShipmentData: React.Dispatch<React.SetStateAction<IShipmentData>>;
}

export const NewShipmentContext = createContext<
  ShipmentContextType | undefined
>(undefined);
export function NewShipmentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shipmentData, setShipmentData] = useState<IShipmentData>({
    numerotalao: 0,
    numerolote: 0,
    peso: 0,
    fkviticultor: 1, //TODO: this param need to be dynamic, thus, we need to build a way to the user just select one of the viticultores available (so we can access his id)
    fkfuncionario: 1, //TODO: this param need to be dynamic, thus, we need to see a way to access/store the current user id, so we can send to the database
    casta: "Airen", //TODO: this field doesnt exist in the forms
    datachegada: "",
    sanidade: 0,
    so2: "",
    tipodevinho: "",
    // add any other missing properties here
  });

  //* just for debug effects
  // useEffect(() => {
  //   console.log(shipmentData);
  // }, [shipmentData]);

  return (
    <NewShipmentContext.Provider value={{ shipmentData, setShipmentData }}>
      {children}
    </NewShipmentContext.Provider>
  );
}
export function useNewShipmentContext() {
  const context = useContext(NewShipmentContext);
  if (!context) {
    throw new Error(
      "NewShipmentContext is possible undefined or you're not using within a NewShipmentContextProvider"
    );
  }
  return context;
}
