param(
    [string] $JwtSecret = "change-me-local-development-secret",
    [string] $AwsAccessKeyId = "test",
    [string] $AwsSecretAccessKey = "test",
    [string] $AwsDefaultRegion = "us-east-1"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$composeDir = Join-Path $projectRoot "chave-infra-main\chave-infra-main"
$envPath = Join-Path $composeDir ".env"

$content = @"
JWT_SECRET=$JwtSecret
AWS_ACCESS_KEY_ID=$AwsAccessKeyId
AWS_SECRET_ACCESS_KEY=$AwsSecretAccessKey
AWS_DEFAULT_REGION=$AwsDefaultRegion
SHELL_PORT=3000
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
MFE_AUTH_URL=http://localhost:4001/remoteEntry.js
VITE_MFE_AUTH_URL=http://localhost:4001/remoteEntry.js
VITE_MS_AUTH_URL=http://localhost:4566/restapis/chave-api/v1/_user_request_/api/auth
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4001
"@

Set-Content -Path $envPath -Value $content -Encoding UTF8
Write-Host "Arquivo .env atualizado em $envPath"
