import Login from "@/app/index";
import { useToast } from "@/hooks/useToast";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";

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
      await user.type(employeeId, "ADMIN");
      await user.type(employeePassword, "ADMIN");
    });

    await act(async () => {
      fireEvent.press(loginBtn);
    });

    expect(mockedToast).toHaveBeenCalledWith({
      heading: "Sucesso",
      message: "Seja bem-vindo!",
    });
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "user-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY2FuYWktYXBpIiwic3ViIjoiQURNSU4iLCJpZCI6MSwicm9sZSI6IkFETUlOIn0.VPSg8zbNLfTTzlAvfx4fIiBNm-9_adFj8_wVqH3Uvgo",
    );
    expect(useRouter().push).toHaveBeenCalledWith("/(tabs)/");
  });
  test("should not let user log in with incorrect credentials.", async () => {
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
      await user.type(employeeId, "NOT_USER");
      await user.type(employeePassword, "NOT_USER");
    });

    await act(async () => {
      fireEvent.press(loginBtn);
    });

    expect(mockedToast).toHaveBeenCalledWith({
      heading: "Erro",
      message: "Houve um erro, por favor verifique suas credenciais.",
      type: "error",
    });
    expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(0);
    expect(useRouter().push).toHaveBeenCalledTimes(0);
  });
});
