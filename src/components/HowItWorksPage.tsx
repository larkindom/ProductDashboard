import { IntegrationFlowChart } from "./IntegrationFlowChart";

interface Section {
  title: string;
  body: string;
}

const sections: Section[] = [
  {
    title: "Key product metrics",
    body:
      "Monthly active users, MRR, churn rate, and NPS as stat tiles with a trend " +
      "vs. last month, plus charts for user growth, revenue, and churn. Use " +
      "\"Show as table\" to read the same numbers as a table.",
  },
  {
    title: "Active projects",
    body:
      "A kanban board of every initiative by release stage — upcoming, in " +
      "progress, testing, beta release, GA release — with a health badge on " +
      "any card that's at risk or blocked, plus owner, progress, and target date.",
  },
  {
    title: "Open action items",
    body:
      "Outstanding to-dos with an owner, priority, status, and due date, sorted " +
      "soonest-due first, so nothing slips between updates.",
  },
];

const healthLegend = [
  { label: "At risk", color: "var(--status-warning)" },
  { label: "Blocked", color: "var(--status-critical)" },
];

const actionItemLegend = [
  { label: "Done", color: "var(--status-good)" },
  { label: "Medium priority", color: "var(--status-warning)" },
  { label: "High priority", color: "var(--status-critical)" },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      {children}
    </div>
  );
}

export function HowItWorksPage() {
  return (
    <div className="max-w-3xl">
      <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
        This dashboard exists to give stakeholders a fast, self-serve status
        update — metrics, project health, and open to-dos in one place, instead
        of a recurring status meeting or a written report.
      </p>

      <div className="mb-6 flex flex-col gap-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {section.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {section.body}
            </p>
          </Card>
        ))}
      </div>

      <h2 className="mb-1 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        Where the data comes from
      </h2>
      <p className="mb-3 text-sm" style={{ color: "var(--text-secondary)" }}>
        In a production version, each tool below connects through its own MCP
        server, so the dashboard reads live data instead of the mock data this
        proof of concept ships with.
      </p>
      <div className="mb-6">
        <IntegrationFlowChart />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Project health badges
          </h3>
          <ul className="flex flex-col gap-1.5 text-sm">
            {healthLegend.map((item) => (
              <li key={item.label} className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
                {item.label}
              </li>
            ))}
            <li className="text-xs" style={{ color: "var(--text-muted)" }}>
              On-track projects show no badge.
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Action item colors
          </h3>
          <ul className="flex flex-col gap-1.5 text-sm">
            {actionItemLegend.map((item) => (
              <li key={item.label} className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
                {item.label}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
        This is a proof of concept — all data currently comes from{" "}
        <code>src/data/mockData.ts</code>, and the integrations above are not
        yet wired up.
      </p>
    </div>
  );
}
