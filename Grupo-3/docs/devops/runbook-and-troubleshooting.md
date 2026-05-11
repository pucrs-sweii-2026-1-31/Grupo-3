# Runbook de Desenvolvimento Local

Este guia descreve os passos necessários para configurar, executar e testar o ambiente local da arquitetura Micro-frontend Enterprise (Chave).

## 1. Pré-requisitos
- **Docker Desktop** (em execução)
- **Node.js** (v18+ recomendado)
- **Java** (JDK 21)
- **Make** (para rodar os comandos do Makefile) ou acesso direto ao `docker compose`

## 2. Inicialização do Ambiente
O projeto utiliza um `Makefile` na pasta `chave-infra-main` para orquestrar todos os contêineres e recursos da AWS local (via MiniStack + Terraform).

1. Entre na pasta da infraestrutura:
   ```powershell
   cd chave-infra-main\chave-infra-main
   ```
2. Crie o arquivo `.env` baseado no `.env.example`:
   ```powershell
   cp .env.example .env
   ```
3. Execute o setup completo:
   ```powershell
   make setup
   # Ou via docker-compose caso não tenha o make:
   docker-compose up -d postgres ministack
   docker-compose run --rm infra-provisioner init
   docker-compose run --rm infra-provisioner apply -auto-approve
   docker-compose up -d
   ```

Aguarde até que os serviços `chave-ms-auth`, `chave-mfe-auth` e `chave-shell` estejam saudáveis.

## 3. Acesso aos Serviços
- **Shell Host**: http://localhost:3000
- **MFE Auth (Remote)**: http://localhost:4001 (Apenas para debug e remoteEntry.js)
- **Backend API Docs (Swagger)**: http://localhost:3001/swagger-ui/index.html
- **API Gateway (MiniStack)**: http://localhost:4566/restapis/chave-api/v1/_user_request_/api/auth

## 4. Rodando os Testes Automatizados

### Backend (Spring Boot)
O projeto usa Maven Wrapper para independência de ambiente local.
```powershell
cd Trabalho_Eng_Soft_II
.\mvnw test
```
*A cobertura do JaCoCo será gerada na verificação (`.\mvnw verify`). O build falhará se a cobertura de linhas for inferior a 70%.*

### Frontend (Micro-frontend Remote)
Testes unitários e de integração de componentes com Vitest.
```powershell
cd front-end
npm install
npm test
# Para ver a cobertura:
npm run coverage
```

### Shell Host
Testes de roteamento e fallback com Vitest.
```powershell
cd chave-shell-main\chave-shell-main
npm install
npm test
# Para ver a cobertura:
npm run coverage
```

## 5. Smoke Tests (Validação Pós-Deploy Local)
Para confirmar se toda a stack está comunicável e funcionando:
```powershell
cd scripts
.\smoke_tests.ps1
```

## 6. Troubleshooting Comum
- **Erro de conexão no BD**: Verifique se o contêiner `chave-postgres` está rodando. O backend só sobe se o postgres estiver com status `healthy`.
- **Terraform falhando ao provisionar API Gateway**: Isso ocorre se o `ministack` demorar a iniciar. O `make setup` possui um timeout para evitar isso. Se ocorrer, rode `make tf-apply` novamente.
- **Shell carrega página em branco (Suspense Error)**: Verifique se o `chave-mfe-auth` (4010) está rodando e se o `remoteEntry.js` está acessível em `http://localhost:4001/remoteEntry.js`. O bloqueio do CORS do navegador pode ser o causador — utilize as origens permitidas corretas.
- **"MODULE_NOT_FOUND" em scripts AI**: Scripts do modpack AI (se presentes) exigem a instalação das dependências globais ou do workspace via `npm install`.
