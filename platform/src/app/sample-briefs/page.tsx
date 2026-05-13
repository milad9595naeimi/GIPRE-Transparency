import { FileText, Download, ExternalLink, Globe, Clock, Layers } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";

// The 8 v4-cycle briefs currently shipped from the engine.
// Each PDF is also served at /sample-briefs/<filename> for inline preview / download.

interface BriefRef {
  id: string;
  filename: string;
  title: string;
  scope: string;
  region: string;
  size_mb: number;
  pages_approx: number;
  cycle: string;
  description: string;
  primary_personas: string[];
  themes_covered: string[];
}

const BRIEFS: BriefRef[] = [
  {
    id: "B01",
    filename: "01_GIPRE_Master_Scenarios.pdf",
    title: "Master Scenarios — v4",
    scope: "master",
    region: "Global",
    size_mb: 11.9,
    pages_approx: 60,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "The top-level scenario library brief. 100 master scenarios with probability bands, GP archetypes, flashpoint clusters, and cross-scenario correlations. The view-from-the-top.",
    primary_personas: ["Chief Strategy Officer", "Board / Risk Committee", "Sovereign desk"],
    themes_covered: ["Geopolitical archetypes", "Flashpoint clusters", "Cross-scenario coupling"],
  },
  {
    id: "B02",
    filename: "02_GIPRE_Region_NorthAmerica.pdf",
    title: "Region Brief — North America",
    scope: "region",
    region: "North America (USA / CAN / MEX)",
    size_mb: 10.1,
    pages_approx: 55,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "Region-level brief for North America. US grand strategy under Cold War 2, USMCA stresses, Canadian middle-power posture, Mexico's sovereignty challenges.",
    primary_personas: ["Multinational CFO (North-America-exposed)", "Sovereign credit analyst", "Trade-policy team"],
    themes_covered: ["US grand strategy", "Tariff regimes", "Border security", "Cross-border supply chains"],
  },
  {
    id: "B03",
    filename: "03_GIPRE_Region_Europe.pdf",
    title: "Region Brief — Europe",
    scope: "region",
    region: "Europe (EU + UK + non-EU)",
    size_mb: 7.3,
    pages_approx: 45,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "European geopolitical and geo-economic outlook. Ukraine front, EU strategic autonomy, German industrial reorientation, Mediterranean energy.",
    primary_personas: ["European treasury", "Pan-European corporate", "Defence sector"],
    themes_covered: ["Ukraine-Russia", "EU autonomy", "Energy security", "Far-right cycle"],
  },
  {
    id: "B04",
    filename: "04_GIPRE_Region_GreaterMiddleEast.pdf",
    title: "Region Brief — Greater Middle East",
    scope: "region",
    region: "Middle East + Türkiye + Central Asia",
    size_mb: 6.9,
    pages_approx: 50,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "Greater Middle East. Iran-Israel direct confrontation, Saudi-Pakistan defence axis, Türkiye neo-Ottoman positioning, Gulf hedging.",
    primary_personas: ["Energy major", "Gulf sovereign", "Defence analyst"],
    themes_covered: ["Iran-Israel", "Saudi-Pakistan pact", "Strait of Hormuz", "Türkiye corridor"],
  },
  {
    id: "B05",
    filename: "05_GIPRE_Region_AsiaPacific.pdf",
    title: "Region Brief — Asia-Pacific",
    scope: "region",
    region: "Asia-Pacific (CHN / JPN / KOR / ASEAN / AUS)",
    size_mb: 11.4,
    pages_approx: 60,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "Asia-Pacific. Taiwan Strait, South China Sea, US-China decoupling stages, Japanese remilitarisation, ASEAN hedging, Australian AUKUS positioning.",
    primary_personas: ["Trade-exposed multinational", "Asia-Pacific sovereign", "Tech supply-chain head"],
    themes_covered: ["Taiwan", "South China Sea", "US-China decoupling", "Semiconductors", "ASEAN positioning"],
  },
  {
    id: "B06",
    filename: "06_GIPRE_Region_SouthAsia.pdf",
    title: "Region Brief — South Asia",
    scope: "region",
    region: "South Asia (IND / PAK / BGD / LKA)",
    size_mb: 7.1,
    pages_approx: 45,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "South Asia. India multi-alignment, Pakistan defence-axis pivot, water stress, demographic dividends, Bangladesh political cycle.",
    primary_personas: ["India-exposed multinational", "Development financier", "Diaspora-finance desk"],
    themes_covered: ["India multi-alignment", "Indus water", "Kashmir", "Bangladesh transition"],
  },
  {
    id: "B07",
    filename: "07_GIPRE_Region_Africa.pdf",
    title: "Region Brief — Africa",
    scope: "region",
    region: "Africa (Sahel + Horn + Southern Africa)",
    size_mb: 7.0,
    pages_approx: 50,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "Africa. Sahel coup belt, Horn of Africa and Bab-el-Mandeb, Nigeria-South Africa middle-power dynamics, critical-minerals supply chains.",
    primary_personas: ["Critical-minerals trader", "Pan-African development bank", "Migration analyst"],
    themes_covered: ["Sahel", "Horn / Bab-el-Mandeb", "Critical minerals", "Demographic dividend"],
  },
  {
    id: "B08",
    filename: "08_GIPRE_Region_LatinAmerica.pdf",
    title: "Region Brief — Latin America",
    scope: "region",
    region: "Latin America (MEX excluded; BRA / ARG / COL / VEN / CHL)",
    size_mb: 7.0,
    pages_approx: 45,
    cycle: "v4 — narrative-integrated deep-analysis (2026-05-12)",
    description: "Latin America. Argentina dollarisation aftermath, Brazil multi-alignment, Venezuela-Guyana, Mexico cartel violence (cross-ref to NA), Andean political cycle.",
    primary_personas: ["LatAm sovereign credit", "Commodity trader", "Multinational regional head"],
    themes_covered: ["Brazil multi-alignment", "Argentina dollarisation", "Venezuela-Guyana", "Cartel governance"],
  },
];

