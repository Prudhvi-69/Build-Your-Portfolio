"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function AdminSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(result.error || "Those credentials are not recognised.");
      return;
    }
    router.refresh();
  }

  return (
    <main className="auth-backdrop grid min-h-[calc(100vh-76px)] place-items-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-[430px] rounded-[24px] border border-[#dedfd5] bg-[#fffefa] p-7 shadow-[0_24px_90px_rgba(25,53,46,0.10)] sm:p-9">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-medium text-[#68756c] hover:text-[#19352e]">
          <ArrowLeft size={14} /> Back home
        </Link>
        <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#eaf0e5] text-[#35634d]">
          <ShieldCheck size={22} strokeWidth={1.7} />
        </span>
        <h1 className="serif-display mt-5 text-[38px] leading-none">Admin access.</h1>
        <p className="mt-3 text-[13px] leading-6 text-[#68756c]">
          This sign-in is separate from a regular account. It only works for the allow-listed address.
        </p>

        {error && (
          <div role="alert" className="mt-5 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[13px] text-[#a7372b]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Admin email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <Button
            type="submit"
            className="primary-action mt-1 flex h-12 w-full items-center justify-center text-[13px] font-semibold"
            disabled={loading}
          >
            {loading ? "Checking…" : "Enter console"}
          </Button>
        </form>
      </div>
    </main>
  );
}
