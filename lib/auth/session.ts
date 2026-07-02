export const SESSION_COOKIE_NAME = "supabase-token";

export const ADMIN_ROLES = ["super_admin", "admin", "content_manager", "sales_manager"] as const;

export function isAdminRole(role: string | null | undefined): boolean {
  return !!role && ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);
}

export function buildSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 10,
  };
}

export async function syncSessionCookie(token: string) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync auth session");
  }
}

export async function clearSessionCookie() {
  const response = await fetch("/api/auth/session", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear auth session");
  }
}