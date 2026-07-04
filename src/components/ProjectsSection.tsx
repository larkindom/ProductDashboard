import type { Project, ProjectHealth, ProjectStage } from "../data/mockData";
import { projects } from "../data/mockData";

const columns: { stage: ProjectStage; label: string }[] = [
  { stage: "upcoming", label: "Upcoming" },
  { stage: "in-progress", label: "In progress" },
  { stage: "testing", label: "Testing" },
  { stage: "beta", label: "Beta release" },
  { stage: "ga", label: "GA release" },
];

const healthConfig: Record<ProjectHealth, { label: string; color: string } | null> = {
  "on-track": null,
  "at-risk": { label: "At risk", color: "var(--status-warning)" },
  blocked: { label: "Blocked", color: "var(--status-critical)" },
};

function HealthBadge({ health }: { health: ProjectHealth }) {
  const cfg = healthConfig[health];
  if (!cfg) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
      style={{ borderColor: "var(--border-hairline)", color: "var(--text-primary)" }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: cfg.color }}
        aria-hidden="true"
      />
      {cfg.label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="rounded-md border p-3"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {project.name}
        </p>
        <HealthBadge health={project.health} />
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
        {project.summary}
      </p>

      <div className="mt-2.5 flex items-center gap-2">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full"
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

      <div
        className="mt-2.5 flex flex-col gap-0.5 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <span>{project.owner}</span>
        <span>Target {project.targetDate}</span>
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
      <div className="flex gap-3 overflow-x-auto pb-1">
        {columns.map((column) => {
          const items = projects.filter((p) => p.stage === column.stage);
          return (
            <div
              key={column.stage}
              className="w-56 shrink-0 rounded-lg border p-3"
              style={{ borderColor: "var(--border-hairline)", background: "var(--surface-page)" }}
            >
              <div className="mb-3 flex items-center gap-2 px-1">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {column.label}
                </h3>
                <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
                  {items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {items.length === 0 ? (
                  <p className="px-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    Nothing here.
                  </p>
                ) : (
                  items.map((project) => <ProjectCard key={project.id} project={project} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
