import Link from "next/link";
import { Activity, BookOpen, Layers, ShieldCheck, Users, LineChart, FileText } from "lucide-react";

const NAV = [
  { href: "/", label: "Home", icon: Activity },
  { href: "/methodology", label: "Methodology", icon: BookOpen },
  { href: "/architecture", label: "Architecture", icon: Layers },
  { href: "/governance", label: "Governance", icon: ShieldCheck },
  { href: "/agents", label: "Agents", icon: Users },
  { href: "/progress", label: "Progress", icon: LineChart },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-sky to-violet" aria-hidden />
          <span className="text-foreground">GIPRE</span>
          <span className="text-muted-foreground text-sm font-normal">Transparency</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm">
          {NAV.slice(1).map((item) => {
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
        </nav>
      </div>
    </header>
  );
}
