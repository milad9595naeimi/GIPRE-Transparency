import Link from "next/link";
import { buildStateData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-display font-semibold text-foreground mb-3">GIPRE Transparency</div>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            The open methodology + governance audit view of the GIPRE engine. Complementary to the
            v5 production platform at{" "}
            <a className="text-sky hover:underline" href="https://www.geopoliticalgps.com">
              geopoliticalgps.com
            </a>
            .
          </p>
        </div>
        <div>
          <div className="text-foreground font-medium mb-3">Explore</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <Link href="/methodology" className="hover:text-foreground">
                65-layer methodology
              </Link>
            </li>
            <li>
              <Link href="/architecture" className="hover:text-foreground">
                Architecture
              </Link>
            </li>
            <li>
              <Link href="/agents" className="hover:text-foreground">
                Agent registry
              </Link>
            </li>
            <li>
              <Link href="/governance" className="hover:text-foreground">
                Governance audits
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-foreground font-medium mb-3">Build state</div>
          <ul className="space-y-1.5 text-muted-foreground text-[13px]">
            <li>
              <span className="text-foreground tabular-nums">{buildStateData.steps_done}</span> /{" "}
              <span className="tabular-nums">{buildStateData.steps_total}</span> steps done
            </li>
            <li>
              <span className="text-foreground tabular-nums">{buildStateData.layers_active}</span> /{" "}
              <span className="tabular-nums">{buildStateData.layers_total}</span> layers active
            </li>
            <li>
              <span className="text-foreground tabular-nums">{buildStateData.agents_total}</span> /{" "}
              <span className="tabular-nums">{buildStateData.agents_target}</span> agents (target)
            </li>
            <li>
              <span className="text-foreground tabular-nums">{buildStateData.pdf_cycles}</span> PDF cycles
            </li>
          </ul>
        </div>
        <div>
          <div className="text-foreground font-medium mb-3">Owner</div>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            Strature Geopolitical Prospects & Strategy Inc.
            <br />
            Future Innovation AI Group Inc.
            <br />
            <span className="text-foreground/40">Proprietary. All rights reserved.</span>
          </p>
        </div>
      </div>
      <div className="border-t border-border/40 py-4">
        <div className="container text-xs text-muted-foreground/70 flex flex-wrap items-center justify-between gap-2">
          <span>
            GIPRE Transparency v2 · Generated{" "}
            <time dateTime={buildStateData.generated_utc}>
              {buildStateData.generated_utc.replace("T", " ")}
            </time>
          </span>
          <span>
            Complementary to{" "}
            <a className="hover:text-foreground" href="https://www.geopoliticalgps.com">
              v5 production
            </a>{" "}
            ·{" "}
            <a className="hover:text-foreground" href="https://github.com/milad9595naeimi/Strature">
              v6 Strature
            </a>
          </span>
        </div>
        {buildStateData.engine_commit_short && (
          <div className="container text-[11px] text-muted-foreground/60 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
            <span title="Engine repo HEAD commit at the time this data was generated.">
              <span className="text-muted-foreground/80">engine</span>{" "}
              <span className="text-foreground/70 tabular-nums">
                {buildStateData.engine_commit_short}
              </span>
              {buildStateData.engine_branch && (
                <>
                  {" "}
                  <span className="text-muted-foreground/50">on</span>{" "}
                  <span className="text-foreground/60">{buildStateData.engine_branch}</span>
                </>
              )}
            </span>
            {buildStateData.n01_run_id && (
              <span title="N01 Critic / Multi-Model Jury run — independent multi-vendor governance audit.">
                <span className="text-muted-foreground/80">·</span>{" "}
                <span className="text-muted-foreground/80">N01</span>{" "}
                <span className="text-foreground/60">{buildStateData.n01_run_id}</span>
                {typeof buildStateData.n01_total_findings === "number" && (
                  <>
                    {" "}
                    <span className="text-muted-foreground/50">
                      ({buildStateData.n01_total_findings.toLocaleString()} findings
                      {typeof buildStateData.n01_total_usd === "number" &&
                        ` · $${buildStateData.n01_total_usd.toFixed(0)}`}
                      )
                    </span>
                  </>
                )}
              </span>
            )}
            {buildStateData.n02_run_id && (
              <span title="N02 Bias Auditor (L50 + L65) run — cross-language cultural-bias audit on the same corpus N01 audited.">
                <span className="text-muted-foreground/80">·</span>{" "}
                <span className="text-muted-foreground/80">N02</span>{" "}
                <span className="text-foreground/60">{buildStateData.n02_run_id}</span>
                {buildStateData.n02_config_hash && (
                  <>
                    {" "}
                    <span className="text-muted-foreground/50">
                      (cfg {buildStateData.n02_config_hash}
                      {buildStateData.n02_corpus_hash &&
                        ` · corpus ${buildStateData.n02_corpus_hash}`}
                      {typeof buildStateData.n02_total_usd === "number" &&
                        ` · $${buildStateData.n02_total_usd.toFixed(0)}`}
                      )
                    </span>
                  </>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
