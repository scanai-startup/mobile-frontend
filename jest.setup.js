import { server } from "@/mocks/server";
import { load } from "@expo/env";
import "fast-text-encoding";
import "react-native-url-polyfill/auto";

load(process.cwd());

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
