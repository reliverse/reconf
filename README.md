# 🧬 reconf: reliverse config

> @reliverse/reconf is your high-performance config loader for modern CLIs and tools. Crafted for devs who care about precision, speed, and zero-bloat DX.

[📦 npm](https://npmjs.com/package/@reliverse/reconf) • [✨ github](https://github.com/blefnk/cfg) • [💬 discord](https://discord.gg/pb8ukbwpsj)

## what is this?

reconf is the config system that care about you and your project.  

- 🧠 loads any format: `.ts`, `.json`, `.yml`, `.toml`,**** `.env`, `package.json`, `rc`—doesn’t blink
- 🧩 schema-first, powered by `zod`, `typebox`, or native ts—your rules, your types
- 🔗 extend configs from anywhere: local, github, npm, you name it
- 🔁 deep merges, layered configs—no more “which file wins?” drama
- 🚦 environment overrides: `$production`, `$dev`, `$env:preview`, etc.—switch context, instantly
- 🔄 hmr-ready for local dev—reloads before you can even save
- 🌍 runs everywhere: esm, cjs, bun, node, deno (soon)
- 🛠️ `@reliverse/reconf-cli`: let users generate configs with interactive prompts—no more handholding

if you’re building clis, monorepos, saas sdks, or anything that needs real config, reconf is the only answer.

## about this repo

one repo, all the power:

1. **`@reliverse/schema`** — shared config schema for everything in reliverse (and beyond)
2. **`@reliverse/reconf`** — config loader for apps, clis, tools, whatever
3. **`@reliverse/config`** — the canonical reliverse config implementation
4. **`@reliverse/reconf-cli`** — cli to generate configs from your terminal, no excuses

## quick start

install and extend:

```sh
bun add -D @reliverse/cfg
```

```ts
// mytool.config.ts
export default {
  extends: ["@reliverse/cfg"],
  mytool: {
    enabled: true,
    rules: ["auto"],
  },
}
```

works with any tool built on `@reliverse/reconf`.  
no magic, just results.

## install

```sh
bun add @reliverse/reconf
# bun add -D @reliverse/reconf-cli # coming soon
```

## use it

load your config:

```ts
import { loadConfig } from "@reliverse/reconf"

const { config } = await loadConfig({
  name: "mytool", // looks for mytool.config.ts/json, .mytoolrc, etc.
})
```

watch for updates (dev mode):

```ts
import { watchConfig } from "@reliverse/reconf"

const { config, watchingFiles } = watchConfig({
  cwd: process.cwd(),
  envName: "development",
  onUpdate({ oldConfig, newConfig }) {
    console.log("config updated:", newConfig)
  },
})
```

## load order (priority)

1. programmatic overrides
2. local config file
3. `package.json` field
4. home config (`~/.myapprc`)
5. env overrides (`$production`, `$env.preview`, etc.)
6. defaults
7. extends (npm, github, local)

## environment overrides

```ts
export default {
  logLevel: "info",
  $production: {
    logLevel: "warn",
  },
  $env: {
    preview: {
      apiUrl: "https://preview.api.com",
    },
  },
}
```

## extending config (local or remote)

```ts
export default {
  extends: [
    "./base",
    "gh:reliverse/starter-template#main"
  ]
}
```

supported sources:  

- local paths  
- npm packages  
- github/git remotes (`gh:user/repo#branch`)

powered by [`unjs/giget`](https://github.com/unjs/giget)

## reconf-cli

### for users

```sh
# coming soon
# bunx @reliverse/reconf-cli gen reliverse/cli-starter
```

- pulls `schema.json` from the repo
- interactive cli, no guesswork
- outputs your config (`config.ts`, `.myapprc`, whatever)

### for devs

```sh
# coming soon
# reconf schema ./schema.ts
```

- uses `zod`, `typebox`, or native ts
- outputs `schema.json`

now anyone can run `reconf gen your/repo` and get typed configs, instantly.

## supported file types

- `config.{ts,mts,cts,js,mjs,cjs}`
- `.myapprc`, `.myapprc.json`, `.yaml`, `.toml`
- `package.json > config`
- `.env`, `.env.production`, etc.

## reconf vs c12

| feature                    | c12  | reconf |
|----------------------------|------|--------|
| schema-based generation    | ❌   | ✅     |
| interactive cli ux         | ❌   | ✅     |
| remote scaffolding support | ❌   | ✅     |
| type-safe schema formats   | ❌   | ✅     |
| sync config loading        | ❌   | 🔜     |
| deep merge layering        | ✅   | ✅     |
| live hmr config watching   | ✅   | ✅     |
| git/npm extendable configs | ✅   | ✅     |

reconf isn’t just a loader. it’s a config engine.  
c12 is nice. reconf is ruthless.

## what’s inside?

### validated with zod

```ts
import { z } from "zod"

export const reliverseConfigSchema = z.object({
  name: z.string().optional(),
  env: z.enum(["dev", "prod", "preview"]).default("dev"),
  engines: z.object({
    rengine: z.boolean().default(true),
    blengine: z.boolean().default(false),
  }),
  addons: z.array(z.string()).optional(),
  ai: z.object({
    enabled: z.boolean().default(true),
    model: z.string().default("gpt-4"),
  }),
})
```

### mergeable defaults

- auto-adapts to `NODE_ENV`
- supports `$production`, `$preview`, `$dev`, etc.
- env-specific presets, no config spaghetti

### extensible

modular by default—override, extend, or rip out what you don’t need.

## features

- 🧬 schema-first (zod, typebox, ts)
- 🛠️ cli and programmatic
- 🌎 remote & local extending
- 🔁 env-based overrides
- 🔍 validated & typed
- 💡 perfect for templates, ai agents, game engines, whatever

## example use

**in a reliverse cli tool:**

```ts
import { loadConfig } from "@reliverse/reconf"

const { config } = await loadConfig({
  name: "mytool",
  extends: ["@reliverse/cfg"],
})
```

**in an ai agent:**

```ts
if (config.ai.enabled) {
  useModel(config.ai.model)
}
```

## coming soon

- [ ] full ide autocomplete via json schema
- [ ] `reconf gen @reliverse/cfg` (interactive cli config creation)
- [ ] drag-and-drop visual config tool
- [ ] public schema registry & introspection
- [ ] plugin dev support for schema extension

## feedback

- 🐛 bug? [open an issue](https://github.com/reliverse/reconf/issues)
- 💡 idea? [start a discussion](https://github.com/reliverse/reconf/discussions)
- ❤️ just vibing? [discord](https://discord.gg/pb8ukbwpsj)

## contribute

reconf evolves with your help.  
building a reliverse tool and need more schema?  
pr it. let’s make config unstoppable.

- `@reliverse/schema` — libs/schema
- `@reliverse/reconf` — libs/reconf
- `@reliverse/config` — libs/config
- `@reliverse/reconf-cli` — libs/cli
- drag-and-drop config app — src

or just drop by [discord](https://discord.gg/pb8ukbwpsj) and talk shop.

## related

- [`@reliverse/reconf`](https://github.com/reliverse/reconf) — type-safe config engine
- [`@reliverse/reconf-cli`](https://npmjs.com/package/@reliverse/reconf-cli) — generate configs from schema
- [`@reliverse/cli`](https://github.com/reliverse/cli) — uses config for integrations
- [`@reliverse/rempts`](https://github.com/reliverse/rempts) — prompt framework, config-driven

### shoutouts

- [`c12`](https://github.com/unjs/c12) — the og
- [`cosmiconfig`](https://github.com/cosmiconfig/cosmiconfig) — classic config loader
- [`env-schema`](https://github.com/fastify/env-schema) — env validation
- [`zod`](https://zod.dev), [`typebox`](https://github.com/sinclairzx81/typebox), [`arktype`](https://arktype.io) — schema libs

## license

mit © [blefnk nazar kornienko](https://github.com/blefnk)  
part of the [reliverse](https://github.com/reliverse) ecosystem.

*p.s. this readme was generated with [@reliverse/redocs](https://github.com/reliverse/redocs)*
