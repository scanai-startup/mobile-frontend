import apiInstance from "@/api/apiInstance";
import { act, fireEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
}));

jest.mock("@/api/apiInstance", () => ({
  get: jest.fn(),
}));

describe("Shipment Screen", () => {
  it("renders empty state when no shipments are available", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    renderRouter(
      { "tabs/shipment": require("../app/(tabs)/shipment").default },
      { initialUrl: "/tabs/shipment" },
    );

    await waitFor(() => {
      expect(
        screen.getByText("Não há remessas cadastradas ainda"),
      ).toBeTruthy();
      expect(screen.getByText("🚗")).toBeTruthy();
    });
  });

  it("renders shipment state when shipments are available", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          casta: "AIREN",
          datachegada: "2025-02-18T03:00:00.000+00:00",
          fkfuncionario: 1,
          fkmostro: null,
          id: 999,
          numerolote: 101,
          numerotalao: 3,
          peso: 144,
          qttcaixa: 5,
          sanidade: 2,
          so2: "5646",
          tipovinho: "VB",
          valid: true,
        },
      ],
    });

    renderRouter(
      { "tabs/shipment": require("../app/(tabs)/shipment").default },
      { initialUrl: "/tabs/shipment" },
    );

    await waitFor(() => {
      //TODO: MULTIPLE TEXTS INDICATE THE ID
      //expect(screen.getByText("999")).toBeTruthy();
      expect(screen.getByText("18/02/2025")).toBeTruthy();
      expect(screen.getByText("AIREN")).toBeTruthy();
      expect(screen.getByText("VB")).toBeTruthy();
    });
  });

  it("Should go to Grape Reception Screen when clicking the button", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    renderRouter(
      { "tabs/shipment": require("../app/(tabs)/shipment").default },
      { initialUrl: "/tabs/shipment" },
    );

    //verifica se está no path correto antes do clique de redirecionamento
    expect(screen).toHavePathname("/tabs/shipment");

    expect(screen.findByText("ADICIONAR NOVA REMESSA")).toBeTruthy();
    const addRmsButton = await screen.findByText("ADICIONAR NOVA REMESSA");

    await act(async () => {
      fireEvent.press(addRmsButton);
    });

    //Verifica se esta direcionando para a tela correta
    expect(screen).toHavePathname("/(grapeReception)");
  });

  it("Should go to Home screen when click the Header", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    renderRouter(
      { "tabs/shipment": require("../app/(tabs)/shipment").default },
      { initialUrl: "/tabs/shipment" },
    );

    //verifica se está no path correto antes do clique de redirecionamento
    expect(screen).toHavePathname("/tabs/shipment");

    expect(screen.getByTestId("chevron-left-icon")).toBeTruthy();

    const addRmsButton = screen.getByTestId("chevron-left-icon");

    await act(async () => {
      fireEvent.press(addRmsButton);
    });

    //Verifica se esta direcionando para a home
    expect(screen).toHavePathname("/");
  });

  //TODO: VERIFICAR SE CONSEGUE APAGAR UMA REMESSA QUANDO IMPLEMENTADA
});
