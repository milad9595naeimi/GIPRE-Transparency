# GIPRE Transparency

> **Public transparency portal** for the **GIPRE engine** — Geopolitical Intelligence
> and Probabilistic Reasoning Engine. 65-layer methodology, 95+ agents, 100+ master
> scenarios. Built by [Strature — Geopolitical Prospects & Strategy Inc.](https://www.geopoliticalgps.com)

This repo is one of three GIPRE artefacts:

| Repo | Role | Stack | Hosting |
|------|------|-------|---------|
| **[Geopolitical_Prospects_Strategy](https://github.com/milad9595naeimi/Geopolitical_Prospects_Strategy)** (v5) | The client-facing intelligence product | Next.js 15 + Cesium 3D globe + 50+ pages, FastAPI backend, ~1.7M LoC Python | Azure Container Apps · live at `geopoliticalgps.com` |
| **[Strature](https://github.com/milad9595naeimi/Strature)** (v6) | 65-layer engine pivot in active development | TypeScript + Python | (in development) |
| **GIPRE-Transparency** (this repo, v2) | The open methodology + governance audit view | Next.js 15 + Tailwind + Radix UI, static export | Azure Static Web Apps · this site |

This portal is the **transparent face** of the build: methodology, agent specs, governance audits, and live progress, generated directly from the source engine repository.

---

## What's on the live site

| Page | Source |
|------|--------|
| `/` Landing | Build-state summary + complementary-to-v5 banner |
| `/methodology` | 65-layer architecture digest + source-doc index |
| `/architecture` | All 65 layers organised by cluster, with active/stub status |
| `/agents` | 95+ agents (actors, themes, lenses, governance) with backbone-routing badges |
| `/governance` | N01 Critic + N02 Bias Auditor synthesis + finding browser |
| `/progress` | Implementation plan + CHANGELOG timeline |

Content updates whenever the source repo regenerates `platform/data/*.json` and re-pushes here.

---

## Deploy your own copy

This repo is configured for one-command Azure provisioning:

```powershell
az login                                                         # browser flow
azd init --template . --environment gipre-transparency-prod      # one-time setup
azd up                                                            # provision + deploy
```

Time to first deploy: ~10-15 minutes. Cost: **~$15/month** baseline (Static Web Apps Standard $9 + Cosmos serverless ~$1-3 + Blob ~$1 + App Insights ~$2-5).

Full deployment runbook with prereqs, troubleshooting, and tear-down: see [`platform/DEPLOY.md`](./platform/DEPLOY.md).

---

## Local development

```powershell
cd platform
npm install
npm run dev    # http://localhost:3000
```

Pages auto-refresh as you edit. Data lives in `platform/data/*.json` and is pre-baked from the engine repo's content; to refresh from the engine repo, run the sync script there (`python scripts/build_site_data.py` in the main engine repo, then copy the resulting `platform/data/*.json` to this repo).

---

## Architecture

```
GIPRE-Transparency repo
├── platform/                Next.js 15 + Tailwind + Radix UI source
│   ├── src/app/             6 pages (landing, methodology, architecture, agents, governance, progress)
│   ├── src/components/      Shared nav, footer, page-shell, stat-card, status-badge
│   ├── src/lib/             Data loader + UI utilities
│   ├── data/                9 baked JSONs (regenerated from main engine repo)
│   ├── DEPLOY.md            Full deployment runbook
│   └── staticwebapp.config.json  SWA routes, CSP, security headers
├── infra/
│   ├── main.bicep           Azure infra: SWA Standard + App Insights + Cosmos serverless + Blob + Key Vault
│   ├── main.parameters.json
│   └── abbreviations.json
├── azure.yaml               azd service config — `azd up` entry point
└── .github/workflows/
    └── azure-static-web-apps.yml   CI/CD on push + per-PR staging envs
```

---

## Two-platform contract

**Why v2 (this repo) and v5 ([Geopolitical_Prospects_Strategy](https://github.com/milad9595naeimi/Geopolitical_Prospects_Strategy)) coexist:**

- **v5** is the **client-facing intelligence product** — 50+ pages, Cesium 3D globe, full-feature dashboards, paid-tier customer access. Lives at `geopoliticalgps.com`. Heavyweight Azure Container Apps deployment.
- **v2** (here) is the **methodology and audit-trail face** — "show your work" transparency. 6 pages, static export, minimal cost. Anyone can read the methodology and audit findings without an account.

They complement, don't compete. v5 sells the product; v2 explains the methodology and proves the governance discipline behind it.

---

## License

Proprietary. © 2026 Strature Geopolitical Prospects & Strategy Inc. All rights reserved.

The methodology is open-readable here for transparency. Re-use of the implementation requires written permission.

---

## Contact

- Owner: Milad Naeimi, MGA — Director of Research
- Email: milad95.naeimi@gmail.com
- v5 production: https://www.geopoliticalgps.com
