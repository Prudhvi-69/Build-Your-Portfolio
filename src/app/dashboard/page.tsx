import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

/**
 * The studio is for signed-in people only. Gating on the server means an
 * anonymous visitor is sent to log in before any of the page is sent, and is
 * brought back here afterwards — which is what the "Create your studio" button
 * on the 404 pages promises.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=%2Fdashboard");

  return <DashboardClient />;
}
