import { notFound } from "next/navigation";
import Image from "next/image";
import { getPortfolio } from "@/lib/db";

export const dynamic = "force-dynamic";

type Item = {
  title: string;
  description?: string;
  link?: string;
  date?: string;
};

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { portfolio, error } = await getPortfolio(slug);
  if (error || !portfolio) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-20 bg-background/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <a
            href={`/portfolio/${portfolio.slug}`}
            className="flex items-center gap-2"
          >
            <span className="rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">P</span>
            <span className="text-lg font-bold tracking-tight">{portfolio.title}</span>
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            {portfolio.avatar_url && (
              <Image
                src={portfolio.avatar_url}
                alt="Avatar"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-border"
              />
            )}
            <h1 className="text-2xl font-bold text-center md:text-left">{portfolio.title}</h1>
            <p className="text-muted-foreground text-center md:text-left text-sm">{portfolio.bio}</p>
            <div className="mt-6 space-y-3 text-sm">
              {Object.entries(portfolio.social_links as Record<string, string>).map(
                ([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="text-muted-foreground">{key}:</span>{" "}
                    {url}
                  </a>
                )
              )}
            </div>
          </aside>

          <section className="flex-1 space-y-10">
            {portfolio.skills && portfolio.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(portfolio.skills as string[]).map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full border border-input text-sm bg-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {portfolio.projects && portfolio.projects.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Projects
                </h2>
                <div className="space-y-4">
                  {(portfolio.projects as Item[]).map((p: Item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-input bg-muted/30"
                    >
                      <h3 className="font-semibold">{p.title}</h3>
                      {p.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {p.description}
                        </p>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                          View project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolio.experience && portfolio.experience.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Experience
                </h2>
                <div className="space-y-4">
                  {(portfolio.experience as Item[]).map((e: Item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-input bg-muted/30"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold">{e.title}</h3>
                        {e.date && (
                          <span className="text-sm text-muted-foreground font-mono">
                            {e.date}
                          </span>
                        )}
                      </div>
                      {e.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {e.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolio.education && portfolio.education.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
                  Education
                </h2>
                <div className="space-y-4">
                  {(portfolio.education as Item[]).map((e: Item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-input bg-muted/30"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold">{e.title}</h3>
                        {e.date && (
                          <span className="text-sm text-muted-foreground font-mono">
                            {e.date}
                          </span>
                        )}
                      </div>
                      {e.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {e.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
