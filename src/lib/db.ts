"use server";

import { createClient } from "@/lib/supabase/server";
import type { Portfolio, Profile } from "@/lib/supabase/types";

export async function getPortfolio(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error || !data) return { portfolio: null, error };
  return { portfolio: data as Portfolio, error: null };
}

export async function getUserPortfolios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("updated_at", { ascending: false });
  return { portfolios: (data as Portfolio[]) || [], error };
}

export async function createPortfolio(input: {
  slug: string;
  title?: string;
  bio?: string;
  avatar_url?: string | null;
  skills?: string[];
  projects?: unknown[];
  experience?: unknown[];
  education?: unknown[];
  social_links?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { portfolio: null, error: new Error("Not authenticated") };

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name,
  });
  if (profileError) return { portfolio: null, error: profileError };

  const { data, error } = await supabase
    .from("portfolios")
    .insert({
      user_id: user.id,
      slug: input.slug,
      title: input.title || "My Portfolio",
      bio: input.bio || "",
      avatar_url: input.avatar_url || null,
      skills: input.skills || [],
      projects: input.projects || [],
      experience: input.experience || [],
      education: input.education || [],
      social_links: input.social_links || {},
    })
    .select()
    .single();
  return { portfolio: data as Portfolio, error };
}

export async function updatePortfolio(
  id: string,
  input: Partial<{
    slug: string;
    title: string;
    bio: string;
    avatar_url: string | null;
    skills: string[];
    projects: unknown[];
    experience: unknown[];
    education: unknown[];
    social_links: Record<string, unknown>;
  }>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { portfolio: null, error: new Error("Not authenticated") };

  const { data, error } = await supabase
    .from("portfolios")
    .update(input)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();
  return { portfolio: data as Portfolio, error };
}

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { profile: null, error: new Error("Not authenticated") };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  return { profile: data as Profile | null, error };
}
