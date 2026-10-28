export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-12">Features</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">100% free</h3>
            <p className="text-muted-foreground">No credit card, no tiers. Host your portfolio for free.</p>
          </div>
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">Live in minutes</h3>
            <p className="text-muted-foreground">Fill in a form and your portfolio is online instantly.</p>
          </div>
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">Custom URL</h3>
            <p className="text-muted-foreground">Choose your own slug like <span className="font-mono">yourname.portfoliohost.dev</span>.</p>
          </div>
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">Responsive design</h3>
            <p className="text-muted-foreground">Looks great on phones, tablets, and desktops.</p>
          </div>
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">Easy editing</h3>
            <p className="text-muted-foreground">Update your bio, skills, projects, and links anytime from your dashboard.</p>
          </div>
          <div className="p-6 rounded-xl border border-input bg-background">
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-muted-foreground">Powered by Supabase auth and row-level security.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
