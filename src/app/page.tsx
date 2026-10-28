import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Your portfolio, ready in minutes.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Upload your details, pick a theme, and go live on a free subdomain. No code, no credit card.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="bg-primary text-primary-foreground px-6 py-3 rounded-medium font-medium hover:bg-primary/90 transition-colors text-lg">
                Get started — it&apos;s free
              </Link>
              <Link href="/login" className="px-6 py-3 rounded-medium border border-input bg-background text-sm font-medium hover:bg-accent transition-colors text-lg">
                Log in
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">1</div>
                <h3 className="text-lg font-semibold mb-2">Sign up</h3>
                <p className="text-muted-foreground">Create a free account with email or GitHub.</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">2</div>
                <h3 className="text-lg font-semibold mb-2">Fill in your details</h3>
                <p className="text-muted-foreground">Add your bio, skills, projects, education, and links.</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">3</div>
                <h3 className="text-lg font-semibold mb-2">Go live</h3>
                <p className="text-muted-foreground">Your portfolio is live at <span className="font-mono">yourname.portfoliohost.dev</span>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-input bg-background">
                <h3 className="text-lg font-semibold mb-2">Free hosting</h3>
                <p className="text-muted-foreground text-sm">Host your portfolio on Netlify for free.</p>
              </div>
              <div className="p-6 rounded-xl border border-input bg-background">
                <h3 className="text-lg font-semibold mb-2">Custom slug</h3>
                <p className="text-muted-foreground text-sm">Choose your own portfolio URL.</p>
              </div>
              <div className="p-6 rounded-xl border border-input bg-background">
                <h3 className="text-lg font-semibold mb-2">Responsive</h3>
                <p className="text-muted-foreground text-sm">Looks great on every device.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted py-10 px-4 text-center text-muted-foreground text-sm">
        PortfolioHost — free portfolio hosting for everyone.
      </footer>
    </div>
  );
}