export const metadata = {
  title: "Sample briefs — client deliverable format",
  description: "8 v4-cycle GIPRE briefs (1 master + 7 region) at the production deliverable format. Each ~45-60 pages of narrative-integrated deep analysis with quantified impact, causal chains, historical analogues, counter-narratives, watch signals, tail-risk panels, and persona-specific decision implications.",
};

export default function SampleBriefsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="What clients receive"
        title="Sample briefs (v4 cycle)"
        description="Eight production-format briefs from the most recent v4 deep-analysis cycle. One master scenarios brief plus seven region briefs. Each is the format an eventual subscribing client receives — narrative-integrated deep analysis, ~45-60 pages, with quantified impact, causal chains, historical analogues, counter-narratives, tail-risk panels, and persona-specific decision implications."
      />

      {/* Format summary */}
      <section className="container max-w-4xl">
        <div className="rounded-xl border border-violet/30 bg-violet/5 px-5 py-4 mb-8">
          <div className="text-[11px] uppercase tracking-wider text-violet font-medium mb-2">
            About the v4 deliverable format
          </div>
          <p className="text-[14px] text-foreground/85 leading-relaxed">
            v4 is the fourth iteration of the brief format and the first that integrates the
            geographic atlas inline with the arguments that cite each map (MGI / FT / Economist
            chart-in-narrative proximity rule). Every top-risk section gets a dedicated 2-3 page
            deep-treatment: lead narrative, 4-6 step causal chain, 3 second-order effects,
            historical analogue with similarities + differences + lesson, 150-200 word
            counter-narrative steelman, quantified impact bar, watch signals, business trigger,
            and a lens reading.
          </p>
          <p className="text-[14px] text-foreground/85 leading-relaxed mt-2">
            Tail-risk panels (Snow Leopards) get their own block at the end with 5-7 entries:
            title + category + probability band + magnitude + 200-300 word description +
            early-warning indicators + 30/90/180-day cascade + historical parallel + quantified
            impact.
          </p>
        </div>
      </section>

      {/* Briefs grid */}
      <section className="container max-w-5xl pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRIEFS.map((b) => (
            <article
              key={b.id}
              className="group rounded-xl border border-border bg-background/60 overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="px-5 pt-4 pb-3 border-b border-border/60 bg-muted/15">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground">{b.id}</span>
                      <span className="text-[10px] uppercase tracking-wider text-violet font-medium">{b.scope}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground leading-tight">{b.title}</h3>
                    <div className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <Globe className="h-3 w-3" /> {b.region}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right text-[11px] text-muted-foreground tabular-nums">
                    <div className="flex items-center justify-end gap-1">
                      <FileText className="h-3 w-3" />
                      {b.pages_approx}p
                    </div>
                    <div className="mt-0.5">{b.size_mb.toFixed(1)} MB</div>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3">
                <p className="text-[13px] text-foreground/85 leading-relaxed">{b.description}</p>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">Primary personas</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {b.primary_personas.map((p) => (
                    <span key={p} className="inline-block rounded border border-border bg-muted/30 px-1.5 py-0.5 text-[11px] text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">Themes covered</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {b.themes_covered.map((t) => (
                    <span key={t} className="inline-block rounded border border-sky/30 bg-sky/5 px-1.5 py-0.5 text-[11px] text-sky">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-4 pt-1 border-t border-border/60 flex items-center gap-3 text-[12px]">
                <a
                  href={`/sample-briefs/${b.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open inline
                </a>
                <a
                  href={`/sample-briefs/${b.filename}`}
                  download={b.filename}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3 w-3" /> {b.cycle.split("—")[0].trim()}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* What's coming */}
      <section className="container max-w-3xl pb-20">
        <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 text-[13px] leading-relaxed">
          <div className="flex items-center gap-2 font-medium text-foreground mb-2">
            <Layers className="h-4 w-4 text-violet" /> What the full deliverable set will look like
          </div>
          <p className="text-muted-foreground">
            v4 is the current production cycle (8 briefs). The full GIPRE deliverable set per Doc 2
            §3 is significantly broader and lands as the engine matures:
          </p>
          <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
            <li>
              <span className="text-foreground/90">Country briefs at scale</span> — one per country (190 countries
              total), generated daily. Currently 30 active actor agents; targeting 500 in Phase B.
            </li>
            <li>
              <span className="text-foreground/90">Theme briefs</span> — one per theme (80 themes total).
              Currently 40 active. US-China decoupling, AI capability, energy transition, etc.
            </li>
            <li>
              <span className="text-foreground/90">Sector briefs</span> — 11 sectors (finance, energy, defence,
              semiconductors, agriculture, etc.).
            </li>
            <li>
              <span className="text-foreground/90">Crisis briefs</span> — event-triggered, ~24-48 hours from event
              detection to delivery.
            </li>
            <li>
              <span className="text-foreground/90">Watch list / Daily Pulse / Outlook</span> — recurring digests at
              daily / weekly / quarterly cadence.
            </li>
            <li>
              <span className="text-foreground/90">Falsification & methodology briefs</span> — quarterly,
              published transparently regardless of outcome (Brier scores, what we got wrong, what
              we updated).
            </li>
          </ul>
          <p className="text-muted-foreground mt-3">
            All deliverables are <span className="text-foreground/90">customisable per client cohort</span> via the
            L33-L40 customisation tiers (Phase F). Type-1 is profile customisation (200-field
            intake); Type-2 is scenario-set Bayesian-net overlay; Type-3 is interrogative Q&amp;A.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
