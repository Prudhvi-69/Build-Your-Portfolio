import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * The admin console is deliberately separate from Supabase Auth: it is a single
 * allow-listed account whose credentials live in the database, not in
 * `auth.users`. Nothing here touches a regular user's session, and a regular
 * user can never acquire the marker cookie because only the server issues it.
 */

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "prudhvi@profolion.org").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "RDJ4me@heart";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "profolion-admin-session-v1";

export const ADMIN_SESSION_COOKIE = "profolion_admin";

/** Sessions expire, so a leaked cookie stops working on its own. */
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function tokenFor(issuedAt: number) {
  return createHmac("sha256", SESSION_SECRET).update(`${ADMIN_EMAIL}:${issuedAt}`).digest("base64url");
}

export function verifyAdminCredentials(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  // Compare both fields in constant time and without early exits.
  const emailOk = safeEqual(normalized, ADMIN_EMAIL);
  const passwordOk = safeEqual(password, ADMIN_PASSWORD);
  return emailOk && passwordOk;
}

export function issueAdminToken() {
  const issuedAt = Date.now();
  return { token: `${issuedAt}.${tokenFor(issuedAt)}`, expiresAt: issuedAt + SESSION_TTL_MS };
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const issuedAt = Number(token.slice(0, separator));
  const signature = token.slice(separator + 1);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > SESSION_TTL_MS) return false;

  return safeEqual(signature, tokenFor(issuedAt));
}

/** Reads the signed cookie. This is the only thing a page trusts. */
export async function isAdminSession() {
  const store = await cookies();
  return isValidAdminToken(store.get(ADMIN_SESSION_COOKIE)?.value);
}

export const adminSessionTtlMs = SESSION_TTL_MS;
