import { fileURLToPath } from "node:url";

import { loadConfig } from "~/impl/loader.js";

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url));

async function main() {
  const fixtureDir = r("../test/fixture");
  const config = await loadConfig({ cwd: fixtureDir, dotenv: true });
  console.log(config);
}

main().catch(console.error);
