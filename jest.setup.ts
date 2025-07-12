import { server } from "@/mocks/server";
import { load } from "@expo/env";
import "@testing-library/jest-native/legacy-extend-expect";
import "fast-text-encoding";
import "react-native-url-polyfill/auto";

load(process.cwd());

// added this to fix the problem on this issue https://github.com/expo/expo/issues/18742#issuecomment-1376381488
jest.mock("expo-linking", () => {
  const module: typeof import("expo-linking") = {
    ...jest.requireActual("expo-linking"),
    createURL: jest.fn(),
  };

  return module;
});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  }),
);
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());
