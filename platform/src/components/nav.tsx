import Link from "next/link";
import { Activity, BookOpen, Layers, ShieldCheck, Users, LineChart, FileText, Compass } from "lucide-react";

// Primary nav — what eventual clients see first. Scenarios + Sample briefs are
// the marquee deliverables; the internal/methodological pages live one click
// deeper under "Inside the model".
const NAV_PRIMARY = [
  { href: "/scenarios", label: "Master scenarios", icon: Compass },
  { href: "/sample-briefs", label: "Sample briefs", icon: FileText },
  { href: "/methodology", label: "Methodology", icon: BookOpen },
];

const NAV_INTERNAL = [
  { href: "/architecture", label: "Architecture", icon: Layers },
  { href: "/agents", label: "Agents", icon: Users },
  { href: "/governance", label: "Governance", icon: ShieldCheck },
  { href: "/progress", label: "Build progress", icon: LineChart },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-sky to-violet" aria-hidden />
          <span className="text-foreground">GIPRE</span>
          <span className="text-muted-foreground text-sm font-normal hidden sm:inline">Transparency preview</span>
        </Link>
        <nav className="ml-auto flex items-center gap-0.5 text-sm">
          {NAV_PRIMARY.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="mx-1.5 h-4 w-px bg-border" aria-hidden />
          <details className="relative group">
            <summary className="rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer list-none">
              <Activity className="h-3.5 w-3.5" aria-hidden />
              <span>Inside the model</span>
            </summary>
            <div className="absolute right-0 mt-1 min-w-[200px] rounded-lg border border-border bg-background shadow-lg p-1 z-50">
              {NAV_INTERNAL.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
