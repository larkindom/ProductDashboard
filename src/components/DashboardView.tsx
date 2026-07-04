import { ActionItemsSection } from "./ActionItemsSection";
import { MetricsCharts } from "./MetricsCharts";
import { ProjectsSection } from "./ProjectsSection";
import { StatTile } from "./StatTile";
import { kpiSummary } from "../data/mockData";

export function DashboardView() {
  return (
    <>
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
    </>
  );
}
