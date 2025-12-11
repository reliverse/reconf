import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "clover", "json"],
      include: ["src/**/*.ts"],
    },
  },
});
