import config from "../../.config/reconf.js";

console.log("Hello from pd-main.ts!");

console.log("Loaded configuration:", config);

// Example: Accessing a config value
if (config.input) {
  console.log("Input directory:", config.input);
}
