import Login from "@/app/index";
import { useToast } from "@/hooks/useToast";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

// mocks secure store calls
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
}));

// mocks toast
jest.mock("@/hooks/useToast", () => ({
  useToast: jest.fn(),
}));

// mocks router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("login screen", () => {
  test("should render without crashing.", () => {
    render(<Login />);
    expect(screen).toBeTruthy();
  });
  test("should have an employee input.", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("carlos_andrade")).toBeOnTheScreen();
  });
  test("should have a password input.", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("************")).toBeOnTheScreen();
  });
  test("should have a button to log in.", () => {
    render(<Login />);
    expect(screen.getByRole("button")).toBeOnTheScreen();
  });
  test("should let user log in sucessfully with right credentials.", async () => {
    const mockedToast = jest.fn();
    const mockedRouter = {
      push: jest.fn(),
    };

    (useToast as jest.Mock).mockReturnValue(mockedToast);
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);

    render(<Login />);

    const user = userEvent.setup();
    const employeeId = screen.getByPlaceholderText("carlos_andrade");
    const employeePassword = screen.getByPlaceholderText("************");
    const loginBtn = screen.getByRole("button");

    await act(async () => {
      await user.type(employeeId, "123");
      await user.type(employeePassword, "senha123");
    });

    await act(async () => {
      fireEvent.press(loginBtn);
    });

    await waitFor(() => {
      expect(require("@/hooks/useToast").useToast()).toHaveBeenCalledWith({
        heading: "Sucesso",
        message: "Seja bem-vindo!",
      });
    });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "user-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY2FuYWktYXBpIiwic3ViIjoiMTIzIiwiaWQiOjIsInJvbGUiOiJBRE1JTiJ9.iU3N8GF9PWk1a5UFuZ2yZ8_X3vKz4X2RgDIQrOgTLpM",
    );

    expect(useRouter().push).toHaveBeenCalledWith("/(tabs)/");
  });

  test("should not let user log in with incorrect credentials.", async () => {
    server.use(
      http.post("*/auth/login", () => {
        return HttpResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }),
    );

    const user = userEvent.setup();
    render(<Login />);

    await user.type(
      screen.getByPlaceholderText("carlos_andrade"),
      "WRONG_USER",
    );

    await user.type(screen.getByPlaceholderText("************"), "WRONG_PASS");
    await user.press(screen.getByRole("button"));

    // Wait for async operations
    await waitFor(() => {
      expect(require("@/hooks/useToast").useToast()).toHaveBeenCalledWith({
        heading: "Erro",
        message: "Houve um erro, por favor verifique suas credenciais.",
        type: "error",
      });
    });

    expect(require("expo-secure-store").setItemAsync).not.toHaveBeenCalled();
    expect(require("expo-router").useRouter().push).not.toHaveBeenCalled();
  });
});
