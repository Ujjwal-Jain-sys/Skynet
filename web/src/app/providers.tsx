// providers.tsx
// Client provider wrapper: ThemeProvider + SkipLink + Header + Footer.
// Better Auth is handled via its client instance (lib/auth-client.ts).
import { ThemeProvider } from "next-themes";
import { SkipLink } from "@/components/SkipLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="skynet-theme"
      disableTransitionOnChange
    >
      <SkipLink />
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}