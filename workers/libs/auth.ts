import { neon } from "@neondatabase/serverless";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-http";

import { account, session, user, verification } from "../database/schemas";
import { nanoid } from "../libs/nanoid";

export const auth = (
  env: CloudflareBindings
): ReturnType<typeof betterAuth> => {
  const psql = neon(env.DATABASE_URL);
  const db = drizzle(psql);

  return betterAuth({
    appName: "Monet",
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        account,
        user,
        session,
        verification
      }
    }),
    advanced: {
      database: {
        generateId: () => {
          return nanoid();
        }
      }
    },
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET
      }
    }
  });
};
