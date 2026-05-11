$ErrorActionPreference = "Stop"

Write-Host "Iniciando Smoke Tests da Arquitetura MFE Enterprise..." -ForegroundColor Cyan

function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Name,
        [int]$ExpectedStatus = 200
    )

    Write-Host "Testando $Name em $Url ..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Host " OK ($($response.StatusCode))" -ForegroundColor Green
            return $true
        } else {
            Write-Host " FAIL (Recebido $($response.StatusCode), Esperado $ExpectedStatus)" -ForegroundColor Red
            return $false
        }
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -eq $ExpectedStatus) {
            Write-Host " OK ($status)" -ForegroundColor Green
            return $true
        } else {
            Write-Host " FAIL (Erro de conexao ou status incorreto: $_)" -ForegroundColor Red
            return $false
        }
    }
}

$allPassed = $true

# 1. API Gateway / Ministack
$allPassed = $allPassed -and (Test-Endpoint -Url "http://localhost:4566/_localstack/health" -Name "MiniStack Health")

# 2. Swagger / Backend direto
$allPassed = $allPassed -and (Test-Endpoint -Url "http://localhost:3001/v3/api-docs" -Name "Backend API Docs")

# 3. MFE Remote Entry
$allPassed = $allPassed -and (Test-Endpoint -Url "http://localhost:4001/remoteEntry.js" -Name "MFE Auth Remote Entry")

# 4. Shell Host
$allPassed = $allPassed -and (Test-Endpoint -Url "http://localhost:3000" -Name "Shell Host App")

if ($allPassed) {
    Write-Host "Todos os smoke tests passaram com sucesso! O ambiente esta operante." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Alguns testes falharam. Verifique a saia acima para diagnosticar os problemas." -ForegroundColor Red
    exit 1
}
