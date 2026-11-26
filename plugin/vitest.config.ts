import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { setupFiles: ["tests/setup/paseo-home.ts"], testTimeout: 30_000 },
});
