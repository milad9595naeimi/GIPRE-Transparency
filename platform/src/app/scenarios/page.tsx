"use client";

import { useMemo, useState } from "react";
import { Compass, AlertTriangle, Globe, ArrowUpRight, Filter } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { scenariosData, type Scenario } from "@/lib/data";

const ALL_SCENARIOS: Scenario[] = scenariosData.scenarios;

// ─────────────────────────────────────────────────────────────────────────────
// Reference dictionaries — used to humanise keys (GP archetypes, flashpoints).
// Keeps the page useful even before the narrative fields are populated.
// ─────────────────────────────────────────────────────────────────────────────

const GP_ARCHETYPE_LABELS: Record<string, string> = {
  GP01: "Liberal-internationalist (US-led)",
  GP02: "Cold War 2 — frozen",
  GP03: "Cold War 2 — escalating",
  GP04: "Multipolar accommodation",
  GP05: "China-led (Tianxia-realist)",
  GP06: "Civilisational fragmentation",
  GP07: "Decolonial multiplex",
  GP08: "Climate / planetary crisis-dominant",
  GP09: "Tech-platform geopolitics",
  GP10: "Wartime-economy normal",
  GP11: "Migration & demographic shock",
  GP12: "AI-capability disruption",
};

const FLASHPOINT_LABELS: Record<string, string> = {
  FP01: "Ukraine-Russia front",
  FP02: "Taiwan Strait",
  FP03: "South China Sea",
  FP04: "Iran-Israel direct",
  FP05: "Korean Peninsula",
  FP06: "India-Pakistan / Kashmir",
  FP07: "Sahel / Sudan",
  FP08: "Saudi-Pakistan defence axis",
  FP09: "Caucasus / Nagorno-Karabakh",
  FP10: "Venezuela-Guyana / LatAm",
  FP11: "Horn of Africa / Bab-el-Mandeb",
  FP12: "Arctic militarisation",
  FP13: "Cyber major-incident",
  FP14: "Indo-Pacific trade rupture",
};

const HORIZON_LABELS: Record<string, string> = {
  S: "Short (0-6 mo)",
  M: "Medium (6-24 mo)",
  L: "Long (24-60 mo)",
};

// ─────────────────────────────────────────────────────────────────────────────
// Filter & sort state
// ─────────────────────────────────────────────────────────────────────────────

type SortKey = "probability_desc" | "probability_asc" | "id_asc";

