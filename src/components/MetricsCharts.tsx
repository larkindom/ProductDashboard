import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { churn, revenue, userGrowth } from "../data/mockData";

const axisTick = { fill: "var(--text-muted)", fontSize: 12 };

function compactNumber(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;
}

function ChartTooltip({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  formatValue: (v: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-md border px-3 py-2 text-sm shadow-sm"
      style={{
        background: "var(--surface-1)",
        borderColor: "var(--border-hairline)",
        color: "var(--text-primary)",
      }}
    >
      <div style={{ color: "var(--text-secondary)" }}>{label}</div>
      <div className="font-medium tabular-nums">{formatValue(payload[0].value)}</div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      <h3 className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        {title}
      </h3>
      <div className="mt-3 h-56">{children}</div>
    </div>
  );
}

export function MetricsCharts() {
  const [showTable, setShowTable] = useState(false);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Key product metrics
        </h2>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-sm underline underline-offset-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {showTable ? "Show charts" : "Show as table"}
        </button>
      </div>

      {showTable ? (
        <div
          className="overflow-x-auto rounded-lg border"
          style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ color: "var(--text-secondary)" }}>
                <th className="px-4 py-2 font-medium">Month</th>
                <th className="px-4 py-2 font-medium">Active users</th>
                <th className="px-4 py-2 font-medium">New signups</th>
                <th className="px-4 py-2 font-medium">MRR</th>
                <th className="px-4 py-2 font-medium">Churn rate</th>
              </tr>
            </thead>
            <tbody>
              {userGrowth.map((row, i) => (
                <tr key={row.month} style={{ borderTop: "1px solid var(--gridline)" }}>
                  <td className="px-4 py-2" style={{ color: "var(--text-primary)" }}>
                    {row.month}
                  </td>
                  <td className="px-4 py-2 tabular-nums">{row.activeUsers.toLocaleString()}</td>
                  <td className="px-4 py-2 tabular-nums">{row.newSignups.toLocaleString()}</td>
                  <td className="px-4 py-2 tabular-nums">
                    ${revenue[i].mrr.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 tabular-nums">{churn[i].churnRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard title="Monthly active users">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} width={40} tickFormatter={compactNumber} />
                <Tooltip
                  content={
                    <ChartTooltip formatValue={(v) => `${v.toLocaleString()} users`} />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="var(--series-1)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly recurring revenue">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                  tickFormatter={(v: number) => `$${compactNumber(v)}`}
                />
                <Tooltip
                  content={<ChartTooltip formatValue={(v) => `$${v.toLocaleString()}`} />}
                  cursor={{ fill: "var(--gridline)" }}
                />
                <Bar dataKey="mrr" fill="var(--series-2)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Churn rate">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churn} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  domain={[0, "dataMax"]}
                  tickFormatter={(v: number) => `${v.toFixed(1)}%`}
                />
                <Tooltip content={<ChartTooltip formatValue={(v) => `${v}%`} />} />
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="var(--series-3)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </section>
  );
}
