import { ActionItemsSection } from "./components/ActionItemsSection";
import { MetricsCharts } from "./components/MetricsCharts";
import { ProjectsSection } from "./components/ProjectsSection";
import { StatTile } from "./components/StatTile";
import { ThemeToggle } from "./components/ThemeToggle";
import { kpiSummary, lastUpdated } from "./data/mockData";

function App() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Product Status Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            A single view for stakeholders: key product metrics, active projects, and open
            action items.
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            Last updated {lastUpdated}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiSummary.map((kpi) => (
          <StatTile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="mb-8">
        <MetricsCharts />
      </div>

      <div className="mb-8">
        <ProjectsSection />
      </div>

      <div>
        <ActionItemsSection />
      </div>
    </div>
  );
}

export default App;
