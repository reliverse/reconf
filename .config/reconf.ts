import { defineConfig } from "../src/mod.js";

const config = defineConfig({
  input: "./src",
  output: "./dist",
  rules: {
    // Example rule: disable a specific linting check
    "no-console": "off",
  },
  plugins: [
    // Example: '@reliverse/rse-lint-plugin-typescript'
  ],
  $meta: {
    projectName: "reconf-example",
  },
});

export default config;
