import { PageShell, PageHeader } from "@/components/page-shell";
import { layersData, buildStateData } from "@/lib/data";

export const metadata = {
  title: "Architecture",
  description:
    "65 layers organised in 8 clusters — A: Data Ingest · B: Conformal+Bayesian · C: Game theory · D: Auditor · E: Global Scenario Engine · F: Customisation · G: Polycrisis+LLM · H: Adjacent fields.",
};

const CLUSTER_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H"];

const CLUSTER_ACCENT: Record<string, string> = {
  A: "border-sky/40 bg-sky/5",
  B: "border-violet/40 bg-violet/5",
  C: "border-signal/40 bg-signal/5",
  D: "border-warn/40 bg-warn/5",
  E: "border-sky/40 bg-sky/5",
  F: "border-violet/40 bg-violet/5",
  G: "border-signal/40 bg-signal/5",
  H: "border-warn/40 bg-warn/5",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="65 layers · 8 clusters"
        title="Architecture"
        description="The v9.0 layer landscape. Each tile is a cluster; tiles below show every layer in that cluster with its activation status."
      />
      <div className="container max-w-6xl pb-24 space-y-12">
        {/* Cluster overview tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {CLUSTER_ORDER.map((cid) => {
            const cluster = layersData.by_cluster[cid];
            if (!cluster) return null;
            const activePct = cluster.n_layers_total
              ? Math.round((cluster.n_active / cluster.n_layers_total) * 100)
              : 0;
            return (
              <div
                key={cid}
                className={`rounded-xl border px-5 py-4 transition-shadow hover:shadow-sm ${
                  CLUSTER_ACCENT[cid] || "border-border bg-background"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    Cluster {cid}
                  </span>
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    {cluster.layer_range}
                  </span>
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">{cluster.title}</div>
                <div className="mt-3 flex items-center gap-2 text-[12px] text-muted-foreground">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground/70"
                      style={{ width: `${activePct}%` }}
                    />
                  </div>
                  <span className="tabular-nums">
                    {cluster.n_active}/{cluster.n_layers_total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-cluster detail */}
        {CLUSTER_ORDER.map((cid) => {
          const cluster = layersData.by_cluster[cid];
          if (!cluster) return null;
          return (
            <section key={cid}>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {cluster.layer_range}
                  </div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight mt-1">
                    Cluster {cid} — {cluster.title}
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {cluster.n_active} of {cluster.n_layers_total} active
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {cluster.layers.map((layer) => {
                  const lid = String(layer.id ?? "?");
                  const lname = String(layer.name ?? "(unnamed)");
                  const lstatus = String(layer.status ?? "stub");
                  const isActive = lstatus === "active";
                  return (
                    <div
                      key={lid}
                      className={`rounded-lg border px-3 py-2.5 ${
                        isActive ? "border-signal/30 bg-signal/[0.03]" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-mono text-[12px] text-muted-foreground">{lid}</div>
                          <div className="text-[13px] font-medium text-foreground line-clamp-2 mt-0.5">
                            {lname}
                          </div>
                        </div>
                        <span
                          className={`flex-shrink-0 inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${
                            isActive
                              ? "border-signal/40 bg-signal/10 text-signal"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {isActive ? "active" : "stub"}
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
          Source: <code className="rounded bg-background px-1.5 py-0.5 text-[12px]">config/layers.yaml</code>{" "}
          · {buildStateData.layers_active} of {buildStateData.layers_total} layers active in the current
          build.
        </div>
      </div>
    </PageShell>
  );
}
