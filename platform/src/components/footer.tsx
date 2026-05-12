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
      </div>
    </footer>
  );
}