function filterScenarios(
  scenarios: Scenario[],
  gpFilter: string | null,
  stressFilter: number | null,
  horizonFilter: string | null,
  sortKey: SortKey,
): Scenario[] {
  let out = scenarios;
  if (gpFilter) out = out.filter((s) => s.key.gp_archetype === gpFilter);
  if (stressFilter !== null) out = out.filter((s) => s.key.stress_level === stressFilter);
  if (horizonFilter) out = out.filter((s) => s.horizon_priority.includes(horizonFilter));
  const sorted = [...out];
  if (sortKey === "probability_desc") sorted.sort((a, b) => b.probability - a.probability);
  else if (sortKey === "probability_asc") sorted.sort((a, b) => a.probability - b.probability);
  else sorted.sort((a, b) => a.id.localeCompare(b.id));
  return sorted;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ProbabilityBar({ p, ciLow, ciHigh }: { p: number; ciLow: number; ciHigh: number }) {
  // Scale 0–10% range to full width (the master library is long-tail).
  const maxScale = 0.1;
  const fillPct = Math.min(100, (p / maxScale) * 100);
  const ciLowPct = Math.min(100, (ciLow / maxScale) * 100);
  const ciHighPct = Math.min(100, (ciHigh / maxScale) * 100);
  return (
    <div className="relative h-2 w-full rounded-full bg-muted/40 overflow-hidden">
      {/* CI band */}
      <div
        className="absolute top-0 h-full bg-sky/15"
        style={{ left: `${ciLowPct}%`, width: `${Math.max(2, ciHighPct - ciLowPct)}%` }}
        aria-hidden
      />
      {/* Point estimate */}
      <div
        className="absolute top-0 h-full bg-sky"
        style={{ left: 0, width: `${fillPct}%` }}
        aria-hidden
      />
    </div>
  );
}

function ScenarioCard({ s }: { s: Scenario }) {
  const [expanded, setExpanded] = useState(false);
  const gpLabel = GP_ARCHETYPE_LABELS[s.key.gp_archetype] || s.key.gp_archetype;
  const stressColor =
    s.key.stress_level >= 3 ? "text-alarm" : s.key.stress_level === 2 ? "text-warn" : "text-signal";
  const stressLabel =
    s.key.stress_level >= 3 ? "High stress" : s.key.stress_level === 2 ? "Medium stress" : "Low stress";

  return (
    <article
      className="rounded-xl border border-border/60 bg-background/60 px-5 py-4 transition-colors hover:border-border"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground">{s.id}</span>
          <span className={`text-[11px] font-medium uppercase tracking-wide ${stressColor}`}>{stressLabel}</span>
        </div>
        <div className="text-right tabular-nums">
          <div className="text-sm font-semibold text-foreground">{(s.probability * 100).toFixed(1)}%</div>
          <div className="text-[10px] text-muted-foreground">
            CI {(s.ci_low * 100).toFixed(1)}-{(s.ci_high * 100).toFixed(1)}
          </div>
        </div>
      </div>
      <h3 className="mt-2 font-display text-base font-semibold text-foreground leading-snug">{s.title}</h3>
      <div className="mt-3">
        <ProbabilityBar p={s.probability} ciLow={s.ci_low} ciHigh={s.ci_high} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-md border border-violet/30 bg-violet/5 px-2 py-0.5 text-[11px] text-violet">
          {gpLabel}
        </span>
        {s.key.flashpoints.map((fp) => (
          <span
            key={fp}
            className="inline-flex items-center rounded-md border border-sky/30 bg-sky/5 px-2 py-0.5 text-[11px] text-sky"
            title={FLASHPOINT_LABELS[fp] || fp}
          >
            {fp} {FLASHPOINT_LABELS[fp] ? `· ${FLASHPOINT_LABELS[fp]}` : ""}
          </span>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {s.horizon_priority.map((h) => (
          <span
            key={h}
            className="inline-flex items-center rounded-md border border-border bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            title={HORIZON_LABELS[h]}
          >
            {h}
          </span>
        ))}
      </div>
      {expanded && (
        <div className="mt-4 border-t border-border/60 pt-3 text-[12px] space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Triggers</div>
              <div className="text-muted-foreground">
                {s.triggers.length > 0 ? s.triggers.join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Historical analogues</div>
              <div className="text-muted-foreground">
                {s.historical_analogues.length > 0 ? s.historical_analogues.join(", ") : "—"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Country impacts</div>
              <div className="text-muted-foreground">
                {Object.keys(s.country_impacts).length || "—"} dimensions
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Theme impacts</div>
              <div className="text-muted-foreground">
                {Object.keys(s.theme_impacts).length || "—"} dimensions
              </div>
            </div>
          </div>
          {!s.short_narrative && (
            <div className="mt-2 rounded-md border border-warn/30 bg-warn/5 px-3 py-2 text-[11px] text-warn">
              <AlertTriangle className="inline h-3 w-3 mr-1" aria-hidden />
              Narrative not yet populated — coming with the next render cycle. The structural key
              (archetype + flashpoints + stress level + horizon) is locked.
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function ScenariosPage() {
  const [gpFilter, setGpFilter] = useState<string | null>(null);
  const [stressFilter, setStressFilter] = useState<number | null>(null);
  const [horizonFilter, setHorizonFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("probability_desc");

  const filtered = useMemo(
    () => filterScenarios(ALL_SCENARIOS, gpFilter, stressFilter, horizonFilter, sortKey),
    [gpFilter, stressFilter, horizonFilter, sortKey],
  );

  // Unique GP archetypes present in the corpus
  const gpArchetypes = useMemo(() => {
    const set = new Set<string>();
    ALL_SCENARIOS.forEach((s) => set.add(s.key.gp_archetype));
    return Array.from(set).sort();
  }, []);

  // Probability mass currently shown
  const massPct = useMemo(() => {
    return filtered.reduce((acc, s) => acc + s.probability, 0) * 100;
  }, [filtered]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Marquee deliverable"
        title="Master scenario library"
        description={`${ALL_SCENARIOS.length} scenarios spanning geopolitical archetypes × flashpoints × stress levels × horizons. Each scenario carries a calibrated probability with 95% CI band, a structural key for cross-scenario comparison, and a placeholder for the full narrative + country/theme impact dimensions.`}
      />

      {/* Distribution overview */}
      <section className="container max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="rounded-lg border border-border bg-background/60 px-3 py-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Scenarios in library</div>
            <div className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
              {ALL_SCENARIOS.length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/60 px-3 py-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">GP archetypes</div>
            <div className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
              {gpArchetypes.length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/60 px-3 py-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Stress levels</div>
            <div className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">3</div>
          </div>
          <div className="rounded-lg border border-border bg-background/60 px-3 py-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability mass shown</div>
            <div className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
              {massPct.toFixed(1)}%
            </div>
          </div>
        </div>
      </section>

      {/* Filter row */}
      <section className="container max-w-5xl">
        <div className="rounded-xl border border-border bg-background/60 px-4 py-3 mb-6">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
            <Filter className="h-3 w-3" /> Filter & sort
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
            {/* GP archetype filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-muted-foreground mr-1">Archetype:</span>
              <button
                onClick={() => setGpFilter(null)}
                className={`rounded px-2 py-0.5 ${gpFilter === null ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
              >
                all
              </button>
              {gpArchetypes.map((gp) => (
                <button
                  key={gp}
                  onClick={() => setGpFilter(gp)}
                  className={`rounded px-2 py-0.5 ${gpFilter === gp ? "bg-violet text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
                  title={GP_ARCHETYPE_LABELS[gp]}
                >
                  {gp}
                </button>
              ))}
            </div>
            {/* Stress level filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground mr-1">Stress:</span>
              <button
                onClick={() => setStressFilter(null)}
                className={`rounded px-2 py-0.5 ${stressFilter === null ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
              >
                all
              </button>
              {[1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setStressFilter(lvl)}
                  className={`rounded px-2 py-0.5 ${stressFilter === lvl ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {/* Horizon filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground mr-1">Horizon:</span>
              <button
                onClick={() => setHorizonFilter(null)}
                className={`rounded px-2 py-0.5 ${horizonFilter === null ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
              >
                all
              </button>
              {["S", "M", "L"].map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizonFilter(h)}
                  className={`rounded px-2 py-0.5 ${horizonFilter === h ? "bg-sky text-background" : "bg-muted/30 text-muted-foreground hover:bg-muted"}`}
                  title={HORIZON_LABELS[h]}
                >
                  {h}
                </button>
              ))}
            </div>
            {/* Sort */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-muted-foreground mr-1">Sort:</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="rounded border border-border bg-background px-2 py-0.5 text-foreground text-[12px]"
              >
                <option value="probability_desc">Probability ↓</option>
                <option value="probability_asc">Probability ↑</option>
                <option value="id_asc">ID</option>
              </select>
            </div>
          </div>
        </div>
        <div className="text-[12px] text-muted-foreground mb-4 tabular-nums">
          Showing {filtered.length} of {ALL_SCENARIOS.length} · click any card to expand
        </div>
      </section>

      {/* Grid */}
      <section className="container max-w-5xl pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 cursor-pointer">
          {filtered.map((s) => (
            <ScenarioCard key={s.id} s={s} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No scenarios match the current filters.
          </div>
        )}
      </section>

      {/* Methodology footnote */}
      <section className="container max-w-3xl pb-20">
        <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 text-[13px] leading-relaxed">
          <div className="flex items-center gap-2 font-medium text-foreground mb-2">
            <Globe className="h-4 w-4 text-sky" /> About the scenario library
          </div>
          <p className="text-muted-foreground">
            Each master scenario is a (geopolitical archetype × flashpoint set × stress level) combination
            with a Bayesian-net-derived probability and 95% CI band. Per Doc 1 §2.4 the library is
            calibrated to expose K∈[80, 120] mass-bearing scenarios; the 100 here are the active
            production set. Narrative fields (short/medium/long) and country / theme / actor impact
            dimensions populate as the engine renders per-cycle deliverables — country briefs,
            theme briefs, sector briefs, watch lists — for any subset of the scenario library.
          </p>
          <p className="text-muted-foreground mt-2">
            Probabilities are NOT the GIPRE point forecast for the underlying events — they are the
            prior probability that each <em>combination</em> obtains as a coherent scenario. Each
            scenario then produces conditional projections at the country / theme / sector level.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
