"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { checkSignupEmail } from "@/lib/account";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Only same-site paths are honoured, so ?next= can't become an open redirect.
  const requested = searchParams.get("next") || "";
  const next = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuggestion("");
    setLoading(true);

    // Reject typo'd, disposable and already-registered addresses before creating
    // an account nobody can receive mail for.
    const emailCheck = await checkSignupEmail(email);
    if (!emailCheck.ok) {
      setLoading(false);
      setError(emailCheck.message || "Please check the email address.");
      setSuggestion(emailCheck.suggestion || "");
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email: emailCheck.email || email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }

    // A session means email confirmation is switched off for this project, so
    // the account is live immediately. Otherwise show what to do next.
    if (data.session) {
      router.push(next);
      router.refresh();
      return;
    }
    setAwaitingConfirmation(true);
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
        {awaitingConfirmation ? (
          <div role="status" aria-live="polite" className="rounded-2xl border border-[#cfe0c2] bg-[#f2f7ee] p-5">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#35634d]">
              <CheckCircle2 size={17} /> Account created
            </span>
            <p className="mt-2 text-[13px] leading-6 text-[#4c6156]">
              We sent a confirmation link to <span className="font-semibold">{email.trim()}</span>. Open it to
              activate your account, then log in to start building.
            </p>
            <p className="mt-3 flex items-start gap-2 text-[12px] leading-5 text-[#68756c]">
              <Mail size={14} className="mt-0.5 shrink-0" /> Can&apos;t find it? Check the spam folder and
              confirm the address is spelled correctly.
            </p>
            <Link
              href={next === "/dashboard" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
              className="primary-action mt-4 inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold"
            >
              Go to log in <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
        <>
        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[13px] text-[#a7372b]">
            <p>{error}</p>
            {suggestion && (
              <button
                type="button"
                onClick={() => {
                  setEmail(suggestion);
                  setError("");
                  setSuggestion("");
                }}
                className="mt-2 text-[12px] font-semibold underline underline-offset-2"
              >
                Use {suggestion}
              </button>
            )}
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
            minLength={8}
            required
          />
          <p className="-mt-2 text-[11px] leading-5 text-[#879186]">
            At least 8 characters. Use a real inbox — we send a confirmation link there.
          </p>
          <Button type="submit" className="primary-action mt-2 flex h-12 w-full items-center justify-center gap-2 text-[13px] font-semibold" disabled={loading}>
            {loading ? "Creating account..." : <>Create your account <ArrowUpRight size={16} /></>}
          </Button>
        </form>
        <p className="mt-7 text-center text-[13px] text-[#68756c]">
          Already have an account?{" "}
          <Link
            href={next === "/dashboard" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
            className="font-semibold text-[#35634d] hover:underline"
          >
            Log in
          </Link>
        </p>
        </>
        )}
        </section>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="auth-backdrop min-h-[calc(100vh-76px)]" />}>
      <SignupForm />
    </Suspense>
  );
}
