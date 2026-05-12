import { PageShell, PageHeader } from "@/components/page-shell";
import { agentsData } from "@/lib/data";

export const metadata = {
  title: "Agent registry",
  description: `${agentsData.n_total} actor / theme / lens agents in the current GIPRE build.`,
};

const CLASS_LABELS: Record<string, string> = {
  actor: "Actors",
  theme: "Themes",
  lens: "Lenses",
  governance: "Governance",
};

const BACKBONE_LABELS: Record<string, string> = {
  "claude-opus-4-7": "Opus 4.7",
  "claude-sonnet-4-6": "Sonnet 4.6",
  "claude-haiku-4-5": "Haiku 4.5",
  "deepseek-v4-pro": "DeepSeek V4-Pro",
  "gpt-5": "GPT-5",
  "gpt-4o": "GPT-4o",
};

function backboneAccent(backbone: string): string {
  if (backbone.startsWith("claude-opus")) return "bg-violet/10 text-violet border-violet/30";
  if (backbone.startsWith("claude-sonnet")) return "bg-sky/10 text-sky border-sky/30";
  if (backbone.startsWith("claude-haiku")) return "bg-signal/10 text-signal border-signal/30";
  if (backbone.startsWith("deepseek")) return "bg-warn/10 text-warn border-warn/30";
  if (backbone.startsWith("gpt")) return "bg-foreground/10 text-foreground border-foreground/30";
  return "bg-muted text-muted-foreground border-border";
}

export default function AgentsPage() {
  const byClass: Record<string, typeof agentsData.agents> = {};
  for (const a of agentsData.agents) {
    const cls = String(a.class ?? "unknown");
    if (!byClass[cls]) byClass[cls] = [];
    byClass[cls].push(a);
  }
  const classOrder = ["actor", "theme", "lens", "governance"];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Multi-vendor roster"
        title="Agent registry"
        description={`${agentsData.n_total} agents in the current build, organised by class. Each agent has a markdown spec in agents/, a registry row in config/agents.yaml, and a backbone model assignment.`}
      />
      <div className="container max-w-6xl pb-12">
        {/* Roster summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(agentsData.by_class).map(([cls, count]) => (
            <div
              key={cls}
              className="rounded-xl border border-border bg-background px-4 py-3"
            >
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {CLASS_LABELS[cls] ?? cls}
              </div>
              <div className="mt-0.5 font-display text-2xl font-semibold tabular-nums">
                {count}
              </div>
            </div>
          ))}
        </div>

        {/* Backbone mix */}
        <div className="mt-8 rounded-xl border border-border bg-background px-5 py-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
            Backbone routing mix
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(agentsData.by_backbone)
              .sort((a, b) => b[1] - a[1])
              .map(([backbone, count]) => (
                <span
                  key={backbone}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium ${backboneAccent(backbone)}`}
                >
                  <span className="tabular-nums">{count}</span>
                  <span>·</span>
                  <span>{BACKBONE_LABELS[backbone] ?? backbone}</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl pb-24 space-y-12">
        {classOrder.map((cls) => {
          const list = byClass[cls];
          if (!list || list.length === 0) return null;
          return (
            <section key={cls}>
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {CLASS_LABELS[cls] ?? cls}
                </h2>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {list.length} agents
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {list.map((a) => {
                  const id = String(a.id ?? a.name ?? "?");
                  const name = String(a.name ?? id);
                  const backbone = String(a.backbone ?? "unknown");
                  return (
                    <div
                      key={id}
                      className="rounded-lg border border-border bg-background px-3 py-2.5 hover:border-violet/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-mono text-[12px] text-muted-foreground">{id}</div>
                          <div className="text-[13px] font-medium text-foreground line-clamp-2 mt-0.5">
                            {name}
                          </div>
                        </div>
                        <span
                          className={`flex-shrink-0 inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${backboneAccent(backbone)}`}
                        >
                          {BACKBONE_LABELS[backbone] ?? backbone.replace("claude-", "")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        <div className="rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
          Source: <code className="rounded bg-background px-1.5 py-0.5 text-[12px]">config/agents.yaml</code>{" "}
          · agent specs at{" "}
          <code className="rounded bg-background px-1.5 py-0.5 text-[12px]">agents/</code>
        </div>
      </div>
    </PageShell>
  );
}
