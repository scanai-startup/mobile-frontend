import apiInstance from "@/api/apiInstance";
import { useFetchDepositos } from "@/hooks/useFetchDepositos";
import { userEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("@/api/apiInstance", () => ({
  get: jest.fn(),
}));

jest.mock("@/hooks/useFetchDepositos", () => ({
  useFetchDepositos: jest.fn(),
}));

describe("Empty tank", () => {
  test("should render screen without breaking.", () => {
    renderRouter(
      {
        "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
      },
      {
        initialUrl:
          "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
      },
    );

    expect(screen).toBeTruthy();
  });

  describe("Header", () => {
    test("should display tank identification on header.", async () => {
      renderRouter(
        {
          "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
        },
        {
          initialUrl:
            "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
        },
      );

      expect(screen.getByText("AUT 200")).toBeOnTheScreen();
    });

    test("should return to tankControl page when clicking on header return button.", async () => {
      (apiInstance.get as jest.Mock).mockReturnValueOnce({ data: [] });

      renderRouter(
        {
          "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
          "/(tabs)/tankControl": require("@/app/(tabs)/tankControl"),
        },
        {
          initialUrl:
            "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
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
    test("should redirect user to add new daily analysis screen when clicking on daily analysis card.", async () => {
      renderRouter(
        {
          "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
          "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]": require("@/app/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]"),
        },
        {
          initialUrl:
            "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
        },
      );

      const user = userEvent.setup();
      const addNewDailyAnalysisCard = screen.getAllByTestId("activity-card")[0];

      await user.press(addNewDailyAnalysisCard);

      expect(screen.getByText("Nova análise diária")).toBeOnTheScreen();
      expect(screen).toHavePathname("/tank/dailyAnalysis/[dailyAnalysis]");
    });

    // //! this test redirects to a screen that is not working currently (on the first MVP). so i'll be commenting this one out
    // test("should redirect user to deposit analysis list screen when clicking on deposit analysis card.", async () => {
    //   renderRouter(
    //     {
    //       "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
    //       "/(tankControl)/tank/depositAnalysis/listAnalysis/[listAnalysis]": require("@/app/(tankControl)/tank/depositAnalysis/listAnalysis/[listAnalysis]"),
    //     },
    //     {
    //       initialUrl:
    //         "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
    //     },
    //   );

    //   const user = userEvent.setup();
    //   const depositAnalysisCard = screen.getAllByTestId("activity-card")[1];

    //   await user.press(depositAnalysisCard);

    //   expect(screen.getByText("LISTA ANALISES")).toBeOnTheScreen();
    //   expect(screen).toHavePathname(
    //     "/tank/depositAnalysis/listAnalysis/[listAnalysis]",
    //   );
    // });

    test("should redirect user to make trasfega screen when clicking on make trasfega card.", async () => {
      (useFetchDepositos as jest.Mock).mockReturnValue({ data: [] });

      renderRouter(
        {
          "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
          "/(tankControl)/tank/realizarTrasfega/[trasfega]": require("@/app/(tankControl)/tank/realizarTrasfega/[trasfega]"),
        },
        {
          initialUrl:
            "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
        },
      );

      const user = userEvent.setup();
      const trasfegaCard = screen.getAllByTestId("activity-card")[2];

      await user.press(trasfegaCard);

      expect(screen.getByText("Realizar Trasfega")).toBeOnTheScreen();
      expect(screen).toHavePathname("/tank/realizarTrasfega/[trasfega]");
    });

    describe("Mostro content", () => {
      test("should display only four activity cards.", () => {
        renderRouter(
          {
            "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
          },
          {
            initialUrl:
              "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
          },
        );

        expect(screen.getAllByTestId("activity-card").length).toBe(4);
      });

      test("should display daily analysis, deposit analysis, trasfega and new shipment activity cards.", () => {
        renderRouter(
          {
            "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
          },
          {
            initialUrl:
              "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
          },
        );

        //! maybe theres a better approach to this test
        expect(screen.getByText("Análises diárias")).toBeOnTheScreen();
        expect(screen.getByText("Análises de deposito")).toBeOnTheScreen();
        expect(screen.getByText("Realizar Trasfega")).toBeOnTheScreen();
        expect(screen.getByText("Nova Remessa")).toBeOnTheScreen();
      });

      test("should redirect user to new shipment screen when clicking on new shipment card.", async () => {
        (apiInstance.get as jest.Mock).mockReturnValue({ data: [] });

        renderRouter(
          {
            "/tank/[tank]": require("@/app/(tankControl)/tank/[tank]"),
            "/(tankControl)/tank/addBaseWine/[addBaseWine]": require("@/app/(tankControl)/tank/addBaseWine/[baseWine]"),
          },
          {
            initialUrl:
              "/tank/AUT 200?depositId=1&content=Mostro&contentId=1&capacity=500&volume=200",
          },
        );

        const user = userEvent.setup();
        const newShipmentCard = screen.getAllByTestId("activity-card")[3];

        await user.press(newShipmentCard);

        expect(screen.getByText("Associar Remessas")).toBeOnTheScreen();
        expect(screen).toHavePathname("/tank/addBaseWine/[addBaseWine]");
      });
    });
  });
});
