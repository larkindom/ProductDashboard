import type { ActionItem, ActionItemPriority, ActionItemStatus } from "../data/mockData";
import { actionItems } from "../data/mockData";

const priorityConfig: Record<ActionItemPriority, { label: string; color: string }> = {
  high: { label: "High", color: "var(--status-critical)" },
  medium: { label: "Medium", color: "var(--status-warning)" },
  low: { label: "Low", color: "var(--text-muted)" },
};

const statusConfig: Record<ActionItemStatus, { label: string; color: string }> = {
  open: { label: "Open", color: "var(--text-secondary)" },
  "in-progress": { label: "In progress", color: "var(--series-1)" },
  done: { label: "Done", color: "var(--status-good)" },
};

function sortByDueDate(items: ActionItem[]): ActionItem[] {
  return [...items].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function ActionItemsSection() {
  const rows = sortByDueDate(actionItems);

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
        Open action items
      </h2>
      <div
        className="overflow-x-auto rounded-lg border"
        style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ color: "var(--text-secondary)" }}>
              <th className="px-4 py-2 font-medium">Action item</th>
              <th className="px-4 py-2 font-medium">Owner</th>
              <th className="px-4 py-2 font-medium">Priority</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, i) => {
              const priority = priorityConfig[item.priority];
              const status = statusConfig[item.status];
              return (
                <tr
                  key={item.id}
                  style={i === 0 ? undefined : { borderTop: "1px solid var(--gridline)" }}
                >
                  <td className="px-4 py-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </td>
                  <td className="px-4 py-2" style={{ color: "var(--text-secondary)" }}>
                    {item.owner}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center gap-1.5" style={{ color: priority.color }}>
                      <span aria-hidden="true">●</span>
                      <span style={{ color: "var(--text-primary)" }}>{priority.label}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2" style={{ color: status.color }}>
                    {status.label}
                  </td>
                  <td className="px-4 py-2 tabular-nums" style={{ color: "var(--text-secondary)" }}>
                    {item.dueDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
