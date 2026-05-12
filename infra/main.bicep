// GIPRE Transparency platform — Azure infrastructure
// Provisions: Static Web Apps (Standard) + Application Insights + Log Analytics + Key Vault +
//             Cosmos DB (serverless) + Storage Account (Blob) + managed identity.
//
// One-command provisioning: `azd up` from the repo root.
// Region default: eastus2 (cheapest with all services; override at provision time).

targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Environment name (e.g., prod, staging) — included in resource names.')
param environmentName string

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('Tags applied to all resources for cost-tracking and ownership.')
param tags object = {
  'azd-env-name': environmentName
  project: 'gipre-transparency'
  owner: 'milad9595naeimi'
  workload: 'transparency-portal'
}

@description('Principal ID of the deploying user — receives Key Vault Secrets Officer.')
param principalId string = ''

var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().id, environmentName))
var abbrs = loadJsonContent('./abbreviations.json')

// ────────────────────────── Log Analytics + Application Insights ──────────────────────────

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
  location: location
  tags: tags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
    features: { searchVersion: 1 }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${abbrs.insightsComponents}${resourceToken}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// ────────────────────────── Key Vault ──────────────────────────

resource keyVault 'Microsoft.KeyVault/vaults@2024-04-01-preview' = {
  name: '${abbrs.keyVaultVaults}${resourceToken}'
  location: location
  tags: tags
  properties: {
    tenantId: subscription().tenantId
    sku: { family: 'A', name: 'standard' }
    enableRbacAuthorization: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 7
    // enablePurgeProtection omitted — Azure 2024-04 API rejects explicit `false` here.
    publicNetworkAccess: 'Enabled'
    accessPolicies: []
  }
}

// Grant the deploying principal Key Vault Secrets Officer role
resource kvSecretsOfficer 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(principalId)) {
  scope: keyVault
  name: guid(keyVault.id, principalId, 'kvso')
  properties: {
    principalId: principalId
    principalType: 'User'
    // Key Vault Secrets Officer
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b86a8fe4-44ce-4948-aee5-eccb2c155cd7')
  }
}

// ────────────────────────── Storage Account (Blob for PDFs / artifacts) ──────────────────────────

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: '${abbrs.storageStorageAccounts}${resourceToken}'
  location: location
  tags: tags
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: true
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    networkAcls: { defaultAction: 'Allow' }
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storage
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'HEAD', 'OPTIONS']
          allowedHeaders: ['*']
          exposedHeaders: ['*']
          maxAgeInSeconds: 3600
        }
      ]
    }
  }
}

resource artifactsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'artifacts'
  properties: { publicAccess: 'Blob' }
}

resource pdfsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'pdfs'
  properties: { publicAccess: 'Blob' }
}

// ────────────────────────── Cosmos DB (serverless) ──────────────────────────

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2024-08-15' = {
  name: '${abbrs.documentDBDatabaseAccounts}${resourceToken}'
  location: location
  tags: tags
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      { locationName: location, failoverPriority: 0, isZoneRedundant: false }
    ]
    consistencyPolicy: { defaultConsistencyLevel: 'Session' }
    capabilities: [{ name: 'EnableServerless' }]
    minimalTlsVersion: 'Tls12'
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: false
  }
}

resource cosmosDb 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2024-08-15' = {
  parent: cosmos
  name: 'gipre'
  properties: { resource: { id: 'gipre' } }
}

resource cosmosContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2024-08-15' = {
  parent: cosmosDb
  name: 'findings'
  properties: {
    resource: {
      id: 'findings'
      partitionKey: { paths: ['/artifact_id'], kind: 'Hash' }
      indexingPolicy: { indexingMode: 'consistent', automatic: true }
    }
  }
}

// ────────────────────────── Static Web App ──────────────────────────
// Standard tier ($9/mo) — unlocks custom domains, staging environments per PR, auth.

// Manual-deploy mode (no GitHub linkage at provision time — azd uploads the built
// assets directly via the deployment token). To later link to GitHub for auto-deploy,
// configure it in the Azure portal (Configuration → Source control) after first deploy,
// or set provider/repositoryUrl/branch via `az staticwebapp` CLI.
resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: '${abbrs.webStaticSites}${resourceToken}'
  location: location
  tags: tags
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'None'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

// App settings — wire backend service connections
resource swaConfig 'Microsoft.Web/staticSites/config@2024-04-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    APPLICATIONINSIGHTS_CONNECTION_STRING: appInsights.properties.ConnectionString
    AZURE_KEY_VAULT_URI: keyVault.properties.vaultUri
    AZURE_STORAGE_ACCOUNT_NAME: storage.name
    AZURE_COSMOS_DB_ENDPOINT: cosmos.properties.documentEndpoint
    AZURE_COSMOS_DB_DATABASE: cosmosDb.name
  }
}

// ────────────────────────── Outputs ──────────────────────────

output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = subscription().tenantId
output RESOURCE_GROUP_ID string = resourceGroup().id
output STATIC_WEB_APP_NAME string = staticWebApp.name
output STATIC_WEB_APP_DEFAULT_HOSTNAME string = staticWebApp.properties.defaultHostname
output APPLICATIONINSIGHTS_CONNECTION_STRING string = appInsights.properties.ConnectionString
output AZURE_KEY_VAULT_URI string = keyVault.properties.vaultUri
output AZURE_STORAGE_ACCOUNT_NAME string = storage.name
output AZURE_STORAGE_BLOB_ENDPOINT string = storage.properties.primaryEndpoints.blob
output AZURE_COSMOS_DB_ENDPOINT string = cosmos.properties.documentEndpoint
output AZURE_COSMOS_DB_DATABASE string = cosmosDb.name
