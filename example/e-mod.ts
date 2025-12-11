import type { ReconfConfig, ReconfMeta } from "~/types.js";

// libs shared exports from libs/reconf/reconf-main.ts
// cli imports them
// then relidler replaces to package name (e.g. "" > @reliverse/schema)

/* import { defineCommand, errorHandler, runMain } from "@reliverse/prompts";

const main = defineCommand({
  meta: {
    name: "reinject",
    version: "1.0.0",
    description: "@reliverse/reinject-cli",
  },
  args: {
    dev: {
      type: "boolean",
      description: "Runs the CLI in dev mode",
    },
  },
  subCommands: {
    cli: () => import("./cli/cli-mod.js").then((r) => r.default),
    tee: () => import("./cli/args/arg-ts-expect-error.js").then((r) => r.default),
  }
});

await runMain(main).catch((error: unknown) => {
  errorHandler(
    error instanceof Error ? error : new Error(String(error)),
    "An unhandled error occurred, please report it at https://github.com/reliverse/reinject",
  );
});
 */

// Helper function to provide type inference for config
export function createDefineConfig<
  UserConfig extends ReconfConfig,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  Meta extends ReconfMeta,
>() {
  return function defineConfig(config: UserConfig & { $meta?: Meta }) {
    return config;
  };
}

export const defineConfig = createDefineConfig<ReconfConfig, ReconfMeta>();
