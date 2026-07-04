import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      className="rounded-md border px-3 py-1.5 text-sm font-medium"
      style={{
        borderColor: "var(--border-hairline)",
        color: "var(--text-secondary)",
      }}
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}
