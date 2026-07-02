import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { middleware } from "@/middleware";

describe("middleware auth and permissions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects missing sessions to sign in", async () => {
    const request = new NextRequest("http://localhost/admin");

    const response = await middleware(request);

    expect(response.headers.get("location")).toContain("/sign-in");
  });

  it("allows an admin session on protected routes", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "user-1", user_metadata: {} }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ role: "admin" }]),
      });

    vi.stubGlobal("fetch", fetchMock);

    const request = new NextRequest("http://localhost/admin", {
      headers: {
        cookie: "supabase-token=valid-token",
      },
    });

    const response = await middleware(request);

    expect(response.headers.get("location")).toBeNull();
  });

  it("blocks authenticated non-admin users from admin routes", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "user-2", user_metadata: { role: "client" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ role: "client" }]),
      });

    vi.stubGlobal("fetch", fetchMock);

    const request = new NextRequest("http://localhost/admin/users", {
      headers: {
        cookie: "supabase-token=valid-token",
      },
    });

    const response = await middleware(request);

    expect(response.headers.get("location")).toContain("/sign-in");
  });
});