# GIPRE Transparency — deployment runbook

> **Target**: deploy `platform/` to Azure Static Web Apps Standard tier (~$9/mo +
> Cosmos + Blob ~$3/mo + App Insights ~$3/mo = **~$15/mo total** → 66+ months
> on $1000 Azure credit).
> **Time to first deploy**: ~10-15 minutes total.
> **Prereqs**: Azure CLI, Azure Developer CLI (`azd`), Node 20+, Python 3.11, GitHub CLI (optional but recommended).

## TL;DR — three commands

```powershell
# From the repo root (Geopolitical_Model_AI_Agents):
az login
azd init --template . --environment gipre-transparency-prod
azd up
```

That's it. The deployed URL prints at the end (`https://<random>.<region>.azurestaticapps.net`).

---

## Step-by-step

### 0. Prereqs (one-time)

Install if missing:

```powershell
# Azure CLI
winget install Microsoft.AzureCLI

# Azure Developer CLI
winget install Microsoft.Azd

# Node 20 LTS (if not already)
winget install OpenJS.NodeJS.LTS

# Python 3.11 (already on your machine — `python --version` to verify)
```

Verify all four:

```powershell
az --version    # 2.50+
azd version     # 1.5+
node --version  # 20+
python --version  # 3.11+
```

### 1. Sign in to Azure

```powershell
az login
```

This opens a browser. Pick the subscription with your $1000 credit. Confirm with:

```powershell
az account show --query "{name:name, id:id, tenant:tenantId}" -o table
```

Your subscription ID should match the one on the Azure portal. If you have multiple subscriptions, set the right one:

```powershell
az account set --subscription "<subscription-id-or-name>"
```

### 2. Initialise the azd environment

From the repo root (`C:\Users\milad\OneDrive\Documents\Geopolitical_Model_AI_Agents`):

```powershell
azd init --template . --environment gipre-transparency-prod
```

When prompted:
- **Subscription**: pick yours
- **Region**: `eastus2` (default; cheapest with all services) or `canadacentral` if Canada-based
- **principalId**: leave blank — `azd` populates from `az login`

### 3. Provision + deploy in one step

```powershell
azd up
```

This:
1. Reads `azure.yaml` + `infra/main.bicep`
2. Provisions all Azure resources (~5 min):
   - Log Analytics workspace
   - Application Insights
   - Key Vault
   - Storage Account + `artifacts` / `pdfs` blob containers
   - Cosmos DB (serverless) + `gipre` database + `findings` container
   - Static Web App (Standard tier)
3. Regenerates site data (`python scripts/build_site_data.py`)
4. Builds Next.js (`npm install && npm run build` in `platform/`)
5. Uploads to Static Web Apps
6. Prints the deployed URL

Expected output ends with:

```
SUCCESS: Your application was provisioned and deployed in N minutes.
You can view the resources created under the resource group <rg-name> in Azure Portal:
https://portal.azure.com/...

Endpoint: https://<random-hash>.<region>.azurestaticapps.net
```

**Save that endpoint URL** — that's your live v2 site.

### 4. Verify

Open the endpoint. You should see:
- Landing page with hero, stats, governance preview
- `/methodology` — the agent digest
- `/architecture` — 8 clusters, 65 layers
- `/governance` — N01 + N02 panels (N02 shows "Run in progress" until the bias audit completes)
- `/agents` — 95 agents organised by class with backbone routing badges
- `/progress` — implementation plan + CHANGELOG

### 5. Wire GitHub Actions (auto-deploy on push)

The `.github/workflows/azure-static-web-apps.yml` is already in the repo. It auto-deploys on every push to `main`. To enable:

```powershell
# Get the deployment token from Azure
az staticwebapp secrets list --name <static-web-app-name> --query "properties.apiKey" -o tsv
```

