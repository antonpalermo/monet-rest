import { env } from "cloudflare:test";
import app from "../workers/server";

describe("app specs", () => {
  it("api should return 200 status", async () => {
    const request = await app.request("/api", {}, env);
    expect(request.status).toBe(200);
    expect(await request.text()).toMatch("Hello Hono!");
  });
});
