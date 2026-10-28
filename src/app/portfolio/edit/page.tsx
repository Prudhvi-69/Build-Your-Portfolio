"use client";

import { Suspense, useCallback, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/client";
import { createPortfolio, updatePortfolio } from "@/lib/db";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Card from "@/components/ui/card";

type Item = {
  title: string;
  description: string;
  link?: string;
  date?: string;
};

function EditPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const [title, setTitle] = useState("My Portfolio");
  const [bio, setBio] = useState("");
  const [slug, setSlug] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [projects, setProjects] = useState<Item[]>([]);
  const [experience, setExperience] = useState<Item[]>([]);
  const [education, setEducation] = useState<Item[]>([]);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  const loadPortfolio = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) {
      setError("Portfolio not found");
      return;
    }
    setTitle(data.title);
    setBio(data.bio);
    setSlug(data.slug);
    setSkills(data.skills || []);
    setAvatarUrl(data.avatar_url || "");
    setProjects(data.projects || []);
    setExperience(data.experience || []);
    setEducation(data.education || []);
    setSocialLinks(data.social_links || {});
  }, [supabase]);

  useEffect(() => {
    if (!editId) return;
    (async () => {
      setMode("edit");
      await loadPortfolio(editId);
    })();
  }, [editId, loadPortfolio]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      slug,
      title,
      bio,
      avatar_url: avatarUrl || null,
      skills: skills.filter(Boolean),
      projects: projects.filter((p) => p.title),
      experience: experience.filter((e) => e.title),
      education: education.filter((e) => e.title),
      social_links: socialLinks,
    };

    let result;
    if (mode === "create") {
      result = await createPortfolio(payload);
    } else {
      result = await updatePortfolio(editId!, payload);
    }

    setLoading(false);
    if (result.error) {
      setError(result.error.message || "Failed to save portfolio");
      return;
    }
    router.push(`/portfolio/${result.portfolio?.slug}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#67815c]">Your next chapter</p>
          <h1 className="serif-display text-[42px] leading-none">{mode === "create" ? "Make it yours." : "A little polish."}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{mode === "create" ? "A few details, then your work is ready to share." : "Fine-tune your portfolio and let it shine."}</p>
        </div>
        <Button onClick={() => router.push("/dashboard")} variant="outline" className="rounded-full">
          Back to dashboard
        </Button>
      </div>

      {error && (
        <div role="alert" className="mb-4 rounded-xl border border-[#f1c7bd] bg-[#fff2ef] p-3 text-[13px] text-[#a7372b]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="surface-card p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Portfolio title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="space-y-2">
              <label className="field-label" htmlFor="portfolio-slug">Your portfolio link</label>
              <Input
                id="portfolio-slug"
                aria-label="Your portfolio link"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                {slug ? `Your page will be available at /portfolio/${slug}` : "Choose a short, memorable link for your portfolio."}
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <label className="field-label" htmlFor="portfolio-bio">A little about you</label>
            <Textarea
              id="portfolio-bio"
              aria-label="A little about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="space-y-2 mt-6">
            <label className="field-label" htmlFor="portfolio-avatar">Profile image URL</label>
            <Input
              id="portfolio-avatar"
              aria-label="Profile image URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
        </Card>

        <Card className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="serif-display text-[27px]">Skills</h3><p className="mt-1 text-[13px] text-muted-foreground">What do you love doing?</p></div>
          </div>
          <div className="flex gap-2 mb-4">
            {skills.map((s, i) => (
              <span key={i} className="flex items-center gap-2 rounded-medium border border-input bg-background px-3 py-1 text-sm">
                {s}
                <button
                  type="button"
                  aria-label={`Remove ${s}`}
                  onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  ×
                </button>
              </span>
            ))}
            <Input
              label="Add a skill"
              aria-label="Add a skill"
              value={""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    setSkills([...skills, val]);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
              className="flex-1"
            />
          </div>
        </Card>

        <Card className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="serif-display text-[27px]">Projects</h3><p className="mt-1 text-[13px] text-muted-foreground">Show a few things you&apos;re proud of.</p></div>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                label="Project name"
                value={p.title}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, title: e.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="What it is"
                value={p.description}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="Project link"
                value={p.link ?? ""}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, link: e.target.value } : x
                    )
                  )
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setProjects([...projects, { title: "", description: "", link: "" }])
            }
          >
            + Add a project
          </Button>
        </Card>

        <Card className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="serif-display text-[27px]">Experience</h3><p className="mt-1 text-[13px] text-muted-foreground">The experiences that shaped your work.</p></div>
          </div>
          {experience.map((e, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                label="Role and company"
                value={e.title}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, title: ev.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="What you did"
                value={e.description}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, description: ev.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="When"
                value={e.date ?? ""}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, date: ev.target.value } : x
                    )
                  )
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setExperience([...experience, { title: "", description: "", date: "" }])
            }
          >
            + Add an experience
          </Button>
        </Card>

        <Card className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="serif-display text-[27px]">Education</h3><p className="mt-1 text-[13px] text-muted-foreground">Learning that moved you forward.</p></div>
          </div>
          {education.map((e, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                label="Institution"
                value={e.title}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, title: ev.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="Degree or field"
                value={e.description}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, description: ev.target.value } : x
                    )
                  )
                }
              />
              <Input
                label="When"
                value={e.date ?? ""}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, date: ev.target.value } : x
                    )
                  )
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setEducation([...education, { title: "", description: "", date: "" }])
            }
          >
            + Add education
          </Button>
        </Card>

        <Card className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="serif-display text-[27px]">Elsewhere online</h3><p className="mt-1 text-[13px] text-muted-foreground">Connect the dots to the rest of your work.</p></div>
          </div>
          <div className="space-y-2">
            {[...Object.entries(socialLinks)].map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <Input
                  label="Platform"
                  value={key}
                  onChange={(ev) => {
                    const newKey = ev.target.value;
                    const newLinks = { ...socialLinks };
                    delete newLinks[key];
                    newLinks[newKey] = value;
                    setSocialLinks(newLinks);
                  }}
                />
                <Input
                  label="Profile URL"
                  value={value}
                  onChange={(ev) =>
                    setSocialLinks({ ...socialLinks, [key]: ev.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <Button type="submit" className="accent-action flex h-12 w-full items-center justify-center font-semibold" disabled={loading}>
          {loading ? "Saving..." : "Save and publish"}
        </Button>
      </form>
    </div>
  );
}

export default function PortfolioEditPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-10">Loading…</div>}>
      <EditPageContent />
    </Suspense>
  );
}
