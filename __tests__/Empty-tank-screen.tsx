import apiInstance from "@/api/apiInstance";
import { userEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("@/api/apiInstance", () => ({
  get: jest.fn(),
}));

describe("Empty tank", () => {
  test("should render screen without breaking.", () => {
    renderRouter(
      {
        "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
      },
      {
        initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
      },
    );

    expect(screen).toBeTruthy();
  });

  describe("Header", () => {
    test("should display tank identification on header.", async () => {
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      expect(screen.getByText("AUT 200")).toBeOnTheScreen();
    });

    test("should return to tankControl page when clicking on header return button.", async () => {
      (apiInstance.get as jest.Mock).mockReturnValueOnce({ data: [] });
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
          "/(tabs)/tankControl": require("@/app/(tabs)/tankControl"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      const returnBtn = await screen.findByTestId("chevron-left-icon");
      const user = userEvent.setup();

      await user.press(returnBtn);

      await waitFor(() => {
        expect(screen).toHavePathname("/tankControl");
      });
      expect(screen.getByText("Controle de tanques")).toBeOnTheScreen();
    });
  });

  describe("Activity cards", () => {
    test("should display add new shipment and start pé de cuba activity cards.", () => {
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      //! maybe theres a better approach to this test
      expect(screen.getByText("Adicionar Remessa")).toBeOnTheScreen();
      expect(screen.getByText("Iniciar pé de Cuba")).toBeOnTheScreen();
    });

    test("should display only two activity cards.", () => {
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      expect(screen.getAllByTestId("activity-card").length).toBe(2);
    });

    test("should redirect user to add shipment screen when clicking on add shipment activity card.", async () => {
      (apiInstance.get as jest.Mock).mockReturnValueOnce({ data: [] });

      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
          "/(tankControl)/tank/addBaseWine/[addBaseWine]": require("@/app/(tankControl)/tank/addBaseWine/[baseWine]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      const user = userEvent.setup();
      const addNewShipmentCard = screen.getAllByTestId("activity-card")[0];

      await user.press(addNewShipmentCard);

      expect(screen.getByText("Associar Remessas")).toBeOnTheScreen();
      expect(screen).toHavePathname("/tank/addBaseWine/[addBaseWine]");
    });

    test("should redirect user to start pé de cuba screen when clicking on start pé de cuba activity card.", async () => {
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
          "/(tankControl)/tank/addPeDeCuba/[addPeDeCuba]": require("@/app/(tankControl)/tank/addPeDeCuba/[addPeDeCuba]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      const user = userEvent.setup();
      const addNewPeDeCuba = screen.getAllByTestId("activity-card")[1];

      await user.press(addNewPeDeCuba);

      expect(screen.getByText("Adicionar Pé de Cuba")).toBeOnTheScreen();
      expect(screen).toHavePathname("/tank/addPeDeCuba/[addPeDeCuba]");
    });
  });

  test("should display an empty tank message on the screen.", () => {
    renderRouter({
      index: require("@/app/(tankControl)/[emptyTank]"),
    });

    expect(
      screen.getByText("Não há nenhum conteúdo neste tanque."),
    ).toBeOnTheScreen();
  });
});
