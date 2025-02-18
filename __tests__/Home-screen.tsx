import Home from "@/app/(tabs)";
import { render, screen } from "@testing-library/react-native";
import React from "react";

jest.mock("@/store/userData", () => ({
  useTokenStore: () => {
    return { subject: "name" };
  },
}));

describe("Home screen", () => {
  test("should render without crashing.", () => {
    render(<Home />);
    expect(screen).toBeTruthy();
  });
  test("should display the user name at the navbar.", () => {
    render(<Home />);
    expect(screen.getByText("Olá, name")).toBeOnTheScreen();
  });
  describe("Activity cards", () => {
    test("should render the minimal 5 activities.", () => {
      render(<Home />);
      expect(
        screen.getAllByTestId("activity-card").length,
      ).toBeGreaterThanOrEqual(5);
    });
    test("should let user click on any activity card.", () => {
      render(<Home />);
      const cards = screen.getAllByTestId("activity-card");
      cards.forEach((c) => {
        expect(c).not.toBeDisabled();
      });
    });
  });
});
