import type { Project, ProjectStatus } from "../data/mockData";
import { projects } from "../data/mockData";

const columns: { status: ProjectStatus; label: string; color: string }[] = [
  { status: "on-track", label: "On track", color: "var(--status-good)" },
  { status: "at-risk", label: "At risk", color: "var(--status-warning)" },
  { status: "blocked", label: "Blocked", color: "var(--status-critical)" },
  { status: "done", label: "Done", color: "var(--text-muted)" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="rounded-md border p-3"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
        {project.name}
      </p>
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
        className="mt-2.5 flex items-center justify-between text-xs"
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
      <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => {
          const items = projects.filter((p) => p.status === column.status);
          return (
            <div
              key={column.status}
              className="rounded-lg border p-3"
              style={{ borderColor: "var(--border-hairline)", background: "var(--surface-page)" }}
            >
              <div className="mb-3 flex items-center gap-2 px-1">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: column.color }}
                  aria-hidden="true"
                />
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
