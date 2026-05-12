param(
    [string[]] $MavenArgs = @("test")
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$backendDir = Resolve-Path (Join-Path $projectRoot "Trabalho_Eng_Soft_II")

function Test-Command {
    param([string] $Command)
    return $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

Push-Location $backendDir
try {
    if (Test-Command "mvn") {
        Write-Host "Executando testes do backend com Maven local..."
        mvn @MavenArgs
        exit $LASTEXITCODE
    }

    if (-not (Test-Command "docker")) {
        Write-Host "ERRO: Maven e Docker nao estao disponiveis. Instale o Maven ou inicie o Docker Desktop."
        exit 1
    }

    try {
        docker info *> $null
    }
    catch {
        Write-Host "ERRO: Docker esta instalado, mas o daemon nao esta rodando. Inicie o Docker Desktop e tente novamente."
        exit 1
    }

    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: Docker esta instalado, mas o daemon nao esta rodando. Inicie o Docker Desktop e tente novamente."
        exit 1
    }

    Write-Host "Executando testes do backend com imagem Docker do Maven..."
    docker run --rm -v "${backendDir}:/workspace" -w /workspace maven:3.9.6-eclipse-temurin-21 mvn @MavenArgs
    exit $LASTEXITCODE
}
finally {
    Pop-Location
}
