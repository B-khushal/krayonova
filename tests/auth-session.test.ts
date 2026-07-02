import { beforeEach, describe, expect, it, vi } from "vitest";
import { DELETE, POST } from "@/app/api/auth/session/route";

describe("auth session route", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects invalid tokens", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const response = await POST(new Request("http://localhost/api/auth/session", {
      method: "POST",
      body: JSON.stringify({ token: "bad-token" }),
    }));

    expect(response.status).toBe(401);
  });

  it("sets an HttpOnly session cookie for valid tokens", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "user-1" }),
    }));

    const response = await POST(new Request("http://localhost/api/auth/session", {
      method: "POST",
      body: JSON.stringify({ token: "valid-token" }),
    }));

    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("supabase-token=valid-token");
    expect(setCookie).toContain("HttpOnly");
  });

  it("clears the session cookie on logout", async () => {
    const response = await DELETE();

    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("supabase-token=");
    expect(setCookie).toContain("Max-Age=0");
  });
});