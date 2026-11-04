import type { Metadata } from "next";
import TemplateGallery from "@/components/templates/TemplateGallery";
import { SAMPLE_CONTENT } from "@/lib/portfolio/content";
import { TEMPLATES } from "@/lib/templates/registry";

export const metadata: Metadata = {
  title: "Templates — Profolion",
  description:
    "22 portfolio templates, each with its own typography, palette, section order and signature interaction.",
};

export default function TemplatesPage() {
  return (
    <main className="min-h-[calc(100vh-76px)] w-full">
      <TemplateGallery
        templates={TEMPLATES}
        demoName={SAMPLE_CONTENT.name}
        demoRole={SAMPLE_CONTENT.role}
        demoProjects={SAMPLE_CONTENT.projects.map((project) => project.title)}
      />
    </main>
  );
}
