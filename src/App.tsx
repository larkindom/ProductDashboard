import { useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { Sidebar, type View } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { lastUpdated } from "./data/mockData";

const pageCopy: Record<View, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Product Status Dashboard",
    subtitle:
      "A single view for stakeholders: key product metrics, active projects, and open action items.",
  },
  "how-it-works": {
    title: "How it works",
    subtitle: "What each section of the dashboard shows and where the data comes from.",
  },
};

function App() {
  const [view, setView] = useState<View>("dashboard");
  const copy = pageCopy[view];

  return (
    <div className="flex min-h-screen">
      <Sidebar active={view} onNavigate={setView} />

      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                {copy.title}
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                {copy.subtitle}
              </p>
              {view === "dashboard" && (
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  Last updated {lastUpdated}
                </p>
              )}
            </div>
            <ThemeToggle />
          </header>

          {view === "dashboard" ? <DashboardView /> : <HowItWorksPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
