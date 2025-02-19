import { userEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

describe("Empty tank", () => {
  test("should render screen without breaking.", () => {
    renderRouter({
      index: require("@/app/(tankControl)/[emptyTank]"),
    });

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
      renderRouter(
        {
          "/[emptyTank]": require("@/app/(tankControl)/[emptyTank]"),
        },
        {
          initialUrl: "/[emptyTank]?tank=AUT%20200&depositId=1&capacity=500",
        },
      );

      const returnBtn = await screen.findByTestId("chevron-left-icon");
      const user = userEvent.setup();

      await user.press(returnBtn);

      await waitFor(() => {
        expect(screen).toHavePathname("/(tabs)/tankControl");
      });
    });
  });

  describe("Activity cards", () => {
    test("should display add new shipment and start pé de cuba activity cards.", () => {
      renderRouter({
        index: require("@/app/(tankControl)/[emptyTank]"),
      });

      //! maybe theres a better approach to this test
      expect(screen.getByText("Adicionar Remessa")).toBeOnTheScreen();
      expect(screen.getByText("Iniciar pé de Cuba")).toBeOnTheScreen();
    });

    test("should display only two activity cards.", () => {
      renderRouter({
        index: require("@/app/(tankControl)/[emptyTank]"),
      });

      expect(screen.getAllByTestId("activity-card").length).toBe(2);
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
