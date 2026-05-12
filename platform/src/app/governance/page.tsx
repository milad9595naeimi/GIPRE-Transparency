import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ShieldCheck, AlertCircle, Activity } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { governanceData } from "@/lib/data";

export const metadata = {
  title: "Governance audits",
  description:
    "Independent multi-vendor audits of every GIPRE artefact. N01 Critic (L54) + N02 Bias Auditor (L50+L65).",
};

function GovernancePanel({
  step,
  available,
  synthesisMd,
  fullLength,
  nArtifacts,
  summaries,
  description,
  badge,
}: {
  step: string;
  available: boolean;
  synthesisMd: string;
  fullLength: number;
  nArtifacts: number;
  summaries: Array<{ id: string; target_class: string; gate: string; score_mean: number; score_stddev: number; n_findings: number; n_critical: number }>;
  description: string;
  badge: { color: string; label: string };
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className={`h-4 w-4 ${badge.color}`} />
            <h2 className="font-display text-xl font-semibold tracking-tight">{step}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">{description}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 font-medium tabular-nums ${
              available
                ? "border-signal/40 bg-signal/10 text-signal"
                : "border-warn/40 bg-warn/10 text-warn"
            }`}
          >
            {available ? "Ready" : "Run in progress"}
          </span>
          {available && (
            <span className="text-muted-foreground">
              {nArtifacts} artefacts audited
            </span>
          )}
        </div>
      </div>

      {!available && (
        <div className="rounded-xl border border-warn/30 bg-warn/5 px-5 py-4">
          <div className="flex items-start gap-3">
            <Activity className="h-4 w-4 text-warn mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-foreground">Audit run in progress.</div>
              <p className="mt-1 text-muted-foreground">
                The L50/L65 Bias Auditor is currently running its 7-judge × 3-vendor jury across the
                v4 corpus (61 artefacts). 30 cross-language probes (en/zh/ar/fa/es) plus per-artifact
                3-round debate. Expected to finish in 2-4 hours of wall-clock time.
              </p>
              <p className="mt-2 text-muted-foreground">
                Once complete, this panel auto-populates with the synthesis, per-artifact verdicts,
                structural metrics, and probe results.
              </p>
            </div>
          </div>
        </div>
      )}

      {available && summaries.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Artefact</th>
                <th className="px-4 py-2.5 text-left font-medium">Class</th>
                <th className="px-4 py-2.5 text-right font-medium">Score</th>
                <th className="px-4 py-2.5 text-right font-medium">σ</th>
                <th className="px-4 py-2.5 text-right font-medium">Findings</th>
                <th className="px-4 py-2.5 text-right font-medium">Critical</th>
                <th className="px-4 py-2.5 text-center font-medium">Gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...summaries]
                .sort((a, b) => a.score_mean - b.score_mean)
                .slice(0, 20)
                .map((row) => (
                  <tr key={row.id} className="hover:bg-muted/20">
                    <td className="px-4 py-2 font-mono text-[12px] text-foreground">{row.id}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.target_class}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{row.score_mean.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                      {row.score_stddev.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{row.n_findings}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {row.n_critical > 0 ? (
                        <span className="inline-flex items-center gap-1 text-alarm">
                          <AlertCircle className="h-3 w-3" /> {row.n_critical}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          row.gate === "publish_ok"
                            ? "border-signal/40 bg-signal/10 text-signal"
                            : row.gate === "needs_human_review" || row.gate === "needs_substantive_revision"
                              ? "border-alarm/40 bg-alarm/10 text-alarm"
                              : "border-warn/40 bg-warn/10 text-warn"
                        }`}
                      >
                        {row.gate}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {summaries.length > 20 && (
            <div className="px-4 py-2 text-[12px] text-muted-foreground border-t border-border bg-muted/20">
              Showing 20 of {summaries.length}. Lowest-scoring artefacts surfaced first.
            </div>
          )}
        </div>
      )}

      {available && synthesisMd && (
        <details className="rounded-xl border border-border bg-background">
          <summary className="cursor-pointer px-5 py-3 text-sm font-medium hover:bg-muted/30 transition-colors">
            Full synthesis report
            <span className="ml-2 text-[12px] text-muted-foreground">
              ({(fullLength / 1024).toFixed(0)} KB)
            </span>
          </summary>
          <div className="px-5 py-4 border-t border-border">
            <article className="prose-paper">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{synthesisMd}</ReactMarkdown>
            </article>
          </div>
        </details>
      )}
    </section>
  );
}

export default function GovernancePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Independent audits · multi-vendor jury"
        title="Governance"
        description="Every GIPRE artefact passes through independent audits before publication. The jury combines Anthropic + OpenAI + DeepSeek (3 vendors) to satisfy the CALM ≥3-vendor mandate and surface biases that any single vendor's framing would miss."
      />
      <div className="container max-w-5xl pb-24 space-y-12">
        <GovernancePanel
          step={governanceData.n01.step}
          available={governanceData.n01.available}
          synthesisMd={governanceData.n01.synthesis_md}
          fullLength={governanceData.n01.synthesis_md_full_length}
          nArtifacts={governanceData.n01.n_artifacts}
          summaries={governanceData.n01.summaries}
          badge={{ color: "text-violet", label: "L54" }}
          description="7-judge × 3-vendor jury with multi-round debate, KS-stability early-stopping, bootstrap 95% CI. Audits across 5 finding categories: internal inconsistency, calibration concerns, lens-balance failures, missed evidence, bias flags. CALM-12 perturbation pass on a stratified sample for per-judge bias profiling."
        />
        <GovernancePanel
          step={governanceData.n02.step}
          available={governanceData.n02.available}
          synthesisMd={governanceData.n02.synthesis_md}
          fullLength={governanceData.n02.synthesis_md_full_length}
          nArtifacts={governanceData.n02.n_artifacts}
          summaries={governanceData.n02.summaries}
          badge={{ color: "text-sky", label: "L50 + L65" }}
          description="13-dimension composite scorecard built on BorderLines (NAACL 2024), Tao 2024 (PNAS Nexus), Identity-Aware (arXiv 2510.18510, 2025), Khandelwal/Kabir-Abrar-Ananiadou (EMNLP 2025), and Acharya multiplex (2025). 30 cross-language probes × 5 language-personas (en/zh/ar/fa/es) × 7 judges. 8 bias finding categories from Eurocentric framing through decolonial audit."
        />
      </div>
    </PageShell>
  );
}
