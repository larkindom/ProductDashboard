export type View = "dashboard" | "how-it-works";

interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="6.5" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="1.5" width="6.5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="8.5" width="6.5" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1.5" y="11.5" width="6.5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "how-it-works",
    label: "How it works",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7 7c0-1.1.9-2 2-2s2 .8 2 1.8c0 1.2-1.1 1.4-1.7 2.1-.3.35-.3.7-.3 1.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="13" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

export function Sidebar({
  active,
  onNavigate,
}: {
  active: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <aside
      className="flex w-56 shrink-0 flex-col border-r px-3 py-5"
      style={{ borderColor: "var(--border-hairline)", background: "var(--surface-1)" }}
    >
      <div className="mb-6 px-2">
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Product Dashboard
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Stakeholder status
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm font-medium"
              style={{
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                background: isActive ? "var(--gridline)" : "transparent",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