Then set it as a GitHub repo secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`:

```powershell
# Using gh CLI (you're already authenticated):
gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN -R milad9595naeimi/GIPRE-Transparency
# (paste the token when prompted)
```

After that, every `git push` to `main` redeploys automatically. PRs get their own staging environment at `<base>-<pr-number>.<region>.azurestaticapps.net`.

---

## Custom domain (V02 step — defer until next session)

When ready to switch from `*.azurestaticapps.net` to a real domain:

```powershell
# Add custom domain
az staticwebapp hostname set --name <static-web-app-name> \
  --hostname methodology.geopoliticalgps.com

# (Add the TXT validation record at your DNS provider, then:)
az staticwebapp hostname set --name <static-web-app-name> \
  --hostname methodology.geopoliticalgps.com --validation-method dns-txt-token
```

TLS is automatic via Static Web Apps + Let's Encrypt.

---

## Cost monitoring

The Bicep template tags every resource with `project: gipre-transparency`. Filter costs:

```powershell
az consumption usage list --output table --top 10 \
  --query "[?contains(instanceName, 'gipre-transparency')]"
```

Or in Azure Portal: **Cost Management → Cost analysis → Filter by tag: project = gipre-transparency**.

Expected monthly costs (V01 baseline):
- Static Web App Standard: **$9.00**
- Cosmos DB serverless (low traffic): **~$1-3**
- Blob Storage (LRS, ~100 MB): **~$1**
- Application Insights (ingestion below 5 GB free tier): **~$2-5**
- Log Analytics: **~$0-2**
- Key Vault: **~$0.50**
- **Total: ~$13-20/mo** → ~50-77 months of runway on $1000 credit.

---

## Tear down (if needed)

```powershell
azd down --purge --force
```

Removes everything including soft-deleted Key Vault entries.

---

## Troubleshooting

**"InsufficientQuota" during provision**: Cosmos DB serverless requires quota in the chosen region. Try a different region or open a quota-increase support ticket.

**Build fails on Node version**: Use Node 20. Static Web Apps GitHub Actions runner uses 20 by default.

**Bias audit synthesis not appearing**: The N02 audit is running locally. When it finishes, the next `azd up` (or any push to main) regenerates `platform/data/governance.json` and republishes. The page will auto-populate.

**Want to regenerate data without redeploying**:
```powershell
python scripts/build_site_data.py
cd platform
npm run build
# Inspect locally: npm run dev
```

---

## Architecture overview

```
GitHub repo (this directory)
    ↓ push to main
GitHub Actions
    ↓ build_site_data.py → npm install → npm run build → upload
Azure Static Web Apps (Standard)
    ↓ serves static files via Azure CDN (global)
    ├─ static HTML/CSS/JS from /platform/out
    └─ no server-side compute (all pages pre-rendered at build time)

Adjacent resources (provisioned but currently unused, ready for V02+):
- Cosmos DB serverless — for V04+ live agent / scenario data
- Blob Storage — for V03+ governance artifact downloads
- Key Vault — for any production secrets (LLM API keys when wiring V08 widgets)
- App Insights — for visitor analytics + page-load telemetry
```

## What lives where

| Path | Purpose |
|---|---|
| `azure.yaml` | `azd` service config; declares the web app project |
| `infra/main.bicep` | All Azure resource definitions |
| `infra/main.parameters.json` | Bicep parameter file (env name, region, principal ID) |
| `infra/abbreviations.json` | Azure resource-naming conventions |
| `platform/` | Next.js 15 source (TS + Tailwind + Radix) |
| `platform/staticwebapp.config.json` | SWA routes, headers, CSP |
| `platform/data/*.json` | Generated from project state by `scripts/build_site_data.py` |
| `scripts/build_site_data.py` | Reads `CHANGELOG.md`, `IMPLEMENTATION_PLAN.md`, configs, runs/, output/; writes JSON files for Next.js |
| `.github/workflows/azure-static-web-apps.yml` | CI/CD on push + per-PR staging envs |
