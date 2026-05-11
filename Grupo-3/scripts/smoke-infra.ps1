param(
    [switch] $SkipHttp
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$composeDir = Join-Path $projectRoot "chave-infra-main\chave-infra-main"
$envPath = Join-Path $composeDir ".env"
$envExamplePath = Join-Path $composeDir ".env.example"

function Invoke-SmokeRequest {
    param(
        [string] $Name,
        [string] $Url
    )

    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 10
        Write-Host "OK: $Name respondeu com status $($response.StatusCode)"
    }
    catch {
        Write-Host "ERRO: $Name nao respondeu em $Url"
        throw
    }
}

if (-not (Test-Path $envPath)) {
    if (Test-Path $envExamplePath) {
        Copy-Item $envExamplePath $envPath
        Write-Host "Arquivo .env criado a partir de .env.example"
    } else {
        throw "Arquivo .env.example nao encontrado."
    }
}

Push-Location $composeDir
try {
    Write-Host "Validando docker compose config..."
    docker compose --env-file .env config --quiet
    Write-Host "OK: docker compose config valido"

    try {
        docker info *> $null
        $dockerDisponivel = $LASTEXITCODE -eq 0
    }
    catch {
        $dockerDisponivel = $false
    }

    if (-not $dockerDisponivel) {
        if ($SkipHttp) {
            Write-Host "AVISO: Docker daemon indisponivel; status dos containers foi ignorado por causa de -SkipHttp."
            return
        }

        throw "Docker daemon indisponivel. Inicie o Docker Desktop para executar o smoke test completo."
    }

    Write-Host "Status dos containers:"
    docker compose --env-file .env ps
}
finally {
    Pop-Location
}

if (-not $SkipHttp) {
    Invoke-SmokeRequest -Name "Shell" -Url "http://localhost:3000"
    Invoke-SmokeRequest -Name "Remote MFE" -Url "http://localhost:4001/remoteEntry.js"
    Invoke-SmokeRequest -Name "Backend Swagger" -Url "http://localhost:3001/swagger-ui.html"
    Invoke-SmokeRequest -Name "MiniStack" -Url "http://localhost:4566/_localstack/health"
}
