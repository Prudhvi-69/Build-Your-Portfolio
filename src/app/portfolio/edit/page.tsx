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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{mode === "create" ? "Create your portfolio" : "Edit portfolio"}</h1>
        <Button onClick={() => router.push("/dashboard")} variant="outline">
          Back to dashboard
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-medium bg-destructive/10 border border-destructive/50 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Portfolio"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug (URL)</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="jane-doe"
                required
              />
              <p className="text-xs text-muted-foreground">
                yourname.portfoliohost.dev/{slug}
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </div>
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-foreground">Avatar URL</label>
            <Input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
          </div>
          <div className="flex gap-2 mb-4">
            {skills.map((s, i) => (
              <span key={i} className="flex items-center gap-2 rounded-medium border border-input bg-background px-3 py-1 text-sm">
                {s}
                <button
                  type="button"
                  onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  ×
                </button>
              </span>
            ))}
            <Input
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
              placeholder="Add a skill and press Enter"
              className="flex-1"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Projects</h3>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                value={p.title}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, title: e.target.value } : x
                    )
                  )
                }
                placeholder="Project title"
              />
              <Input
                value={p.description}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, description: e.target.value } : x
                    )
                  )
                }
                placeholder="Description"
              />
              <Input
                value={p.link ?? ""}
                onChange={(e) =>
                  setProjects(
                    projects.map((x, j) =>
                      j === i ? { ...x, link: e.target.value } : x
                    )
                  )
                }
                placeholder="Link"
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
            + Add project
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Experience</h3>
          </div>
          {experience.map((e, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                value={e.title}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, title: ev.target.value } : x
                    )
                  )
                }
                placeholder="Role / Company"
              />
              <Input
                value={e.description}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, description: ev.target.value } : x
                    )
                  )
                }
                placeholder="Description"
              />
              <Input
                value={e.date ?? ""}
                onChange={(ev) =>
                  setExperience(
                    experience.map((x, j) =>
                      j === i ? { ...x, date: ev.target.value } : x
                    )
                  )
                }
                placeholder="Date"
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
            + Add experience
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          {education.map((e, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3 mb-3">
              <Input
                value={e.title}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, title: ev.target.value } : x
                    )
                  )
                }
                placeholder="Institution"
              />
              <Input
                value={e.description}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, description: ev.target.value } : x
                    )
                  )
                }
                placeholder="Degree / Field"
              />
              <Input
                value={e.date ?? ""}
                onChange={(ev) =>
                  setEducation(
                    education.map((x, j) =>
                      j === i ? { ...x, date: ev.target.value } : x
                    )
                  )
                }
                placeholder="Date"
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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
          </div>
          <div className="space-y-2">
            {[...Object.entries(socialLinks)].map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <Input
                  value={key}
                  onChange={(ev) => {
                    const newKey = ev.target.value;
                    const newLinks = { ...socialLinks };
                    delete newLinks[key];
                    newLinks[newKey] = value;
                    setSocialLinks(newLinks);
                  }}
                  placeholder="GitHub"
                />
                <Input
                  value={value}
                  onChange={(ev) =>
                    setSocialLinks({ ...socialLinks, [key]: ev.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            ))}
          </div>
        </Card>

        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
          {loading ? "Saving..." : "Save & publish"}
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
