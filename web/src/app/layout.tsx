import type { Metadata } from "next";
import { Providers } from "@/app/providers";

// Inline script that applies the saved theme (or OS preference) to <html>
// before React hydrates, preventing a visible flash of incorrect theme
// (next-themes "no flash of incorrect theme" pattern).
const THEME_INIT_SCRIPT = `
(() => {
  const doc = document.documentElement;
  let cls = (doc.className || "").replace(/\blight\b|\bdark\b/g, "").trim();
  let theme = null;
  try { theme = localStorage.getItem("skynet-theme"); } catch { theme = null; }
  if (theme === "light") {
    doc.className = (cls + " light").trim();
  } else if (theme === "dark") {
    doc.className = (cls + " dark").trim();
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    doc.className = (cls + " dark").trim();
  }
})();
`;

export const metadata: Metadata = {
  title: {
    template: "%s — Skynet",
    default: "Build websites without writing code",
  },
  description:
    "Build websites without writing a single line of code. Pick a theme, add your content, and publish. For vibe-coders, newbie-tech students, and non-technical people.",
  openGraph: {
    title: "Skynet — Build websites without writing code",
    description:
      "Build websites without writing a single line of code. Pick a theme, add your content, and publish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          id="skynet-theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
