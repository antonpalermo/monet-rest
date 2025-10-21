import type { ValidationTargets } from "hono";
import { validator } from "hono/validator";

import z from "zod";

export function validate<
  Target extends keyof ValidationTargets,
  Schema extends z.ZodType
>(target: Target, schema: Schema) {
  return validator(target, async (value, ctx) => {
    const parsed = schema.safeParse(value);

    if (!parsed.success) {
      return ctx.json(
        {
          timestamp: Date.now(),
          message: `invalid ${target}`,
          context: parsed.error.issues
        },
        400
      );
    }

    return parsed.data;
  });
}
