"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="auth-backdrop grid min-h-[calc(100vh-76px)] place-items-center px-5 py-12 sm:px-8">
      <div className="grid w-full max-w-[990px] overflow-hidden rounded-[28px] border border-[#dedfd5] bg-[#fffefa] shadow-[0_24px_90px_rgba(25,53,46,0.10)] md:grid-cols-[0.9fr_1.1fr]">
        <aside className="hero-grid relative hidden flex-col justify-between overflow-hidden p-10 text-[#f5f5ee] md:flex">
          <Link href="/" className="flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.06em]"><span className="brand-mark">p.</span> profolion.</Link>
          <div className="relative z-[1] py-12">
            <Sparkles className="mb-7 text-[#d7ff70]" size={22} />
            <p className="eyebrow mb-4">A little more you</p>
            <p className="serif-display text-[52px] leading-[0.98]">The next<br />good thing<br /><span className="text-[#d7ff70]">starts here.</span></p>
            <p className="mt-5 max-w-[290px] text-[13px] leading-6 text-white/65">Gather your best work. Give it a home. See where the right link takes you.</p>
          </div>
          <p className="text-[11px] text-white/45">Your work has places to go ↗</p>
          <div className="absolute -bottom-16 -right-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-6 -right-10 h-40 w-40 rounded-full border border-white/10" />
        </aside>
        <section className="p-7 sm:p-10 md:p-12">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-[12px] font-medium text-[#68756c] hover:text-[#19352e]"><ArrowLeft size={14} /> Back home</Link>
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#67815c]">Start your next chapter</p>
            <h1 className="serif-display text-[42px] leading-none sm:text-[48px]">Make it yours.</h1>
            <p className="mt-3 text-[14px] text-[#68756c]">Create your free account. Your portfolio is just around the corner.</p>
          </div>
        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[13px] text-[#a7372b]">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
          <Button type="submit" className="primary-action mt-2 flex h-12 w-full items-center justify-center gap-2 text-[13px] font-semibold" disabled={loading}>
            {loading ? "Creating account..." : <>Create your account <ArrowUpRight size={16} /></>}
          </Button>
        </form>
        <p className="mt-7 text-center text-[13px] text-[#68756c]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#35634d] hover:underline">
            Log in
          </Link>
        </p>
        </section>
      </div>
    </main>
  );
}
