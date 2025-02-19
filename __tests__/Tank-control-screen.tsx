import apiInstance from "@/api/apiInstance";
import { act, userEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("@/api/apiInstance", () => ({
  get: jest.fn(),
}));

describe("Tank control", () => {
  test("should render without crashing.", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    renderRouter({
      index: require("@/app/(tabs)/tankControl"),
    });
    await waitFor(() => {
      expect(screen).toBeTruthy();
    });
  });
  test("should display the name of the screen at the navbar.", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    renderRouter({
      index: require("@/app/(tabs)/tankControl"),
    });
    await waitFor(() => {
      expect(screen.getByText("Controle de tanques")).toBeOnTheScreen();
    });
  });
  test("should display the filter input.", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    renderRouter({
      index: require("@/app/(tabs)/tankControl"),
    });
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Digite o que deseja buscar..."),
      ).toBeOnTheScreen();
    });
  });
  test("should return to home screen when clicking on navbar return button.", async () => {
    (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    renderRouter({ index: require("../app/(tabs)/tankControl") });

    const returnBtn = screen.getByTestId("chevron-left-icon");
    const user = userEvent.setup();

    await user.press(returnBtn);

    expect(screen).toHavePathname("/(tabs)");
  });
  describe("Tanks list", () => {
    test("should display a message if no tanks are listed.", async () => {
      (apiInstance.get as jest.Mock).mockResolvedValueOnce({ data: [] });
      renderRouter({
        index: require("@/app/(tabs)/tankControl"),
      });

      await waitFor(() => {
        expect(
          screen.getByText("Não há nenhum tanque cadastrado ainda."),
        ).toBeOnTheScreen();
      });
    });
    test("should display all listed tanks.", async () => {
      (apiInstance.get as jest.Mock).mockResolvedValueOnce({
        data: [
          {
            idDeposito: 1,
            capacidadeDeposito: 200,
            conteudo: "Mostro",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "AUT",
            volumeConteudo: 500,
          },
          {
            idDeposito: 2,
            capacidadeDeposito: 200,
            conteudo: "Pé de cuba",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "AUT",
            volumeConteudo: 500,
          },
          {
            idDeposito: 3,
            capacidadeDeposito: 200,
            conteudo: "Vinho",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "AUT",
            volumeConteudo: 500,
          },
        ],
      });
      renderRouter({
        index: require("@/app/(tabs)/tankControl"),
      });

      await waitFor(() => {
        expect(screen.getAllByTestId("tank-card").length).toBe(3);
      });
    });
    test("should filter tanks based on filter text.", async () => {
      (apiInstance.get as jest.Mock).mockResolvedValueOnce({
        data: [
          {
            idDeposito: 1,
            capacidadeDeposito: 200,
            conteudo: "Mostro",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "AUT",
            volumeConteudo: 500,
          },
          {
            idDeposito: 2,
            capacidadeDeposito: 200,
            conteudo: "Pé de cuba",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "AUT",
            volumeConteudo: 500,
          },
          {
            idDeposito: 3,
            capacidadeDeposito: 200,
            conteudo: "Vinho",
            densidade: 100,
            idConteudo: 1,
            numeroDeposito: "100",
            pressao: 100,
            temperatura: 20,
            tipoDeposito: "TES",
            volumeConteudo: 500,
          },
        ],
      });
      renderRouter({
        index: require("@/app/(tabs)/tankControl"),
      });

      const input = await screen.findByPlaceholderText(
        "Digite o que deseja buscar...",
      );
      const user = userEvent.setup();

      await act(async () => {
        await user.type(input, "AUT");
      });

      await waitFor(() => {
        expect(screen.getAllByTestId("tank-card").length).toBe(2);
      });
    });
    describe("Tank card navigation", () => {
      test("should redirect user to empty tank detail screen when clicking on a empty tank card.", async () => {
        const tank = {
          idDeposito: 1,
          capacidadeDeposito: 200,
          conteudo: "",
          densidade: "",
          idConteudo: "",
          numeroDeposito: "100",
          pressao: "",
          temperatura: "",
          tipoDeposito: "AUT",
          volumeConteudo: 500,
        };
        (apiInstance.get as jest.Mock).mockResolvedValueOnce({
          data: [tank],
        });
        renderRouter({
          index: require("@/app/(tabs)/tankControl"),
        });

        const user = userEvent.setup();
        const tankCard = await screen.findByTestId("tank-card");

        await user.press(tankCard);

        await waitFor(() => {
          expect(screen).toHavePathnameWithParams(
            `/(tankControl)/[emptyTank]?tank=${tank.tipoDeposito}%20${tank.numeroDeposito}&depositId=${tank.idDeposito}&capacity=${tank.capacidadeDeposito}`,
          );
        });
      });
      test("should redirect user to filled tank detail screen when clicking on a filled tank card.", async () => {
        const tank = {
          idDeposito: 1,
          capacidadeDeposito: 200,
          conteudo: "Mostro",
          densidade: 100,
          idConteudo: 1,
          numeroDeposito: "100",
          pressao: 30,
          temperatura: 24,
          tipoDeposito: "AUT",
          volumeConteudo: 500,
        };

        (apiInstance.get as jest.Mock).mockResolvedValueOnce({
          data: [tank],
        });
        renderRouter({
          index: require("@/app/(tabs)/tankControl"),
        });

        const user = userEvent.setup();
        const tankCard = await screen.findByTestId("tank-card");

        await user.press(tankCard);

        await waitFor(() => {
          expect(screen).toHavePathnameWithParams(
            `/tank/${tank.tipoDeposito} ${tank.numeroDeposito}?depositId=${tank.idDeposito}&content=${tank.conteudo}&contentId=${tank.idConteudo}&capacity=${tank.capacidadeDeposito}&volume=${tank.volumeConteudo}`,
          );
        });
      });
    });
  });
});
