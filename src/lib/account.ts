"use server";

import { createClient } from "@/lib/supabase/server";

import type { Portfolio } from "@/lib/supabase/types";

/** Free providers very often typo'd; catching these avoids unreachable accounts. */
const TYPOS: Record<string, string> = {
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gnail.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "hotmai.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.co": "outlook.com",
  "iclod.com": "icloud.com",
  "protonmai.com": "protonmail.com",
};

const DISPOSABLE = /(^|\.)(mailinator|tempmail|guerrillamail|10minutemail|throwawaymail|yopmail|sharklasers)\./i;

export interface EmailCheck {
  ok: boolean;
  email?: string;
  suggestion?: string;
  message?: string;
}

/**
 * A deliverable-looking address cannot be proven from the browser, but the two
 * mistakes that actually lock people out — a typo'd free provider and a
 * throwaway inbox — can be caught before the account is created.
 */
export async function checkSignupEmail(raw: string): Promise<EmailCheck> {
  const email = raw.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    return { ok: false, message: "That email address isn't complete. Check it and try again." };
  }

  const domain = email.split("@")[1] ?? "";
  if (domain.endsWith(".test") || domain.endsWith(".invalid") || domain === "example.com") {
    return { ok: false, message: "That domain can't receive mail. Use a real inbox." };
  }
  if (TYPOS[domain]) {
    return {
      ok: false,
      suggestion: email.replace(domain, TYPOS[domain]),
      message: `Did you mean @${TYPOS[domain]}?`,
    };
  }
  if (DISPOSABLE.test(domain)) {
    return { ok: false, message: "Disposable inboxes can't receive your confirmation link. Use a permanent address." };
  }

  // An address that already exists cannot be used for a second account.
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id").eq("email", email).maybeSingle();
  if (data) {
    return { ok: false, message: "An account already exists for this email. Try logging in instead." };
  }

  return { ok: true, email };
}

/** Counts one visit. Anonymous visitors can do this; they cannot edit rows. */
export async function registerPortfolioView(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("record_portfolio_view", { portfolio_slug: slug });
  return { error: error?.message ?? null };
}

export async function getMyPortfolios() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { portfolios: [] as Portfolio[], error: "Not signed in" as string | null };

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return { portfolios: (data as Portfolio[]) ?? [], error: error?.message ?? null };
}

export async function getMyAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { email: null, fullName: null, createdAt: null, error: "Not signed in" };

  const { data } = await supabase
    .from("profiles")
    .select("email, full_name, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    email: data?.email ?? user.email ?? null,
    fullName: data?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? null,
    createdAt: data?.created_at ?? user.created_at ?? null,
    error: null,
  };
}

/**
 * `title` is what the templates call your name, so the profile page writes it
 * there. This is the only place the profile and a portfolio share a field.
 */
export async function saveAccountProfile(input: { fullName: string; portfolioId?: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const fullName = input.fullName.trim();
  if (!fullName) return { error: "Your name can't be empty." };

  const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName } });
  if (authError) return { error: authError.message };

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email, full_name: fullName });
  if (profileError) return { error: profileError.message };

  if (input.portfolioId) {
    const { error } = await supabase
      .from("portfolios")
      .update({ title: fullName })
      .eq("id", input.portfolioId)
      .eq("user_id", user.id);
    if (error) return { error: error.message };
  }

  return { error: null };
}

/** Publishes/unpublishes one of the caller's portfolios. */
export async function setPortfolioVisibility(id: string, isPublished: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { error } = await supabase
    .from("portfolios")
    .update({ is_published: isPublished })
    .eq("id", id)
    .eq("user_id", user.id);
  return { error: error?.message ?? null };
}
