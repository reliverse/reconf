export type { DotenvOptions, Env } from "./impl/dotenv.js";
export { setupDotenv, loadDotenv } from "./impl/dotenv.js";
export { SUPPORTED_EXTENSIONS, loadConfig } from "./impl/loader.js";
export type {
  ConfigLayerMeta,
  UserInputConfig,
  C12InputConfig,
  InputConfig,
  SourceOptions,
  ConfigLayer,
  ResolvedConfig,
  ResolvableConfigContext,
  ResolvableConfig,
  LoadConfigOptions,
  DefineConfig,
} from "./impl/types.js";
export { createDefineConfig } from "./impl/types.js";
export type {
  UpdateConfigResult,
  UpdateConfigOptions,
} from "./impl/update.js";
export { updateConfig } from "./impl/update.js";
export type { ConfigWatcher, WatchConfigOptions } from "./impl/watch.js";
export { watchConfig } from "./impl/watch.js";
