import type { Env } from "../worker-configuration";

declare module "cloudflare:test" {
  // ProvidedEnv controls the type of `import("cloudflare:test").env`
  type ProvidedEnv = Env;
}
