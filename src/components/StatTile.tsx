import type { KpiSummary } from "../data/mockData";

function deltaColor(kpi: KpiSummary): string {
  if (kpi.trend === "flat") return "var(--text-muted)";
  const isGood = kpi.trend === kpi.goodDirection;
  return isGood ? "var(--status-good)" : "var(--status-critical)";
}

function TrendIcon({ trend, color }: { trend: KpiSummary["trend"]; color: string }) {
  if (trend === "flat") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <line x1="2" y1="6" x2="10" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  const points = trend === "up" ? "2,10 6,3 10,10" : "2,2 6,9 10,2";
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatTile({ kpi }: { kpi: KpiSummary }) {
  const color = deltaColor(kpi);
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {kpi.label}
      </p>
      <p
        className="mt-1 text-3xl font-semibold tabular-nums"
        style={{ color: "var(--text-primary)" }}
      >
        {kpi.value}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-sm" style={{ color }}>
        <TrendIcon trend={kpi.trend} color={color} />
        <span>{kpi.deltaLabel}</span>
      </div>
    </div>
  );
}
