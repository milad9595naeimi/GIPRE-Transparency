import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, BookOpen, Users, FileText, Activity, GitBranch } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { buildStateData, planData, governanceData } from "@/lib/data";

export default function Home() {
  const phaseV = planData.phases.find((p) => p.id === "V");
  const phaseN = planData.phases.find((p) => p.id === "N");
  const phaseB = planData.phases.find((p) => p.id === "B");

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(circle_at_75%_120%,rgba(167,139,250,0.10),transparent_55%)]" />
        <div className="container relative pt-20 pb-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/5 px-3 py-1 text-[11px] font-medium text-violet tracking-wide uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet animate-pulse" />
            v9.0 · {buildStateData.steps_in_progress} steps live now
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            The open methodology and governance audit of the{" "}
            <span className="text-gradient">GIPRE engine</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            <span className="text-foreground/90 font-medium">GIPRE</span> — Geopolitical Intelligence and
            Probabilistic Reasoning Engine — is a 65-layer production architecture for geopolitical and
            geo-economic forecasting. This portal previews the{" "}
            <span className="text-foreground/90">client deliverables</span>: master scenario library,
            country / region / theme / crisis briefs, the methodology behind them, and the
            governance audits that gate every output before publication.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View 100 master scenarios
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sample-briefs"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <FileText className="h-4 w-4" />
              Read a sample brief
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* AT-A-GLANCE STATS */}
      <section className="container max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Phases"
            value={buildStateData.steps_done}
            total={buildStateData.steps_total}
            caption={`${buildStateData.completion_pct}% complete`}
            accent="violet"
          />
          <StatCard
            label="Layers active"
            value={buildStateData.layers_active}
            total={buildStateData.layers_total}
            caption="of 65 v9.0 layers"
            accent="sky"
          />
          <StatCard
            label="Agents in build"
            value={buildStateData.agents_total}
            total={buildStateData.agents_target}
            caption="actors + themes + lenses"
            accent="signal"
          />
          <StatCard
            label="PDF cycles"
            value={buildStateData.pdf_cycles}
            caption="v4 region briefs"
            accent="default"
          />
        </div>
      </section>

      {/* COMPLEMENTARY-TO-V5 BANNER */}
      <section className="container max-w-5xl mt-12">
        <div className="rounded-xl border border-border bg-muted/30 px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <GitBranch className="h-5 w-5 text-violet mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-foreground">
                  This is the v2 transparency portal. There are three GIPRE artefacts.
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground/80">v5 production</span> serves customers at{" "}
                  <a className="text-sky hover:underline" href="https://www.geopoliticalgps.com">
                    geopoliticalgps.com
                  </a>{" "}
                  ·{" "}
                  <span className="text-foreground/80">v6 Strature</span> is the 65-layer
                  pivot in active development ·{" "}
                  <span className="text-foreground/80">v2 (here)</span> is the open methodology +
                  governance view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT FRONT-LINE */}
      <section className="container max-w-5xl mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Current front-line
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight mt-1">
              What is live right now
            </h2>
          </div>
          <Link
            href="/progress"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            Full plan <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[phaseN, phaseV, phaseB]
            .filter((p): p is NonNullable<typeof p> => !!p)
            .map((phase) => (
              <div
                key={phase.id}
                className="rounded-xl border border-border bg-background px-5 py-5 hover:border-violet/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Phase {phase.id}
                  </div>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {phase.n_done}/{phase.n_steps}
                  </span>
                </div>
                <div className="mt-2 text-base font-medium text-foreground">{phase.title}</div>
                <ul className="mt-3 space-y-1.5">
                  {phase.steps
                    .filter((s) => s.status === "in_progress" || s.status === "done")
                    .slice(-3)
                    .map((s) => (
                      <li
                        key={s.id}
                        className="flex items-start justify-between gap-2 text-[13px] text-muted-foreground"
                      >
                        <span>
                          <span className="font-mono text-foreground/80">{s.id}</span> —{" "}
                          <span className="line-clamp-1">{s.title.split(":")[0].slice(0, 60)}</span>
                        </span>
                        <StatusBadge status={s.status} className="flex-shrink-0" />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      {/* GOVERNANCE PEEK */}
      <section className="container max-w-5xl mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Governance overlay
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight mt-1">
              Independent audits of every artefact
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              We don&apos;t mark our own homework. Every artefact passes through a multi-vendor jury
              (Anthropic + OpenAI + DeepSeek) before publication, plus a Bias Auditor running L50
              (postcolonial) and L65 (BorderLines / Tao 2024 / Identity-Aware) frameworks.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/governance"
            className="group rounded-xl border border-border bg-background px-5 py-5 hover:border-violet/40 transition-colors block"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet" />
                <div className="text-sm font-medium text-foreground">
                  N01 — Critic / Multi-Model Jury (L54)
                </div>
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {governanceData.n01.n_artifacts} artefacts
              </span>
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
              7-judge × 3-vendor jury with KS-stability debate. Multi-round audit; 1,999 findings
              across the v4 corpus.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-violet group-hover:gap-2 transition-all">
              View synthesis <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
          <Link
            href="/governance"
            className="group rounded-xl border border-border bg-background px-5 py-5 hover:border-violet/40 transition-colors block"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky" />
                <div className="text-sm font-medium text-foreground">
                  N02 — Bias Auditor (L50 + L65)
                </div>
              </div>
              <StatusBadge
                status={governanceData.n02.available ? "done" : "in_progress"}
                className="flex-shrink-0"
              />
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
              13-dim composite scorecard. Eurocentric framing + 6 Identity-Aware criteria + structural
              metrics + 30 cross-language probes × 5 personas (en / zh / ar / fa / es).
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-sky group-hover:gap-2 transition-all">
              View synthesis <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="container max-w-5xl mt-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Explore</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/methodology", icon: BookOpen, title: "Methodology", desc: "The 65-layer architectural spine.", accent: "sky" as const },
            { href: "/architecture", icon: Layers, title: "Architecture", desc: "8 clusters · v8/v9 evolution.", accent: "violet" as const },
            { href: "/agents", icon: Users, title: "Agents", desc: `${buildStateData.agents_total} actor / theme / lens specs.`, accent: "signal" as const },
            { href: "/progress", icon: Activity, title: "Progress", desc: "Live build state · CHANGELOG.", accent: "warn" as const },
          ].map(({ href, icon: Icon, title, desc, accent }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-border bg-background px-5 py-5 hover:border-violet/40 transition-colors"
            >
              <Icon className={`h-5 w-5 ${
                accent === "sky" ? "text-sky" : accent === "violet" ? "text-violet" : accent === "signal" ? "text-signal" : "text-warn"
              }`} />
              <div className="mt-3 text-sm font-medium text-foreground">{title}</div>
              <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
