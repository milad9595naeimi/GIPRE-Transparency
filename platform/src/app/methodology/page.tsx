import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageShell, PageHeader } from "@/components/page-shell";
import { methodologyData, buildStateData } from "@/lib/data";

export const metadata = {
  title: "Methodology",
  description: "The 65-layer GIPRE v9.0 methodology — clusters, layers, and the agent digest.",
};

export default function MethodologyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="65-layer architectural spine"
        title="Methodology"
        description="GIPRE v9.0 organises 65 layers into 8 clusters (A through H). This page is generated from the project's canonical agent digest, which is itself derived from the six methodology Word docs (Doc 1 §2.1–§2.65, Doc 2 outputs, Doc 3 implementation, Doc 4 process, Doc 5 literature, Doc 6 gap audit)."
      />
      <div className="container max-w-4xl pb-12">
        <div className="rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{buildStateData.layers_active}</span> of{" "}
          <span className="font-medium text-foreground">{buildStateData.layers_total}</span> layers
          are active in the current build. Source:{" "}
          <code className="rounded bg-background px-1.5 py-0.5 text-[12px]">
            {methodologyData.source_files.join(" · ")}
          </code>
        </div>
      </div>
      <div className="container max-w-3xl pb-24">
        <article className="prose-paper">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {methodologyData.digest_excerpt}
          </ReactMarkdown>
          {methodologyData.digest_full_length > methodologyData.digest_excerpt.length && (
            <p className="mt-8 text-sm text-muted-foreground italic">
              Showing first {methodologyData.digest_excerpt.length.toLocaleString()} of{" "}
              {methodologyData.digest_full_length.toLocaleString()} characters. Full digest at{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">_source_docs/_AGENT_DIGEST.md</code>.
            </p>
          )}
        </article>
      </div>
    </PageShell>
  );
}
