import { server } from "@/mocks/browser";
import { afterAll, afterEach, beforeAll, vitest } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  cleanup();
  vitest.clearAllMocks();
});

afterAll(() => server.close());
