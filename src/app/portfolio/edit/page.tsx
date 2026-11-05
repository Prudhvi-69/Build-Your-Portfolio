import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditorClient from "./EditorClient";

export const dynamic = "force-dynamic";

/**
 * The editor is for signed-in people only, checked on the server before any of
 * the form is sent. Previously a visitor could fill everything out and only
 * discover on save that the session was missing — React surfaced that as
 * "error #441" (a server-render error). Now they log in first.
 *
 * The query string is carried through `next`, so after logging in they land back
 * on the exact template they chose.
 */
export default async function PortfolioEditPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value) query.set(key, value);
  }
  const suffix = query.toString();
  const here = `/portfolio/edit${suffix ? `?${suffix}` : ""}`;

  if (!user) redirect(`/login?next=${encodeURIComponent(here)}`);

  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-10">Loading…</div>}>
      <EditorClient />
    </Suspense>
  );
}
