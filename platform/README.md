# GIPRE Transparency — v2 portal

The open methodology + governance audit view of the GIPRE engine (Geopolitical
Intelligence and Probabilistic Reasoning Engine). Complementary to the v5
production platform at [geopoliticalgps.com](https://www.geopoliticalgps.com).

**Stack**: Next.js 15 (app router, static export) · React 19 · TypeScript ·
Tailwind CSS · Radix UI · Lucide icons · react-markdown.

**Deploy target**: Azure Static Web Apps Standard tier.

## Development

```bash
# From repo root: regenerate site data from project state
python scripts/build_site_data.py

# From platform/: install + dev server
cd platform
npm install
npm run dev
# Open http://localhost:3000
```

## Build (static export)

```bash
cd platform
npm run build
# Static output at: platform/out
```

## Deploy

See [DEPLOY.md](./DEPLOY.md) for the full one-command runbook with `azd up`.

## Pages

| Route | Source | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing — hero, stats, governance preview, exploration grid |
| `/methodology` | `src/app/methodology/page.tsx` | Renders `_source_docs/_AGENT_DIGEST.md` |
| `/architecture` | `src/app/architecture/page.tsx` | 8 clusters × 65 layers grid, derived from `config/layers.yaml` |
| `/governance` | `src/app/governance/page.tsx` | N01 Critic + N02 Bias Auditor synthesis panels with sortable tables |
| `/agents` | `src/app/agents/page.tsx` | 95 agents grouped by class with backbone-routing badges |
| `/progress` | `src/app/progress/page.tsx` | All phases + CHANGELOG with collapsible entries |

## Architecture

```
Build-time data flow:

scripts/build_site_data.py
    reads
      ├── implementation/IMPLEMENTATION_PLAN.md
      ├── CHANGELOG.md
      ├── config/agents.yaml
      ├── config/layers.yaml
      ├── runs/critic-2026-05-11/synthesis.md
      ├── runs/bias-audit-2026-05-12/synthesis.md (when available)
      ├── _source_docs/_AGENT_DIGEST.md
      └── ...
    writes
      └── platform/data/*.json

Next.js static export
    consumes platform/data/*.json at build time
    emits static HTML/CSS/JS → platform/out/

Azure Static Web Apps
    serves platform/out/ via global CDN
```

## Differentiation vs. v5

| | v5 (production at geopoliticalgps.com) | v2 (this) |
|---|---|---|
| Audience | Paying customers | Researchers, prospective customers, transparency-readers |
| Content | 75 REST endpoints, Cesium 3D globe, live data, customer briefs | 65-layer methodology, governance audits, agent specs, scenario library |
| Aesthetic | Data-product, Bloomberg-terminal-style | Scientific-publication, arxiv-meets-Stripe |
| Updates | Continuous, customer-driven | Per-step, auto-regenerated from repo state |
| Azure stack | Container Apps + ACR | Static Web Apps + Cosmos + Blob + Key Vault |
| Cost | ~$80-120/mo at scale | ~$15/mo baseline |

## Differentiation vs. v6 Strature

v6 Strature (at github.com/milad9595naeimi/Strature) is the canonical 65-layer
pivot in active development — internal-facing, contains the full methodology canon,
step-folders, RIGOR_PROTOCOL, etc. This v2 portal is the external-facing,
deployable view that surfaces the v6 work (when v6 ships to this repo as
artifacts) without exposing internal workflow files.
