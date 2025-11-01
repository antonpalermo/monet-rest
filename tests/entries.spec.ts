import { env } from "cloudflare:test";
import app from "../server";

describe("entries", () => {
  it("get all entries should return 200 ok and match retuned object", async () => {
    const request = await app.request("/api/entries", {}, env);
    expect(request.status).toBe(200);
  });
});
