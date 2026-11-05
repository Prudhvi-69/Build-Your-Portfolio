import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionTtlMs,
  issueAdminToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

/** Sign the admin in. Credentials never leave the server side of this check. */
export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  // A small hold-off after a bad attempt makes guessing impractical.
  if (!verifyAdminCredentials(email, password)) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ error: "Those credentials are not recognised." }, { status: 401 });
  }

  const { token, expiresAt } = issueAdminToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
    maxAge: Math.floor(adminSessionTtlMs / 1000),
  });
  return response;
}

/** Sign the admin out. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ name: ADMIN_SESSION_COOKIE, value: "", path: "/", maxAge: 0 });
  return response;
}

/** Who is signed in, for the console header. */
export async function GET(request: NextRequest) {
  const present = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  return NextResponse.json({ signedIn: present });
}
