import type { Project, ProjectStatus } from "../data/mockData";
import { projects } from "../data/mockData";

const statusConfig: Record<ProjectStatus, { label: string; color: string; symbol: string }> = {
  "on-track": { label: "On track", color: "var(--status-good)", symbol: "●" },
  "at-risk": { label: "At risk", color: "var(--status-warning)", symbol: "▲" },
  blocked: { label: "Blocked", color: "var(--status-critical)", symbol: "■" },
  done: { label: "Done", color: "var(--text-muted)", symbol: "✓" },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
      style={{ borderColor: "var(--border-hairline)", color: "var(--text-primary)" }}
    >
      <span style={{ color: cfg.color }} aria-hidden="true">
        {cfg.symbol}
      </span>
      {cfg.label}
    </span>
  );
}

function ProjectRow({ project, isFirst }: { project: Project; isFirst: boolean }) {
  return (
    <div
      className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
      style={{ borderTop: isFirst ? "none" : "1px solid var(--gridline)" }}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
          {project.summary}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div
            className="h-1.5 w-40 overflow-hidden rounded-full"
            style={{ background: "var(--gridline)" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${project.progress}%`, background: "var(--series-1)" }}
            />
          </div>
          <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
            {project.progress}%
          </span>
        </div>
      </div>
      <div className="text-sm sm:text-right" style={{ color: "var(--text-secondary)" }}>
        <div>{project.owner}</div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          Target {project.targetDate}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
        Active projects
      </h2>
      <div
        className="rounded-lg border"
        style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
      >
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} isFirst={i === 0} />
        ))}
      </div>
    </section>
  );
}
