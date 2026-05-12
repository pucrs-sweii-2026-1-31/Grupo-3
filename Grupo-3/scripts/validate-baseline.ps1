$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$composeDir = Join-Path $projectRoot "chave-infra-main\chave-infra-main"
$envExample = Join-Path $composeDir ".env.example"

function Write-Step {
    param([string] $Message)
    Write-Host ""
    Write-Host "==> $Message"
}

function Test-Command {
    param([string] $Command)
    $found = Get-Command $Command -ErrorAction SilentlyContinue
    if ($null -eq $found) {
        Write-Host "AVISO: $Command nao encontrado no PATH"
        return $false
    }

    Write-Host "OK: $Command encontrado em $($found.Source)"
    return $true
}

Write-Step "Verificando caminhos obrigatorios do projeto"
$requiredPaths = @(
    "Trabalho_Eng_Soft_II\pom.xml",
    "front-end\package.json",
    "front-end\vite.config.ts",
    "chave-shell-main\chave-shell-main\package.json",
    "chave-shell-main\chave-shell-main\vite.config.js",
    "chave-infra-main\chave-infra-main\docker-compose.yml",
    "chave-infra-main\chave-infra-main\terraform\main.tf",
    "docs\phase-0-baseline.md",
    "docs\acceptance-criteria.md"
)

foreach ($path in $requiredPaths) {
    $fullPath = Join-Path $projectRoot $path
    if (-not (Test-Path $fullPath)) {
        throw "Caminho obrigatorio ausente: $path"
    }

    Write-Host "OK: $path"
}

if (-not (Test-Path $envExample)) {
    throw "Arquivo de exemplo de ambiente ausente: $envExample"
}
Write-Host "OK: chave-infra-main\chave-infra-main\.env.example"

Write-Step "Verificando ferramentas locais"
$dockerFound = Test-Command "docker"
[void](Test-Command "java")
[void](Test-Command "mvn")
[void](Test-Command "node")
[void](Test-Command "npm")

if (-not $dockerFound) {
    throw "Docker e obrigatorio para validar a infraestrutura de base."
}

Write-Step "Renderizando Docker Compose com .env.example"
Push-Location $composeDir
try {
    docker compose --env-file .env.example config --quiet
    Write-Host "OK: docker compose config renderizado com sucesso"
}
finally {
    Pop-Location
}

Write-Step "Validacao da linha de base concluida"
Write-Host "Proximo passo: iniciar testes e correcoes da Fase 1 do backend."
