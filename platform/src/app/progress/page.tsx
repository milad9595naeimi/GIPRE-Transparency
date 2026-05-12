import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageShell, PageHeader } from "@/components/page-shell";
import { StatusBadge } from "@/components/status-badge";
import { planData, changelogData, buildStateData } from "@/lib/data";

export const metadata = {
  title: "Progress",
  description: "Live build state — every phase, every step, every CHANGELOG entry. Auto-generated.",
};

export default function ProgressPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Live build state"
        title="Progress"
        description="Every phase and every step in the build, organised in source-order. Auto-generated from IMPLEMENTATION_PLAN.md and CHANGELOG.md."
      />
      <div className="container max-w-5xl pb-12">
        {/* Top-level stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-violet/30 bg-violet/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-violet">Steps complete</div>
            <div className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-foreground">
              {buildStateData.steps_done}
              <span className="text-base text-muted-foreground"> / {buildStateData.steps_total}</span>
            </div>
            <div className="text-[12px] text-muted-foreground">{buildStateData.completion_pct}%</div>
          </div>
          <div className="rounded-xl border border-warn/30 bg-warn/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-warn">In progress</div>
            <div className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-foreground">
              {buildStateData.steps_in_progress}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Pending</div>
            <div className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-foreground">
              {buildStateData.steps_pending}
            </div>
          </div>
          <div className="rounded-xl border border-signal/30 bg-signal/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-signal">Phases</div>
            <div className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-foreground">
              {buildStateData.phases_total}
            </div>
            <div className="text-[12px] text-muted-foreground">A through V</div>
          </div>
        </div>
      </div>

      {/* Phase grid */}
      <div className="container max-w-5xl pb-12">
        <h2 className="font-display text-xl font-semibold tracking-tight mb-4">All phases</h2>
        <div className="space-y-3">
          {planData.phases.map((phase) => (
            <details
              key={phase.id}
              className="rounded-xl border border-border bg-background"
              open={phase.n_in_progress > 0}
            >
              <summary className="cursor-pointer px-5 py-3 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-display text-lg font-semibold tabular-nums text-foreground">
                    Phase {phase.id}
                  </span>
                  <span className="text-sm text-muted-foreground truncate">{phase.title}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] tabular-nums flex-shrink-0">
                  {phase.n_done > 0 && (
                    <span className="inline-flex items-center gap-1 text-signal">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                      {phase.n_done}
                    </span>
                  )}
                  {phase.n_in_progress > 0 && (
                    <span className="inline-flex items-center gap-1 text-warn">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-warn animate-pulse" />
                      {phase.n_in_progress}
                    </span>
                  )}
                  {phase.n_pending > 0 && (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      {phase.n_pending}
                    </span>
                  )}
                </div>
              </summary>
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {phase.steps.map((step) => (
                      <tr key={step.id} className="hover:bg-muted/20">
                        <td className="px-5 py-2 font-mono text-[12px] text-muted-foreground w-20">
                          {step.id}
                        </td>
                        <td className="px-5 py-2 text-[13px]">{step.title}</td>
                        <td className="px-5 py-2 text-right w-32">
                          <StatusBadge status={step.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CHANGELOG */}
      <div className="container max-w-3xl pb-24">
        <h2 className="font-display text-xl font-semibold tracking-tight mb-4">Recent CHANGELOG entries</h2>
        <div className="space-y-6">
          {changelogData.entries.slice(0, 6).map((entry) => (
            <article key={entry.version} className="border-l-2 border-violet/40 pl-5">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {entry.version}
              </div>
              <h3 className="mt-1 font-medium text-foreground text-base">{entry.title}</h3>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-sky hover:underline">
                  Expand entry ({(entry.body.length / 1024).toFixed(1)} KB)
                </summary>
                <div className="prose-paper mt-3 text-[13px]">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
