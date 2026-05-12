import { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="container pt-16 pb-10 max-w-4xl">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center rounded-full border border-violet/30 bg-violet/5 px-3 py-1 text-[11px] font-medium text-violet tracking-wide uppercase">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
