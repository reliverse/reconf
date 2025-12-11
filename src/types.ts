export type ReconfConfig = {
  input?: string;
  output?: string;
  rules?: Record<string, any>;
  plugins?: string[];
};

export type ReconfMeta = {
  // Meta properties
  projectName?: string;
};
