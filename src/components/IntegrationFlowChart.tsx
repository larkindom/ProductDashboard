interface SourceNode {
  id: string;
  label: string;
  color: string;
  description: string;
  feeds: string[];
}

interface TargetNode {
  id: string;
  label: string;
}

const sources: SourceNode[] = [
  {
    id: "slack",
    label: "Slack",
    color: "var(--series-1)",
    description: "Channel threads and mentions become open action items.",
    feeds: ["actions"],
  },
  {
    id: "calls",
    label: "AI call summaries",
    color: "var(--series-2)",
    description: "Customer/sales call takeaways (e.g. Gong, Fireflies) become action items.",
    feeds: ["actions"],
  },
  {
    id: "warehouse",
    label: "Data warehouse",
    color: "var(--series-3)",
    description: "Revenue & product metrics (e.g. Snowflake, BigQuery) power the KPI charts.",
    feeds: ["metrics"],
  },
  {
    id: "sessions",
    label: "Product analytics",
    color: "var(--series-4)",
    description: "User session data (e.g. Amplitude, Mixpanel) powers usage metrics.",
    feeds: ["metrics"],
  },
  {
    id: "pm",
    label: "Linear / Jira",
    color: "var(--series-5)",
    description: "Epics, sprints, and issues drive project status and progress.",
    feeds: ["projects", "actions"],
  },
  {
    id: "github",
    label: "GitHub",
    color: "var(--series-6)",
    description: "PR and release activity signals project progress.",
    feeds: ["projects"],
  },
];

const targets: TargetNode[] = [
  { id: "metrics", label: "Key product metrics" },
  { id: "projects", label: "Active projects" },
  { id: "actions", label: "Open action items" },
];

const width = 780;
const height = 420;

const sourceBox = { x: 8, w: 224, h: 50 };
const hubBox = { x: 322, w: 146, h: 96 };
const targetBox = { x: 564, w: 208, h: 88 };

const sourceGap = 14;
const sourceTotal = sources.length * sourceBox.h + (sources.length - 1) * sourceGap;
const sourceStartY = (height - sourceTotal) / 2;
const sourceYs = sources.map((_, i) => sourceStartY + i * (sourceBox.h + sourceGap));

const hubY = (height - hubBox.h) / 2;

const targetGap = 26;
const targetTotal = targets.length * targetBox.h + (targets.length - 1) * targetGap;
const targetStartY = (height - targetTotal) / 2;
const targetYs = targets.map((_, i) => targetStartY + i * (targetBox.h + targetGap));

function curve(x1: number, y1: number, x2: number, y2: number): string {
  const midX = x1 + (x2 - x1) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1} ${midX} ${y2} ${x2} ${y2}`;
}

export function IntegrationFlowChart() {
  const hubLeftEntryYs = sources.map(
    (_, i) => hubY + ((i + 1) * hubBox.h) / (sources.length + 1),
  );
  const hubRightExitYs = targets.map(
    (_, i) => hubY + ((i + 1) * hubBox.h) / (targets.length + 1),
  );

  return (
    <div>
      <div
        className="overflow-x-auto rounded-lg border p-4"
        style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Diagram: Slack, AI call summaries, the data warehouse, product analytics, Linear/Jira, and GitHub each connect through an MCP server into the dashboard, which feeds key product metrics, active projects, and open action items."
          className="w-full"
          style={{ minWidth: 640 }}
        >
          {/* source -> hub connectors */}
          {sources.map((s, i) => (
            <path
              key={`edge-src-${s.id}`}
              d={curve(
                sourceBox.x + sourceBox.w,
                sourceYs[i] + sourceBox.h / 2,
                hubBox.x,
                hubLeftEntryYs[i],
              )}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.55}
            />
          ))}

          {/* hub -> target connectors */}
          {targets.map((t, i) => (
            <path
              key={`edge-tgt-${t.id}`}
              d={curve(
                hubBox.x + hubBox.w,
                hubRightExitYs[i],
                targetBox.x,
                targetYs[i] + targetBox.h / 2,
              )}
              fill="none"
              stroke="var(--baseline)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}

          {/* source nodes */}
          {sources.map((s, i) => (
            <g key={s.id}>
              <rect
                x={sourceBox.x}
                y={sourceYs[i]}
                width={sourceBox.w}
                height={sourceBox.h}
                rx={8}
                fill="var(--surface-1)"
                stroke="var(--border-hairline)"
              />
              <rect
                x={sourceBox.x + 12}
                y={sourceYs[i] + sourceBox.h / 2 - 5}
                width={10}
                height={10}
                rx={2}
                fill={s.color}
              />
              <text
                x={sourceBox.x + 32}
                y={sourceYs[i] + sourceBox.h / 2 + 4}
                fontSize={13}
                fontWeight={500}
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
            </g>
          ))}

          {/* hub node */}
          <rect
            x={hubBox.x}
            y={hubY}
            width={hubBox.w}
            height={hubBox.h}
            rx={8}
            fill="var(--surface-1)"
            stroke="var(--baseline)"
            strokeWidth={1.5}
          />
          <text
            x={hubBox.x + hubBox.w / 2}
            y={hubY + hubBox.h / 2 - 6}
            fontSize={13}
            fontWeight={600}
            textAnchor="middle"
            fill="var(--text-primary)"
          >
            MCP servers
          </text>
          <text
            x={hubBox.x + hubBox.w / 2}
            y={hubY + hubBox.h / 2 + 13}
            fontSize={9.5}
            textAnchor="middle"
            fill="var(--text-muted)"
          >
            one per tool,
          </text>
          <text
            x={hubBox.x + hubBox.w / 2}
            y={hubY + hubBox.h / 2 + 26}
            fontSize={9.5}
            textAnchor="middle"
            fill="var(--text-muted)"
          >
            aggregated here
          </text>

          {/* target nodes */}
          {targets.map((t, i) => (
            <g key={t.id}>
              <rect
                x={targetBox.x}
                y={targetYs[i]}
                width={targetBox.w}
                height={targetBox.h}
                rx={8}
                fill="var(--gridline)"
                stroke="var(--border-hairline)"
              />
              <text
                x={targetBox.x + targetBox.w / 2}
                y={targetYs[i] + targetBox.h / 2 + 4}
                fontSize={13}
                fontWeight={600}
                textAnchor="middle"
                fill="var(--text-primary)"
              >
                {t.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2" role="table" aria-label="Data sources and what they feed">
        {sources.map((s) => (
          <div key={s.id} className="flex items-start gap-2 text-sm" role="row">
            <span
              className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: s.color }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--text-secondary)" }}>
              <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                {s.label}:
              </span>{" "}
              {s.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
