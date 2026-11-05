import type { Metadata } from "next";
import AdminSignIn from "@/components/admin/AdminSignIn";
import AdminConsole from "@/components/admin/AdminConsole";
import { isAdminSession } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Profolion",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    return <AdminSignIn />;
  }

  const overview = await getAdminOverview();
  return <AdminConsole overview={overview} />;
}
