import { existsSync } from "node:fs";
import { readFile, rm, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { normalize } from "pathe";
import { expect, it, describe, beforeAll } from "vitest";

import { updateConfig } from "~/impl/update.js";

const r = (path: string) =>
  normalize(fileURLToPath(new URL(path, import.meta.url)));

describe("update config file", () => {
  const tmpDir = r("./.tmp");
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await rm(tmpDir, { recursive: true }).catch(() => {});
  });
  it("create new config", async () => {
    let onCreateFile: string | undefined;
    const res = await updateConfig({
      cwd: tmpDir,
      configFile: "foo.config",
      onCreate: ({ configFile }) => {
        onCreateFile = configFile;
        return "export default { test: true }";
      },
      onUpdate: (config) => {
        config.test2 = false;
      },
    });
    expect(res.created).toBe(true);
    expect(res.configFile).toBe(r("./.tmp/foo.config.ts"));
    expect(onCreateFile).toBe(r("./.tmp/foo.config.ts"));

    expect(existsSync(r("./.tmp/foo.config.ts"))).toBe(true);
    const contents = await readFile(r("./.tmp/foo.config.ts"), "utf8");
    expect(contents).toMatchInlineSnapshot(`
      "export default {
        test: true,
        test2: false
      };"
    `);
  });
  it("update existing in .config folder", async () => {
    const tmpDotConfig = r("./.tmp/.config");
    await mkdir(tmpDotConfig, { recursive: true });
    await writeFile(
      r("./.tmp/.config/foobar.ts"),
      "export default { test: true }",
    );
    const res = await updateConfig({
      cwd: tmpDir,
      configFile: "foobar.config",
      onCreate: () => {
        return "export default { test: true }";
      },
      onUpdate: (config) => {
        config.test2 = false;
      },
    });
    expect(res.created).toBe(false);
    expect(res.configFile).toBe(r("./.tmp/.config/foobar.ts"));

    expect(existsSync(r("./.tmp/.config/foobar.ts"))).toBe(true);
    const contents = await readFile(r("./.tmp/.config/foobar.ts"), "utf8");
    expect(contents).toMatchInlineSnapshot(`
      "export default {
        test: true,
        test2: false
      };"
    `);
  });
});
